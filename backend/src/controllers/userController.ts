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
import { body, validationResult } from "express-validator";
import { User, IUser } from "../models"

/* Amends the user profile;
 * requires, in the request body:
 *   - firstName: string
 *   - middleName?: string
 *   - lastName: string
 *   - email: string
 *   - password: string
 * responds with a:
 *   - 200 OK if amendment is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function amendProfileDetails(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("User is not authenticated"));
        }

        /* Validate and sanitise the required inputs */
        await body("firstName").isAlpha().trim().run(req);
        await body("lastName").isAlpha().trim().run(req);
        await body("email").isEmail().trim().escape().run(req);
        await body("password").isString().isLength({min: 6}).run(req);

        /* Validate and sanitise the optional inputs */
        if (req.body.middleName)
            await body("middleName").isAlpha().trim().run(req);
        
        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body malformed"));
        }

        /* Get the user document object from the database */
        const user = await User.findById((req.user as IUser)._id);
        if (!user) {
            return next(new InternalServerError("User not found (which should never happen normally)"));
        }

        /* Update the required fields of the user */
        user.name.first = req.body.firstName;
        user.name.last = req.body.lastName;
        user.email = req.body.email.toLowerCase();
        user.password = req.body.password;

        /* Update the optional fields of the user */
        user.name.middle = req.body.middleName ? req.body.middleName : undefined;
        
        /* Save the amended user to the database */
        await user.save();
        res.json(new OKSuccess("User profile successfully amended"));
    } catch (err) {
        return next(new InternalServerError("Something has gone wrong"));
    }
}

/* Retrieves the currently-authenticated user's profile details;
 * responds with a:
 *   - 200 OK if the details was successfully retrieved
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("User is not authenticated"));
        }

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
    try {
        /* Validate and sanitise the required inputs */
        await body("email").isEmail().trim().escape().run(req);
        await body("password").isString().isLength({min: 6}).run(req);

        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body malformed"));
        }
        
        /* Try to authenticate the user */
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
    } catch (err) {
        return next(new InternalServerError("Something has gone wrong"));
    }
}

/* Deauthenticates the currently-authenticated user;
 * responds with a:
 *   - 200 OK if deauthentication is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
        /* Check if the user is authenticated */
        if (req.isUnauthenticated()) {
            return next(new UnauthorizedError("User is not authenticated"));
        }

        /* Log the user out of the current session */
        req.logout();

        res.json(new OKSuccess("Logout successful"));
    } catch (err) {
        next(new InternalServerError("Error logging out user"));
    }
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
    try {
        /* Check if the user is authenticated */
        if (req.isAuthenticated()) {
            return next(new ForbiddenError("User is already logged in"));
        }

        /* Validate and sanitise the required inputs */
        await body("firstName").isAlpha().trim().run(req);
        await body("lastName").isAlpha().trim().run(req);
        await body("email").isEmail().trim().escape().run(req);
        await body("password").isString().isLength({min: 6}).run(req);

        /* Validate and sanitise the optional inputs */
        if (req.body.middleName)
            await body("middleName").isAlpha().trim().run(req);
        
        /* Check for any validation errors */
        if (!validationResult(req).isEmpty()) {
            return next(new BadRequestError("Request body malformed"));
        }

        /* Try registering the new user */
        passport.authenticate("local-signup", (err: any, user: any, info: any) => {
            if (err) {
                return next(new InternalServerError("Error registering new user"));
            }
            if (!user) {
                switch (info.message) {
                    case "PASSWORD_LEN":
                        return next(new BadRequestError("Password should be at least 6 characters"));
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
    } catch (err) {
        return next(new InternalServerError("Something has gone wrong"));
    }
}

/* Export controller functions */
export {
    amendProfileDetails,
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser
};
