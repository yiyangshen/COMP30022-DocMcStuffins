/* Import required libraries and types */
import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { ObjectId, Types, isValidObjectId } from "mongoose";

/* Import required models */
import { Contact, Gender, Group, Name, IUser } from "../models";

/* Import error and response classes */
import {
    BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError,  
    CreatedSuccess, NoContentSuccess, OKSuccess
} from "../classes";

/* Amends the given contact's details;
 * requires, in the request body:
 *   - id: ObjectId
 *   - firstName: string
 *   - middleName?: string
 *   - lastName: string
 *   - groupId?: ObjectId
 *   - gender?: string
 *   - dateOfBirth?: Date
 *   - lastMet?: Date
 *   - phoneNumber?: string
 *   - email?: string
 *   - photo?: string
 *   - relationship?: string
 *   - additionalNotes?: string
 * responds with a:
 *   - 200 OK if amendment is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the group to amend does not belong to the currently-authenticated user
 *   - 404 Not Found if the given contact ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function amendContactDetails(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("User is not authenticated"));
        }
        
        /* Validate and sanitise the required inputs */
        await body("id").isMongoId().run(req);
        await body("firstName").isAlpha().trim().run(req);
        await body("lastName").isAlpha().trim().run(req);
        
        /* Validate and sanitise the optional inputs */
        if (req.body.middleName)
            await body("middleName").isAlpha().trim().run(req);
        if (req.body.groupId)
            await body("groupId").isMongoId().run(req);
        if (req.body.gender)
            await body("gender").isIn([
            Gender.Male,
            Gender.Female,
            Gender.Other
        ]).run(req);
        if (req.body.dateOfBirth)
            await body("dateOfBirth").isRFC3339().run(req);
        if (req.body.lastMet)
            await body("lastMet").isRFC3339().run(req);
        if (req.body.phoneNumber)
            await body("phoneNumber").isNumeric().trim().run(req);
        if (req.body.email)
            await body("email").isEmail().trim().escape().run(req);
        if (req.body.photo)
            await body("photo").isBase64().run(req);
        if (req.body.relationship)
            await body("relationship").isAscii().trim().run(req);
        if (req.body.additionalNotes)
            await body("additionalNotes").isAscii().trim().run(req);

        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body malformed"));
        }

        /* Find the specified contact */
        const contact = await Contact.findById(req.body.id);

        /* Check if the contact exists */
        if (!contact) {
            return next(new NotFoundError("No contacts with the given ID exists in the database"));
        }

        /* Check if the contact belongs to the currently authenticated user */
        if (contact.userId.toString() !== (req.user as IUser)._id.toString()) {
            return next(new ForbiddenError("Contact to amend does not belong to the currently-authenticated user"));
        }

        /* Update the required fields of the contact */
        contact.name.first = req.body.firstName;
        contact.name.last = req.body.lastName;

        /* Update the optional fields of the contact */
        contact.name.middle = req.body.middleName ? req.body.middleName : undefined;
        contact.gender = req.body.gender ? req.body.gender : undefined;
        contact.dateOfBirth = req.body.DateOfBirth ? new Date(req.body.dateOfBirth) : undefined;
        contact.lastMet = req.body.lastMet ? new Date(req.body.lastMet) : undefined;
        contact.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : undefined;
        contact.email = req.body.email ? req.body.email.toLowerCase() : undefined;
        contact.photo = req.body.photo ? req.body.photo : undefined;
        contact.relationship = req.body.relationship ? req.body.relationship : undefined;
        contact.additionalNotes = req.body.additionalNotes ? req.body.additionalNotes : undefined;

        /* Check for any amendment in the group membership */
        if (req.body.groupId?.toString() !== contact.groupId?.toString()) {
            /* Remove the membership of the current group */
            const oldGroup = contact.groupId ? await Group.findById(contact.groupId) : undefined;
            if (oldGroup) {
                oldGroup.members = oldGroup.members.filter(memberId => memberId.toString() !== contact._id.toString());
                await oldGroup.save();
            }

            /* Assign the new group to the contact if it exists */
            const newGroup = req.body.groupId ? await Group.findById(req.body.groupId) : undefined;
            if (newGroup) {
                contact.groupId = newGroup._id;

                /* Update the new group membership to include this contact */
                newGroup.members.push(contact._id);
                await newGroup.save();
            } else {
                contact.groupId = undefined;
            }
        }
        
        /* Update the modified timestamp */
        contact.timestamps.modified = new Date();

        /* Save the amended contact to the database */
        await contact.save();
        res.json(new OKSuccess("Contact successfully amended"));
    } catch (err) {
        return next(new InternalServerError("Something has gone wrong"));
    }
}

