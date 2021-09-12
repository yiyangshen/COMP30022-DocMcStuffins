import { Request, Response, NextFunction } from "express";
import { HTTPError, InternalServerError } from "../classes";

/* Handles HTTP error thrown by middlewares or route functions using next(err) */
export const HTTPErrorHandler = (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    // Check whether all the error fields are filled
    if (err.status === undefined || err.statusText === undefined || err.body === undefined) {
        console.log(err);
        error = new InternalServerError("Unknown error");
    }

    res.json(error);
};
