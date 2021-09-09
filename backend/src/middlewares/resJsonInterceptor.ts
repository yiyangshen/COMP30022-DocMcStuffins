import { Request, Response, NextFunction } from "express";
import { HTTPError, HTTPSuccess, ErrorResponse, JSONResponse, InternalServerError, APIResponse } from "../classes";

/* Intercepts a res.json() call to ensure it sends a standardised object */
export const resJsonInterceptor = (req: Request, res: Response, next: NextFunction) => {
    let defaultResJson = res.json;
    res.json = (body) => {
        if (body instanceof HTTPError) {
            body = new ErrorResponse(body);
        } else if (body instanceof HTTPSuccess) {
            body = new JSONResponse(body);
        } else if (!(body instanceof APIResponse)) {
            body = new ErrorResponse(new InternalServerError("Argument to res.json() must be either an HTTPResponse or APIResponse object"));
        }
        res.json = defaultResJson;
        return res.status(body.status).json(body);
    }
    next();
}