/* Parent class of all kinds of responses to standardise the input to res.json() */
export class StandardResponse {
    readonly mimetype: string;
    readonly status: number;
    readonly statusText: string;
    readonly data: string;

    constructor(mimetype: string, status: number, statusText: string, data: string) {
        this.mimetype = mimetype;
        this.status = status;
        this.statusText = statusText;
        this.data = data;
    }

}
