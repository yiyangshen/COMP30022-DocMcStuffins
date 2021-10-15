/* Import required libraries and types */
import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { isValidObjectId, ObjectId } from "mongoose";

/* Import required models */
import { Contact, Group, IUser } from "../models";

/* Import error and response classes */
import {
    BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError,  
    CreatedSuccess, OKSuccess
} from "../classes";

/* Amends the given group's details;
 * requires, in the request body:
 *   - id: ObjectId
 *   - name: string
 *   - members?: [ObjectId]
 * responds with a:
 *   - 200 OK if amendment is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the group to amend does not belong to the currently-authenticated user
 *   - 404 Not Found if the given group ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function amendGroupDetails(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("User is not authenticated"));
        }

        /* Validate and sanitise the required inputs */
        await body("id").isMongoId().run(req);
        await body("name").isAscii().trim().run(req);

        /* Validate and sanitise the optional inputs */
        if (req.body.members) {
            /* Check that each element of the members array is an ObjectId */
            await body("members").custom((memberIds: Array<string>) => {
                return memberIds.every((memberId: string) => {
                    return isValidObjectId(memberId);
                });
            }).run(req);
        }

        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body malformed"));
        }

        /* Find the specified group */
        const group = await Group.findById(req.body.id);

        /* Check if the group exists */
        if (!group) {
            return next(new NotFoundError("No groups with the given ID exists in the database"));
        }

        /* Check if the group belongs to the currently authenticated user */
        if (group.userId.toString() !== (req.user as IUser)._id.toString()) {
            return next(new ForbiddenError("Group to amend does not belong to the currently-authenticated user"));
        }

        /* Update the name field of the group */
        group.name = req.body.name;

        /* Update the members field of the group */
        const newMembers = new Map();
        const oldMembers = [...group.members];
        group.members = [];
        if (req.body.members)
            /* Update the membership of each new member */
            for (let memberId of req.body.members) {
                const member = await Contact.findById(memberId);
                if (member) {
                    /* Check if there is a change in the membership of this new member */
                    if (member.groupId?.toString() !== group._id.toString()) {
                        /* Remove the membership of the old group if there is any */
                        if (member.groupId) {
                            const oldGroup = await Group.findById(member.groupId);
                            if (oldGroup) {
                                oldGroup.members = oldGroup.members.filter(memberId => memberId.toString() !== member._id.toString());
                                await oldGroup.save();
                            }
                        }
                        
                        /* Assign the member to the new group */
                        member.groupId = group._id;
                        member.timestamps.modified = new Date();
                        await member.save();
                    }

                    /* Add this new member to the group members */
                    group.members.push(member._id);
                    newMembers.set(member._id.toString(), true);
                }
            }
        
        /* Remove the membership of the old members */
        for (let memberId of oldMembers) {
            /* Check if this old member is a recurring member */
            if (!newMembers.has(memberId.toString())) {
                const member = await Contact.findById(memberId);
                if (member) {
                    member.groupId = undefined;
                    member.timestamps.modified = new Date();
                    await member.save();
                }
            }
        }

        /* Save the amended group to the database */
        await group.save();
        res.json(new OKSuccess("Group successfully amended"));
    } catch (err) {
        console.log(err);
        return next(new InternalServerError("Something has gone wrong"));
    }
}

