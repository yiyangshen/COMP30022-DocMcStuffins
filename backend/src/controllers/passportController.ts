import passport from "passport";
import { Request, Response, NextFunction } from "express"
import { User } from "../models"

import { JSONResponse } from "../classes/JSONResponse";
import { HTTPError } from "../classes/HTTPError";

// Handle Logins
const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    // ensure required fields were entered
    if (!req.body.email || !req.body.password) {
        const err = new HTTPError(400, 'Bad Request', 'Please enter required fields');
        return next(err);
    }
    passport.authenticate('local', (error: any, user: any, info: any) => {
        if (error) {
            return next(error);
        }
        if (!user && info.message == 'NOT_FOUND') {
            const err = new HTTPError(404, 'Not Found', 'No user matches email');
            return next(err);

        }
        if (!user && info.message == 'INCORRECT') {
            const err = new HTTPError(401, 'Unauthorized', 'Incorrect password');
            return next(err);
        }
        if (user) {
            return res.status(200).json(new JSONResponse({ message: "Login Successful" }));
        }
    })(req, res, next);
}

// Handle Logout
const handleLogout = async (req: Request, res: Response) => {
    req.logout();
    return res.json(new JSONResponse({ message: "Logout Successful" }));
}

// Handle register
const handleRegister = async (req: Request & {
    params: { email: string, password: string, firstName: string, lastName: string }
}, res: Response, next: NextFunction) => {
    // ensure required fields were entered
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        const err = new HTTPError(400, 'Bad Request', 'Please enter required fields');
        return next(err);
    }
    passport.authenticate('local-signup', (error: any, user: any, info: any) => {
        if (error) {
            return next(error);
        }
        if (!user && info.message == 'PASSWORD_LEN') {
            const err = new HTTPError(400, 'Bad Request', 'Password should be at least 6 characters');
            return next(err);
        }
        if (!user && info.message == 'EXIST') {
            const err = new HTTPError(404, 'Not Found', 'User already exists');
            return next(err);

        }
        if (user) {
            return res.json(new JSONResponse({ message: "Sign-up Successful" }));
        }
    })(req, res, next);
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.isAuthenticated()) {
            return res.json(new JSONResponse({ message: "You are authenticated" }));
        } else {
            return res.json(new JSONResponse({ message: "You are not authenticated" }));
        }
    } catch (error) {
        return res.send(error);
    }
}

export { handleLogin, handleLogout, handleRegister, isAuthenticated };