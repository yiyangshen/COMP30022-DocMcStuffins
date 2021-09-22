/* Import required libraries and types */
import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { ObjectId, Types } from "mongoose";

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
 *   - firstName?: string
 *   - middleName?: string
 *   - lastName?: string
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
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the group to amend does not belong to the currently-authenticated user
 *   - 404 Not Found if the given contact ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function amendContactDetails(req: Request, res: Response, next: NextFunction) {

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
                newContact.groupId = Types.ObjectId(req.body.groupId) as ObjectId;
                
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
        if(req.params.id){
            const contact = await Contact.findOne({_id:req.params.id})
                                         .populate('groupId');

            // verify that contact exist 
            if(!contact){
                return next(new NotFoundError("Contact does not exist"));
            }
            // verify that the contact id is under the authenticated user
            if(contact.userId !== (req.user as IUser)._id){
                return next(new ForbiddenError("Contact does not belong to the user"));
            }

            // update recently-viewed timestamp
            contact.timestamps.viewed = new Date();
            await contact.save();

            return res.json(new OKSuccess(contact));
            

        } else {
            // request parameter is malformed
            return next(new BadRequestError("Requester parameter is invalid"));
        }
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
