/* General HTTP response format */
export class HTTPResponse {
    readonly status: number;
    readonly statusText: string;
    readonly body: any;

    constructor(status: number, statusText: string, body: any) {
        this.status = status;
        this.statusText = statusText;
        this.body = body;
    }
}
