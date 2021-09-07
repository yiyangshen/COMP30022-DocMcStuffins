import { Request, Response, NextFunction } from "express";
import {
    ErrorResponse,
    HTTPError, BadRequestError
} from "../classes";

/* Handles HTTP error thrown by middlewares or route functions using next(err) */
const HTTPErrorHandler = (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    // Check whether all the error fields are filled
    if (err.status === undefined || err.statusText === undefined || err.body === undefined) {
        error = new BadRequestError("Incomplete error fields");
    }

    const errorResponse = new ErrorResponse(error);
    res.status(error.status).json(errorResponse);
}

export {
    HTTPErrorHandler
};
