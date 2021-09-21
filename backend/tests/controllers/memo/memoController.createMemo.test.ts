/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";

/* Import the required classes and models */
import {
    BadRequestError, ForbiddenError,
    CreatedSuccess, OKSuccess, UnauthorizedError
} from "../../../src/classes";
import { Memo, Name, User } from "../../../src/models";

/* Import the Express application */
import app from "../../../src/config/serverConfig";

/* Define test constants */
const BASE_URL = "/api";
const TEST_URLS = {
    createMemo: `${BASE_URL}/memos/new`,
    login: `${BASE_URL}/user/login`,
    logout: `${BASE_URL}/user/logout`
}

/* Define test data */
const TEST_USER = {
    email: "futaba.rio@megane.jp",
    firstName: "Rio",
    lastName: "Futaba",
    password: "Megane Wa Kakkoi Desu!"
};

const VALID_TEST_MEMO_PARTIAL = {
    title: "Adolescence Syndrome",
};

const VALID_TEST_MEMO_FULL = {
    title: "Kunimi Yuuma <3",
    notes: "Kunimi is so cool aguagsjdvjis. The bread he gave me was so sweet of him ansvlknlsadkjf. He better like me someday cos I like him so much <3"
};

const INVALID_TEST_MEMO = {
    title: "Âdolescence Syndrome",
    notes: "What is the fake me doing in my home??? Now I'm forced to live with the rascal SÂkuta in his house. At least the breakfast with Kaede-chan was nice."
};

describe("Integration test for memo creation", () => {
    /* Create user agents */
    const unauthAgent = agent(app);
    const authAgent = agent(app);
    
    /* Create test user */
    const testUser = new User({
        email: TEST_USER.email,
        password: TEST_USER.password,
        name: new Name({
            first: TEST_USER.firstName,
            last: TEST_USER.lastName
        })
    });

    beforeAll(async () => {
        /* Save test user in database */
        await testUser.save();

        /* Authenticate user agent */
        await authAgent
            .patch(TEST_URLS.login)
            .send({
                email: TEST_USER.email,
                password: TEST_USER.password
            })
            .then((res: any) => {
                if (res.body.status === (new OKSuccess("OK")).status) {
                    console.log("Test user successfully authenticated!");
                }
            });
    });

    test("1. Create new memo without authentication", async () => {
        await unauthAgent
        .post(TEST_URLS.createMemo)
        .send(VALID_TEST_MEMO_PARTIAL)
        .then((res: any) => {
            expect(res.body.status).toBe((new UnauthorizedError("Unauthorized")).status);
        });
    });

    test("2. Create new memo with minimal valid data", async () => {
        await authAgent
        .post(TEST_URLS.createMemo)
        .send({
            title: VALID_TEST_MEMO_PARTIAL.title
        })
        .then((res: any) => {
            expect(res.body.status).toBe((new CreatedSuccess("Created")).status);
        });
    });

    test("3. Create new memo with full valid data", async () => {
        await authAgent
        .post(TEST_URLS.createMemo)
        .send(VALID_TEST_MEMO_FULL)
        .then(async (res: any) => {
            expect(res.body.status).toBe((new CreatedSuccess("Created")).status);
        });
    });

    test("4. Create new memo with no data", async () => {
        await authAgent
        .post(TEST_URLS.createMemo)
        .send({})
        .then((res: any) => {
            expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
        });
    });

    test("5. Create new memo with minimal invalid data", async () => {
        await authAgent
        .post(TEST_URLS.createMemo)
        .send({
            title: INVALID_TEST_MEMO.title
        })
        .then((res: any) => {
            expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
        });
    });
    
    test("6. Create new memo with full invalid data", async () => {
        await authAgent
        .post(TEST_URLS.createMemo)
        .send(INVALID_TEST_MEMO)
        .then((res: any) => {
            expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
        });
    });

    afterAll(async () => {
        /* Deauthenticate user agent */
        await authAgent.patch(TEST_URLS.logout);
        
        /* Delete test user */
        await User.deleteMany();
        
        /* Delete test groups */
        await Memo.deleteMany();
    });
});