/* Creates a new contact with the given details;
 * requires, in the request body:
 *   - firstName: string
 *   - middleName?: string
 *   - lastName: string
 *   - groupId?: ObjectId
 *   - gender?: string
 *   - dateOfBirth?: Date
 *   - lastMet?: Date
 *   - phoneNumber?: string
 *   - email?: string
 *   - photo?: string
 *   - relationship?: string
 *   - additionalNotes?: string
 * responds with a:
 *   - 201 Created if creation is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function createContact(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("User is not authenticated"));
        }
        
        /* Validate and sanitise the required inputs */
        await body("firstName").isAlpha().trim().run(req);
        await body("lastName").isAlpha().trim().run(req);
        
        /* Validate and sanitise the optional inputs */
        if (req.body.middleName)
            await body("middleName").isAlpha().trim().run(req);
        if (req.body.groupId)
            await body("groupId").isMongoId().run(req);
        if (req.body.gender)
            await body("gender").isIn([
            Gender.Male,
            Gender.Female,
            Gender.Other
        ]).run(req);
        if (req.body.dateOfBirth)
            await body("dateOfBirth").isRFC3339().run(req);
        if (req.body.lastMet)
            await body("lastMet").isRFC3339().run(req);
        if (req.body.phoneNumber)
            await body("phoneNumber").isNumeric().trim().run(req);
        if (req.body.email)
            await body("email").isEmail().trim().escape().run(req);
        if (req.body.photo)
            await body("photo").isBase64().run(req);
        if (req.body.relationship)
            await body("relationship").isAscii().trim().run(req);
        if (req.body.additionalNotes)
            await body("additionalNotes").isAscii().trim().run(req);

        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body malformed"));
        }
        
        /* Create the new contact document */
        const newContact = new Contact({
            userId: (req.user as IUser)._id,
            name: new Name({
                first: req.body.firstName,
                last: req.body.lastName
            })
        });
        
        /* Assign the optional values appropriately */
        if (req.body.middleName)
            newContact.name.middle = req.body.middleName;
        if (req.body.groupId) {
            /* Check if the group is in the database */
            const currentGroup = await Group.findById(req.body.groupId);

            if (currentGroup) {
                /* Assign the contact to the group */
                newContact.groupId = currentGroup._id;
                
                /* Add the contact to the group */
                currentGroup.members.push(newContact._id);
                await currentGroup.save();
            }
        }
        if (req.body.gender)
            newContact.gender = req.body.gender;
        if (req.body.dateOfBirth)
            newContact.dateOfBirth = new Date(req.body.dateOfBirth);
        if (req.body.lastMet)
            newContact.dateOfBirth = new Date(req.body.lastMet);
        if (req.body.phoneNumber)
            newContact.phoneNumber = req.body.phoneNumber;
        if (req.body.email)
            newContact.email = req.body.email.toLowerCase();
        if (req.body.photo)
            newContact.photo = req.body.photo;
        if (req.body.relationship)
            newContact.relationship = req.body.relationship;
        if (req.body.additionalNotes)
            newContact.additionalNotes = req.body.additionalNotes;
        
        /* Save the new contact to the database */
        await newContact.save();
        res.json(new CreatedSuccess("Contact successfully created"));
    }
    catch(err) {
        return next(new InternalServerError("Something's gone wrong"));
    }
}

