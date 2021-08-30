import { StandardResponse } from "./StandardResponse";
import { HTTPError }from "./HTTPError";

/* Various kinds of error responses typically created by the error handler */
export class ErrorResponse extends StandardResponse {
    constructor(err: HTTPError) {
        super("text/error", err.status, err.statusText, err.message);
    }
}