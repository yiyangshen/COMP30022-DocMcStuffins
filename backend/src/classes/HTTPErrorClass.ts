/* Import required classes */
import { HTTPResponse } from "./index";

/* HTTP Error response format for error handling */
export class HTTPError extends HTTPResponse {
    constructor(status: number, statusText: string, body: string) {
        super(status, statusText, body);
    }
}

/* HTTP Error response format for 400 Bad Request errors */
export class BadRequestError extends HTTPError {
    constructor(message: string) {
        super(400, "Bad Request", message);
    }    
}

/* HTTP Error response format for 401 Unauthorized errors */
export class UnauthorizedError extends HTTPError {
    constructor(message: string) {
        super(401, "Unauthorized", message);
    }    
}

/* HTTP Error response format for 403 Forbidden errors */
export class ForbiddenError extends HTTPError {
    constructor(message: string) {
        super(403, "Forbidden", message);
    }    
}

/* HTTP Error response format for 404 Not Found errors */
export class NotFoundError extends HTTPError {
    constructor(message: string) {
        super(404, "Not Found", message);
    }    
}

/* HTTP Error response format for 500 Internal Server Error errors */
export class InternalServerError extends HTTPError {
    constructor(message: string) {
        super(500, "Internal Server Error", message);
    }    
}
