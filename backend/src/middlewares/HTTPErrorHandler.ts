import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../classes/HTTPError";
import { ErrorResponse } from "../classes/ErrorResponse";

/* Handles HTTP error thrown by middlewares or route functions using next(err) */
const HTTPErrorHandler = (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
    const errorResponse = new ErrorResponse(err);
    res.json(errorResponse);
}

export {
    HTTPErrorHandler
};
