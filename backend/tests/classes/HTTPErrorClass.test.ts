/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";

/* Import the required classes and models */
import {
    BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError
} from "../../src/classes";

/* Define test constants */
const ERROR_STATUSES = {
    badRequest: 400,
    forbidden: 403,
    internalServer: 500,
    notFound: 404,
    unauthorized: 401
};

const ERROR_STATUS_TEXTS = {
    badRequest: "Bad Request",
    forbidden: "Forbidden",
    internalServer: "Internal Server Error",
    notFound: "Not Found",
    unauthorized: "Unauthorized"
};

const ERROR_MESSAGES = {
    badRequest: "This is a bad request error",
    forbidden: "This is a forbidden error",
    internalServer: "This is an internal server error",
    notFound: "This is a not found error",
    unauthorized: "This is an unauthorized error"
};

describe("Unit tests for HTTP Error classes' instantiations", () => {
    test("Create a Bad Request error with the specified message", () => {
        /* Instantiate the error */
        const error = new BadRequestError(ERROR_MESSAGES.badRequest);

        /* Verify the error's attributes */
        expect(error.status).toBe(ERROR_STATUSES.badRequest);
        expect(error.statusText).toBe(ERROR_STATUS_TEXTS.badRequest);
        expect(error.body).toBe(ERROR_MESSAGES.badRequest);
    });
    
    test("Create a Forbidden error with the specified message", () => {
        /* Instantiate the error */
        const error = new ForbiddenError(ERROR_MESSAGES.forbidden);

        /* Verify the error's attributes */
        expect(error.status).toBe(ERROR_STATUSES.forbidden);
        expect(error.statusText).toBe(ERROR_STATUS_TEXTS.forbidden);
        expect(error.body).toBe(ERROR_MESSAGES.forbidden);
    });
    
    test("Create an Internal Server Error with the specified message", () => {
        /* Instantiate the error */
        const error = new InternalServerError(ERROR_MESSAGES.internalServer);

        /* Verify the error's attributes */
        expect(error.status).toBe(ERROR_STATUSES.internalServer);
        expect(error.statusText).toBe(ERROR_STATUS_TEXTS.internalServer);
        expect(error.body).toBe(ERROR_MESSAGES.internalServer);
    });
    
    test("Create a Not Found error with the specified message", () => {
        /* Instantiate the error */
        const error = new NotFoundError(ERROR_MESSAGES.notFound);

        /* Verify the error's attributes */
        expect(error.status).toBe(ERROR_STATUSES.notFound);
        expect(error.statusText).toBe(ERROR_STATUS_TEXTS.notFound);
        expect(error.body).toBe(ERROR_MESSAGES.notFound);
    });
    
    test("Create an Unauthorized with the specified message", () => {
        /* Instantiate the error */
        const error = new UnauthorizedError(ERROR_MESSAGES.unauthorized);

        /* Verify the error's attributes */
        expect(error.status).toBe(ERROR_STATUSES.unauthorized);
        expect(error.statusText).toBe(ERROR_STATUS_TEXTS.unauthorized);
        expect(error.body).toBe(ERROR_MESSAGES.unauthorized);
    });
});