/* Deletes the given contact and deassociates it from its group, if present;
 * requires, in the request body:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if deletion is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the contact to delete does not belong to the currently-authenticated user
 *   - 404 Not Found if the given contact ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function deleteContact(req: Request, res: Response, next: NextFunction) {
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

        /* Find the specified contact */
        const contact = await Contact.findById(req.body.id);

        /* Check if the contact exists */
        if (!contact) {
            return next(new NotFoundError("No contacts with the given ID exists in the database"));
        }

        /* Check if the contact belongs to the currently authenticated user */
        if (contact.userId.toString() !== (req.user as IUser)._id.toString()) {
            return next(new ForbiddenError("Contact to delete does not belong to the currently-authenticated user"));
        }

        /* Remove the contact from the membership of their group if there is */
        if (contact.groupId) {
            const group = await Group.findById(contact.groupId);
            if (group) {
                group.members = group.members.filter(contactId => contactId.toString() !== contact._id.toString());
                await group.save();
            }
        }
        
        /* Delete the contact */
        await Contact.findByIdAndDelete(contact._id);
        res.json(new OKSuccess("Contact successfully deleted"));
    } catch (err) {
        return next(new InternalServerError("Something has gone wrong"));
    }
}

/* Returns a count of the currently-authenticated user's contacts;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getContactCount(req: Request, res: Response, next: NextFunction) {
    if (req.isUnauthenticated()) {
        return next(new UnauthorizedError("Requester is not authenticated"));
    }
    try {
        const count = await Contact.countDocuments({ userId: (req.user as IUser)._id });
        return res.json(new OKSuccess(count));
    } catch (error) {
        return next(new InternalServerError("Internal servor error"));
    }
}

/* Returns the given contact's details;
 * requires, in the request params:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if query is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the contact to return details on does not belong to the currently-authenticated user
 *   - 404 Not Found if the given contact ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function getContactDetails(req: Request, res: Response, next: NextFunction) {
    // requester is not authenticated
    if(req.isUnauthenticated()){
        return next(new UnauthorizedError("Requester is not authenticated"));
    }

    try {
        // verify that the parameter is valid
        if (!(isValidObjectId(req.params.id))) {
            return next(new BadRequestError("Request body is malformed"));
        }
        const contact = await Contact.findOne({_id:req.params.id})
                                     .populate('groupId');

        // verify that contact exist 
        if(!contact){
            return next(new NotFoundError("Contact does not exist"));
        }
        // verify that the contact id is under the authenticated user
        if(contact.userId.toString() !== (req.user as IUser)._id.toString()){
            return next(new ForbiddenError("Contact does not belong to the user"));
        }

        // update recently-viewed timestamp
        contact.timestamps.viewed = new Date();
        await contact.save();

        return res.json(new OKSuccess(contact));
            
    } catch (error) {
        return next(new InternalServerError("Internal servor error"));
    }
}

/* Returns the currently-authenticated user's contacts, along with their representative details;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 204 No Content if query returns nothing
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getContacts(req: Request, res: Response, next: NextFunction) {
    // requester is not authenticated
    if (req.isUnauthenticated()) {
        return next(new UnauthorizedError("Requester is not authenticated"));
    }
    try {
        // find all the contacts of this userId and replace all _id of
        // contact with its own model
        const contacts = await Contact.find({ userId: (req.user as IUser)._id })
                                      .populate('groupId')
        
        //  in case if user doesn't have any contacts
        if(contacts.length === 0){
            return res.status(204).json(new NoContentSuccess());
        }
        return res.json(new OKSuccess(contacts));
    } catch (error) {
        return next(new InternalServerError("Internal servor error"));
    }
}

/* Returns the currently-authenticated user's contacts that fuzzy-matches the given search string;
 * requires, in the request params:
 *   - name: string
 * responds with a:
 *   - 200 OK if query returns something
 *   - 204 No Content if the query returns nothing
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function searchContactName(req: Request, res: Response, next: NextFunction) {

}

/* Export controller functions */
export {
    amendContactDetails,
    createContact,
    deleteContact,
    getContactCount,
    getContactDetails,
    getContacts,
    searchContactName
};
