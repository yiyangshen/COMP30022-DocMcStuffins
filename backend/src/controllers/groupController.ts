/* Import required libraries and types */
import { Request, Response, NextFunction } from "express";

/* Import required models */
import { Group } from "../models";

/* Import error and response classes */
import {
    JSONResponse,
    BadRequestError, NotFoundError, UnauthorizedError, InternalServerError,
    ForbiddenError,
    OKSuccess
} from "../classes";

/* Amends the given group's details;
 * requires, in the request body:
 *   - id: ObjectId
 *   - name?: string
 *   - members?: [ObjectId]
 * responds with a:
 *   - 200 OK if amendment is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the group to amend does not belong to the currently-authenticated user
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
 *   - 403 Forbidden if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function createGroup(req: Request, res: Response, next: NextFunction) {

}

/* Deletes the given group and deassociates all its members from the group;
 * requires, in the request body:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if deletion is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the group to delete does not belong to the currently-authenticated user
 *   - 404 Not Found if the given group ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function deleteGroup(req: Request, res: Response, next: NextFunction) {

}

/* Returns a count of the currently-authenticated user's groups;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 403 Forbidden if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getGroupCount(req: Request, res: Response, next: NextFunction) {
    if (req.isUnauthenticated()) {
        return next(new ForbiddenError("Requester is not authenticated"));
    }
    try {
        const count = await Group.countDocuments({ userId: (req as any).user._id });
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
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the group to return details on does not belong to the currently-authenticated user
 *   - 404 Not Found if the given group ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function getGroupDetails(req: Request, res: Response, next: NextFunction) {

}

/* Returns the currently-authenticated user's groups, along with their representative details;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 403 Forbidden if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getGroups(req: Request, res: Response, next: NextFunction) {
        // requester is not authenticated
    if (req.isUnauthenticated()) {
        return next(new ForbiddenError("Requester is not authenticated"));
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
