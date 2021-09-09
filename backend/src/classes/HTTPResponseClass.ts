/* General HTTP response format */
export class HTTPResponse {
    readonly status: number;
    readonly statusText: string;
    readonly body: string|null;

    constructor(status: number, statusText: string, body: object|string|null) {
        this.status = status;
        this.statusText = statusText;
        this.body = typeof body === "object" ? JSON.stringify(body) : body;
    }
}
