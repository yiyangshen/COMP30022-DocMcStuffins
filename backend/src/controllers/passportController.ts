import passport from "passport";
import { Request, Response, NextFunction } from "express"
import { User } from "../models"
import {
    BadRequestError, NotFoundError, UnauthorizedError,
    OKSuccess
} from "../classes";

// Handle Logins
const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    // ensure required fields were entered
    if (!req.body.email || !req.body.password) {
        const err = new BadRequestError('Please enter required fields');
        return next(err);
    }
    passport.authenticate('local', (error: any, user: any, info: any) => {
        if (error) {
            return next(error);
        }
        if (!user && info.message == 'NOT_FOUND') {
            const err = new NotFoundError('No user matches email');
            return next(err);

        }
        if (!user && info.message == 'INCORRECT') {
            const err = new UnauthorizedError('Incorrect password');
            return next(err);
        }
        if (user) {
            req.login(user, (err) => {
                if (err) {
                    next(err);
                }
            })
            return res.json(new OKSuccess("Login Successful"));
        }
    })(req, res, next);
}

// Handle Logout
const handleLogout = async (req: Request, res: Response) => {
    req.logout();
    return res.json(new OKSuccess("Logout Successful"));
}

// Handle register
const handleRegister = async (req: Request & {
    params: { email: string, password: string, firstName: string, lastName: string }
}, res: Response, next: NextFunction) => {
    // ensure required fields were entered
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        const err = new BadRequestError('Please enter required fields');
        return next(err);
    }
    passport.authenticate('local-signup', (error: any, user: any, info: any) => {
        if (error) {
            return next(error);
        }
        if (!user && info.message == 'PASSWORD_LEN') {
            const err = new BadRequestError('Password should be at least 6 characters');
            return next(err);
        }
        if (!user && info.message == 'EXIST') {
            const err = new NotFoundError('User already exists');
            return next(err);

        }
        // Login the new user after successfully registering
        if (user) {
            req.login(user, (err) => {
                if (err) {
                    next(err);
                }
            })
            return res.json(new OKSuccess("Sign-up Successful"));
        }
    })(req, res, next);
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.isAuthenticated()) {
            return res.json(new OKSuccess("You are authenticated"));
        } else {
            return res.json(new OKSuccess("You are not authenticated"));
        }
    } catch (error) {
        return next(error);
    }
}

export { handleLogin, handleLogout, handleRegister, isAuthenticated };
