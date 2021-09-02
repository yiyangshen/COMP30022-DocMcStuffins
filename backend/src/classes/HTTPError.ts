/* Encapsulates details of an HTTP error */
export class HTTPError {
    readonly status: number;
    readonly statusText: string;
    readonly message: string;

    constructor(status: number, statusText: string, message: string) {
        this.status = status;
        this.statusText = statusText;
        this.message = message;
    }
}
