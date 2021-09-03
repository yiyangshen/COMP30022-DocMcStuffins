import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../classes/HTTPError";
import { ErrorResponse } from "../classes/ErrorResponse";

/* Handles HTTP error thrown by middlewares or route functions using next(err) */
const HTTPErrorHandler = (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    // Check whether all the error fields are filled
    if (err.status === undefined || err.statusText === undefined || err.message === undefined) {
        error = new HTTPError(400, "Bad Request", "Incomplete error fields");
    }

    const errorResponse = new ErrorResponse(error);
    res.status(error.status).json(errorResponse);
}

export {
    HTTPErrorHandler
};
