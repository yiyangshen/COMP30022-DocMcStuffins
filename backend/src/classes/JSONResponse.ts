import { StandardResponse } from "./StandardResponse";

/* JSON response typically on a successful GET request */
export class JSONResponse extends StandardResponse {
    constructor(data: object | string) {
        // Ensure that the data stored has the type of JSON string (not object)
        super("application/json", 200, "OK", typeof data === "object" ? JSON.stringify(data) : data);
    }
}