/* Creates a new group with the given details;
 * requires, in the request body:
 *   - name: string
 *   - members?: [ObjectId]
 * responds with a:
 *   - 201 Created if creation is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function createGroup(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("User is not authenticated"));
        }
        
        /* Validate and sanitise the required inputs */
        await body("name").isAscii().trim().run(req);

        /* Validate and sanitise the optional inputs */
        if (req.body.members) {
            /* Check that each element of the members array is an ObjectId */
            await body("members").custom((memberIds: Array<string>) => {
                return memberIds.every((memberId: string) => {
                    return isValidObjectId(memberId);
                });
            }).run(req);
        }
        
        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body malformed"));
        }
        
        /* Create the new group document */
        const newGroup = new Group({
            userId: (req.user as IUser)._id,
            name: req.body.name
        });
        
        /* Assign the optional values appropriately */
        if (req.body.members)
            for (let memberId of req.body.members) {
                /* Verify that the contact is in the database */
                const currentContact = await Contact.findById(memberId); 

                if (currentContact) {
                    /* Remove the contact from the old group if it belongs to one previously */
                    if (currentContact.groupId) {
                        const oldGroup = await Group.findById(currentContact.groupId);
                        if (oldGroup) {
                            oldGroup.members = oldGroup.members.filter(oldMemberId => oldMemberId.toString() !== currentContact._id.toString());
                            await oldGroup.save();
                        }
                    }

                    /* Add the contact to the group */
                    newGroup.members.push(currentContact._id);

                    /* Assign the contact to the group */
                    currentContact.groupId = newGroup._id;
                    currentContact.timestamps.modified = new Date();
                    await currentContact.save();
                }
            }

        /* Save the new group to the database */
        await newGroup.save();
        res.json(new CreatedSuccess("Group successfully created"));
    }
    catch (err) {
        return next(new InternalServerError("Something's gone wrong"));
    }
}

/* Deletes the given group and deassociates all its members from the group;
 * requires, in the request body:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if deletion is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the group to delete does not belong to the currently-authenticated user
 *   - 404 Not Found if the given group ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("Requester is not authenticated"));
        }

        /* Validate and sanitise the required inputs */
        await body("id").isMongoId().run(req);

        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body is malformed"));
        }

        /* Find the specified group */
        const group = await Group.findById(req.body.id);

        /* Check if the group exists */
        if (!group) {
            return next(new NotFoundError("No groups with the given ID exists in the database"));
        }

        /* Check if the group belongs to the currently authenticated user */
        if (group.userId.toString() !== (req.user as IUser)._id.toString()) {
            return next(new ForbiddenError("Group to delete does not belong to the currently-authenticated user"));
        }

        /* Remove the membership of this group from any contact if there is */
        for (let memberId of group.members) {
            const member = await Contact.findById(memberId);
            if (member) {
                member.groupId = undefined;
                member.timestamps.modified = new Date();
                await member.save();
            }
        }

        /* Delete the group */
        await Group.findByIdAndDelete(group._id);
        res.json(new OKSuccess("Group successfully deleted"));
    } catch (err) {
        return next(new InternalServerError("Something has gone wrong"));
    }
}

/* Returns a count of the currently-authenticated user's groups;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getGroupCount(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("Requester is not authenticated"));
        }

        /* Get the group count */
        const count = await Group.countDocuments({ userId: (req.user as IUser)._id });

        return res.json(new OKSuccess(count));
    } catch (error) {
        return next(new InternalServerError("Internal servor error"));
    }
}

/* Returns the given group's details;
 * requires, in the request params:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if query is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the group to return details on does not belong to the currently-authenticated user
 *   - 404 Not Found if the given group ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function getGroupDetails(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if user is authenticated */
        if (req.isUnauthenticated()){
            return next(new UnauthorizedError("Requester is not authenticated"));
        }

        /* Validate and sanitise the required inputs */
        await param("id").isMongoId().run(req);

        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body is malformed"));
        }
        
        /* Find the group and populate the members field */
        const group = await Group.findById(req.params.id)
                                 .populate('members');

        /* Verify that group exists */
        if (!group){
            return next(new NotFoundError("Contact does not exist"));
        }

        /* Verify that the group belongs to the currently authenticated user */
        if (group.userId.toString() !== (req.user as IUser)._id.toString()){
            return next(new ForbiddenError("Contact does not belong to the user"));
        }

        return res.json(new OKSuccess(group)); 
    } catch (error) {
        return next(new InternalServerError("Internal servor error"));
    }
}

/* Returns the currently-authenticated user's groups, along with their representative details;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getGroups(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("Requester is not authenticated"));
        }

        /* Retrieve the groups belonging to the currently authenticated user and populate each members field*/
        const groups = await Group.find({ userId: (req.user as IUser)._id })
                                  .populate('members')

        return res.json(new OKSuccess(groups));
    } catch (error) {
        return next(new InternalServerError("Internal servor error"));
    }
}

/* Export controller functions */
export {
    amendGroupDetails,
    createGroup,
    deleteGroup,
    getGroupCount,
    getGroupDetails,
    getGroups
};
