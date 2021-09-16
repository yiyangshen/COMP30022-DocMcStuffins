/* Import required libraries and types */
import { Request, Response, NextFunction } from "express";

/* Import required models */
import { User, Contact } from "../models";

/* Import error and response classes */
import {
    JSONResponse,
    BadRequestError, NotFoundError, UnauthorizedError, InternalServerError,
    ForbiddenError,
    OKSuccess
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
 *   - 403 Forbidden if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function createContact(req: Request, res: Response, next: NextFunction) {

}

/* Deletes the given contact and deassociates it from its group, if present;
 * requires, in the request body:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if deletion is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the contact to delete does not belong to the currently-authenticated user
 *   - 404 Not Found if the given contact ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function deleteContact(req: Request, res: Response, next: NextFunction) {

}

/* Returns a count of the currently-authenticated user's contacts;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 403 Forbidden if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getContactCount(req: Request, res: Response, next: NextFunction) {
    if (req.isUnauthenticated()) {
        return next(new ForbiddenError("Requester is not authenticated"));
    }
    try {
        const count = await Contact.countDocuments({ userId: (req as any).user.id });
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
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the contact to return details on does not belong to the currently-authenticated user
 *   - 404 Not Found if the given contact ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function getContactDetails(req: Request, res: Response, next: NextFunction) {

}

/* Returns the currently-authenticated user's contacts, along with their representative details;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 403 Forbidden if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getContacts(req: Request, res: Response, next: NextFunction) {
    // requester is not authenticated
    if (req.isUnauthenticated()) {
        return next(new ForbiddenError("Requester is not authenticated"));
    }
    try {
        // find all the contacts of this userId and replace all _id of
        // contact with its own model
        const contacts = await Contact.find({ userId: (req as any).user.id })
                                      .populate('groupId')
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
 *   - 403 Forbidden if the requester is not authenticated
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
