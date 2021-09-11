/* Import required classes */
import { HTTPError, HTTPSuccess } from "./index";

/* General API response format */
export abstract class APIResponse {
    readonly status: number;
    readonly statusText: string;
    readonly mimetype: string;
    readonly data: any;

    constructor(status: number, statusText: string, mimetype: string, data: any) {
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

/* JSON API response format for JSON responses */
export class JSONResponse extends APIResponse {
    constructor(res: HTTPSuccess) {
        super(res.status, res.statusText, "application/json", res.body);
    }
}

/* JSON API response format for Boolean responses */
export class BooleanResponse extends APIResponse {
    constructor(res: HTTPSuccess) {
        super(res.status, res.statusText, "text/boolean", res.body);
    }
}

/* JSON API response format for Number responses */
export class NumberResponse extends APIResponse {
    constructor(res: HTTPSuccess) {
        super(res.status, res.statusText, "text/number", res.body);
    }
}

/* JSON API response format for String responses */
export class StringResponse extends APIResponse {
    constructor(res: HTTPSuccess) {
        super(res.status, res.statusText, "text/string", res.body);
    }
}

/* JSON API response format for List responses
   List of objects will have a mimetype of list/application/json
   List of numbers will have a mimetype of list/text/number
 */
export class ListResponse extends APIResponse {
    constructor(res: HTTPSuccess) {
        let mimetype = "list";
        if (res.body.length > 0) {
            const elemType = typeof res.body[0];
            if (elemType === "object") {
                mimetype += "/application/json";
            } else {
                mimetype += `/text/${elemType}`;
            }
        }
        super(res.status, res.statusText, mimetype, res.body);
    }
}