import passport from "passport";
import { Request, Response, NextFunction } from "express"
import { User } from "../models"

import { JSONResponse } from "../classes/JSONResponse";
import { HTTPError } from "../classes/HTTPError";
import { ErrorResponse } from "../classes/ErrorResponse";

// Handle Logins
const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (error: any, user: any, info: any) => {
        if (error) {
            // return next(error);
            return res.send(error);
        }
        if (!user && info.message == 'NOT_FOUND') {
            // return next(error);
            return res.send(new ErrorResponse(new HTTPError(404, 'Not Found', 'No user matches email')));

        }
        if (!user && info.message == 'INCORRECT') {
            // return next(error);
            return res.send(new ErrorResponse(new HTTPError(401, 'Unauthorized', 'Incorrect password')));
        }
        if (user) {
            return res.send(new JSONResponse({ message: "Login Successful" }));
        }
    })(req, res, next);
}

// Handle Logout
const handleLogout = async (req: Request, res: Response) => {
    req.logout();
    return res.send(new JSONResponse({ message: "Logout Successful" }));
}

// Handle register
const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local-signup', (error: any, user: any, info: any) => {
        if (error) {
            // return next(error);
            return res.send(error);
        }
        if (!user && info.message == 'EXIST') {
            // return next(error);
            return res.send(new ErrorResponse(new HTTPError(404, 'Not Found', 'User already exists')));

        }
        if (user) {
            return res.send(new JSONResponse({ message: "Sign-up Successful" }));
        }
    })(req, res, next);
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.isAuthenticated()) {
            return res.send(new JSONResponse({ message: "You are authenticated" }));
        } else {
            return res.send(new JSONResponse({ message: "You are not authenticated" }));
        }
    } catch (error) {
        return res.send(error);
    }
}

export { handleLogin, handleLogout, handleRegister, isAuthenticated };