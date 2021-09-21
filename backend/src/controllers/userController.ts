/* Import required libraries and types */
import {
    UnauthorizedError,
    OKSuccess,
    InternalServerError,
    BadRequestError,
    ForbiddenError,
    CreatedSuccess
} from "../classes";
import { Request, Response, NextFunction } from "express";
import passport from "passport";

/* Retrieves the currently-authenticated user's profile details;
 * responds with a:
 *   - 200 OK if the details was successfully retrieved
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getUserProfile(req: Request, res: Response, next: NextFunction) {
    if (req.isUnauthenticated()) {
        return next(new UnauthorizedError("User is not authenticated"));
    }
    try {
        res.json(new OKSuccess(req.user));
    } catch (err) {
        next(new InternalServerError("Failed fetching the user"));
    }
}

/* Authenticate the user;
 * requires, in the request body:
 *   - email: string
 *   - password: string
 * responds with a:
 *   - 200 OK if authentication is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if the provided information does not match any user in the database
 *   - 500 Internal Server Error otherwise
 */
async function loginUser(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email || !req.body.password) {
        return next(new BadRequestError("Request body malformed"));
    }
    passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) {
            return next(new InternalServerError("Error finding user"));
        }
        if (!user) {
            return next(new ForbiddenError("Incorrect email or password"));
        }
        req.login(user, (err) => {
            if (err) {
                next(new InternalServerError("Error logging in user"));
            }
        });
        res.json(new OKSuccess("Login Successful"));
    })(req, res, next);
}

/* Deauthenticates the currently-authenticated user;
 * responds with a:
 *   - 200 OK if deauthentication is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function logoutUser(req: Request, res: Response, next: NextFunction) {
    if (req.isUnauthenticated()) {
        return next(new UnauthorizedError("User is not authenticated"));
    }
    try {
        req.logout();
    } catch (err) {
        next(new InternalServerError("Error logging out user"));
    }
    res.json(new OKSuccess("Logout successful"));
}

/* Registers and subsequently authenticates a new user;
 * requires, in the request body:
 *   - firstName: string
 *   - middleName?: string
 *   - lastName: string
 *   - email: string
 *   - password: string
 * responds with a:
 *   - 201 Created if the registration is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if the requester:
 *     - is already authenticated
 *     - provides an existing email address within the database
 *   - 500 Internal Server Error otherwise
 */
async function registerUser(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return next(new BadRequestError("Request body malformed"));
    }
    if (req.isAuthenticated()) {
        return next(new ForbiddenError("User is already logged in"));
    }
    passport.authenticate("local-signup", (err: any, user: any, info: any) => {
        if (err) {
            return next(new InternalServerError("Error registering new user"));
        }
        if (!user) {
            switch (info.message) {
                case "PASSWORD_LEN":
                    return next(new ForbiddenError("Password should be at least 6 characters"));
                case "EXIST":
                    return next(new ForbiddenError("Email already exists"));
            }
        }
        // Log in the user after registering successfully
        if (user) {
            req.login(user, (err) => {
                if (err)
                    return next(new InternalServerError("Error logging in new user"));
            });
        }
        res.json(new CreatedSuccess("New user registered"));
    })(req, res, next);
}

/* Export controller functions */
export {
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser
};
