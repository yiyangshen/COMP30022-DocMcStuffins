/* Import required classes */
import { HTTPError, HTTPSuccess } from "./index";

/* General API response format */
export abstract class APIResponse {
    readonly status: number;
    readonly statusText: string;
    readonly mimetype: string;
    readonly data: string|null;

    constructor(status: number, statusText: string, mimetype: string, data: string|null) {
        this.status = status;
        this.statusText = statusText;
        this.mimetype = mimetype;
        this.data = data;
    }
}

/* Error API response format for HTTP Error handling */ 
export class ErrorResponse extends APIResponse {
    constructor(err: HTTPError) {
        super(err.status, err.statusText, "text/error", err.body);
    }
}

/* JSON API response format for general HTTP Success responses */
export class JSONResponse extends APIResponse {
    constructor(res: HTTPSuccess) {
        // Ensure that the data stored has the type of JSON string (not object)
        super(res.status, res.statusText, "application/json", res.body);
    }
}
