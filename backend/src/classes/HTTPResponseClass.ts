/* General HTTP response format */
export class HTTPResponse {
    readonly status: number;
    readonly statusText: string;
    readonly body: string|null;

    constructor(status: number, statusText: string, body: string|null) {
        this.status = status;
        this.statusText = statusText;
        this.body = body;
    }
}
