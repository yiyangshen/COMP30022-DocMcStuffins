/* Import required libraries and types */
import { Request, Response, NextFunction } from "express";

/* Import required models */
import { User, IUser } from "../models";

/* Retrieves the currently-authenticated user's profile details;
 * responds with a:
 *   - 200 OK if the details was successfully retrieved
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getUserProfile(req: Request, res: Response, next: NextFunction) {

}

/* Authenticate the user;
 * requires, in the request body:
 *   - email: string
 *   - password: string
 * responds with a:
 *   - 200 OK if authentication is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if the provided information is invalid
 *   - 500 Internal Server Error otherwise
 */
async function loginUser(req: Request, res: Response, next: NextFunction) {

}

/* Deauthenticates the currently-authenticated user;
 * responds with a:
 *   - 200 OK if deauthentication is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function logoutUser(req: Request, res: Response, next: NextFunction) {

}

/* Registers and subsequently authenticates a new user;
 * requires, in the request body:
 *   - email: string
 *   - password: string
 * responds with a:
 *   - 200 OK if the registration is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if the requester:
 *     - is already authenticated
 *     - provides an existing email address within the database
 *   - 500 Internal Server Error otherwise
 */
async function registerUser(req: Request, res: Response, next: NextFunction) {

}

/* Export controller functions */
export {
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser
};
