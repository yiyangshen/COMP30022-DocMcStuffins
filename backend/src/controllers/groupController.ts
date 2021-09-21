/* Import required libraries and types */
import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { ObjectId, Types, isValidObjectId } from "mongoose";

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
 *   - name?: string
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
            req.body.members.forEach(async (memberId: string) => {
                /* Verify that the contact is in the database */
                const currentContact = await Contact.findById(memberId); 

                if (currentContact) {
                    /* Add the contact to the group */
                    newGroup.members.push(Types.ObjectId(memberId) as ObjectId);

                    /* Assign the contact to the group */
                    currentContact.groupId = newGroup._id;
                    await currentContact.save();
                }
            });

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

}

/* Returns a count of the currently-authenticated user's groups;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getGroupCount(req: Request, res: Response, next: NextFunction) {
    if (req.isUnauthenticated()) {
        return next(new UnauthorizedError("Requester is not authenticated"));
    }
    try {
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

}

/* Returns the currently-authenticated user's groups, along with their representative details;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getGroups(req: Request, res: Response, next: NextFunction) {
        // requester is not authenticated
    if (req.isUnauthenticated()) {
        return next(new UnauthorizedError("Requester is not authenticated"));
    }
    try {
        // find all the group of this userId and replace all _id of 
        // group with its own model
        const groups = await Group.find({ userId: (req as any).user.id })
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
