/* Import required classes */
import { HTTPResponse } from "./index";

/* HTTP Success response format for returning data */
export class HTTPSuccess extends HTTPResponse {
    constructor(status: number, statusText: string, body: any) {
        super(status, statusText, body);
    }
}

/* HTTP Success response format for 200 OK responses */
export class OKSuccess extends HTTPSuccess {
    constructor(body: any) {
        super(200, "OK", body);
    }
}

/* HTTP Success response format for 201 Created responses */
export class CreatedSuccess extends HTTPSuccess {
    constructor(body: any) {
        super(201, "Created", body);
    }
}

/* HTTP Success response format for 204 No Content responses */
export class NoContentSuccess extends HTTPSuccess {
    constructor() {
        super(204, "No Content", null);
    }
}
