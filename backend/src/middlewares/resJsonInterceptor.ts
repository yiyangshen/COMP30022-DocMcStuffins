import { Request, Response, NextFunction } from "express";
import { HTTPError, HTTPSuccess, ErrorResponse, JSONResponse, InternalServerError, APIResponse, BooleanResponse, ListResponse, NumberResponse, StringResponse } from "../classes";

/* Intercepts a res.json() call to ensure it sends a standardised object */
export const resJsonInterceptor = (req: Request, res: Response, next: NextFunction) => {
    let defaultResJson = res.json;
    res.json = (body) => {
        if (body instanceof HTTPError) {
            body = new ErrorResponse(body);
        } else if (body instanceof HTTPSuccess) {
            if (body.body instanceof Array) {
                body = new ListResponse(body);
            } else {
                switch (typeof body.body) {
                    case "object":
                        body = new JSONResponse(body);
                        break;
                    case "boolean":
                        body = new BooleanResponse(body);
                        break;
                    case "number":
                        body = new NumberResponse(body);
                        break;
                    case "string":
                        body = new StringResponse(body);
                        break;
                    default:
                        body = new ErrorResponse(new InternalServerError("Argument type to HTTPSuccess constructor is incompatible"));
                }
            }
        } else if (!(body instanceof APIResponse)) {
            body = new ErrorResponse(new InternalServerError("Argument to res.json() must be either an HTTPResponse or APIResponse object"));
        }
        res.json = defaultResJson;
        return res.status(body.status).json(body);
    }
    next();
}