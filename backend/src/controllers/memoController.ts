/* Import required libraries and types */
import { Request, Response, NextFunction } from "express";

/* Import required models */
import { Group } from "../models";

/* Amends the given memo's details;
 * requires, in the request body:
 *   - id: ObjectId
 *   - title?: string
 *   - notes?: string
 * responds with a:
 *   - 200 OK if amendment is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the memo to amend does not belong to the currently-authenticated user
 *   - 404 Not Found if the given memo ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function amendMemoDetails(req: Request, res: Response, next: NextFunction) {

}

/* Creates a new memo with the given details;
 * requires, in the request body:
 *   - title: string
 *   - notes?: string
 * responds with a:
 *   - 201 Created if creation is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function createMemo(req: Request, res: Response, next: NextFunction) {

}

/* Deletes the given memo;
 * requires, in the request body:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if deletion is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the memo to delete does not belong to the currently-authenticated user
 *   - 404 Not Found if the given memo ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function deleteMemo(req: Request, res: Response, next: NextFunction) {

}

/* Returns the given memo's details;
 * requires, in the request params:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if query is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the group to return details on does not belong to the currently-authenticated user
 *   - 404 Not Found if the given memo ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function getMemoDetails(req: Request, res: Response, next: NextFunction) {

}

/* Returns the currently-authenticated user's memos, along with their representative details;
 * responds with a:
 *   - 200 OK if query returns something
 *   - 204 No Content if the query returns nothing
 *   - 403 Forbidden if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getMemos(req: Request, res: Response, next: NextFunction) {

}

/* Returns the currently-authenticated user's n recentmost memos, along with their representative details;
 * requires, in the request params:
 *   - n: number
 * responds with a:
 *   - 200 OK if query is successful
 *   - 204 No Content if the query returns nothing
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getRecentMemos(req: Request, res: Response, next: NextFunction) {

}

/* Export controller functions */
export {
    amendMemoDetails,
    createMemo,
    deleteMemo,
    getMemoDetails,
    getMemos,
    getRecentMemos
};
