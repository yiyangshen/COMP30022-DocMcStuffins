/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";

/* Import the required classes and models */
import {
    BadRequestError, ForbiddenError,
    OKSuccess, UnauthorizedError, NotFoundError
} from "../../../src/classes";
import { Memo, Name, User } from "../../../src/models";

/* Import the Express application */
import app from "../../../src/config/serverConfig";

/* Define test constants */
const BASE_URL = "/api";
const TEST_URLS = {
    amendMemo: `${BASE_URL}/memos/details/amend`,
    login: `${BASE_URL}/user/login`,
    logout: `${BASE_URL}/user/logout`
};

/* Define test data */
const TEST_USER = {
    email: "futabario@megane.jp",
    firstName: "Rio",
    lastName: "Futaba",
    password: "Megane wa kakkoi desu!"
};

const TEST_USER_ALT = {
    email: "asadashino@megane.jp",
    firstName: "Asada",
    lastName: "Shino",
    password: "Kirito-kun"
};

const TEST_MEMO = {
    title: "Adolesence Syndrome",
    notes: "Ano nise no Futaba"
};

const TEST_MEMO_AMENDED = {
    title: "Adolesence Syndrome #2",
    notes: "Kimi to hanabi o mitai"
};

describe("Integration test for memo amendment", () => {
    /* Create user agents */
    const unauthAgent = agent(app);
    const authAgent = agent(app);

    /* Create test users */
    const testUser = new User({
        email: TEST_USER.email,
        password: TEST_USER.password,
        name: new Name({
            first: TEST_USER.firstName,
            last: TEST_USER.lastName
        })
    });
    const testUserAlt = new User({
        email: TEST_USER_ALT.email,
        password: TEST_USER_ALT.password,
        name: new Name({
            first: TEST_USER_ALT.firstName,
            last: TEST_USER_ALT.lastName
        })
    });

    beforeAll(async () => {
        /* Save test users in database */
        await testUser.save();
        await testUserAlt.save();

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

    test("1. Amend memo without authentication", async () => {
        await unauthAgent
            .patch(TEST_URLS.amendMemo)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new UnauthorizedError("Unauthorized")).status);
            });
    });

    test("2. Amend existing memo", async () => {
        /* Create a new memo */
        const memo = new Memo({
            userId: testUser._id,
            title: TEST_MEMO.title,
            notes: TEST_MEMO.notes
        });
        await memo.save();

        /* Amend the new memo */
        await authAgent
            .patch(TEST_URLS.amendMemo)
            .send({
                id: memo._id,
                title: TEST_MEMO_AMENDED.title,
                notes: TEST_MEMO_AMENDED.notes
            })
            .then((res: any) => {
                expect(res.body.status).toBe((new OKSuccess("OK")).status);
            });

        /* CHeck that the memo's title and notes have been changed */
        const amendedMemo = await Memo.findById(memo._id);
        expect(amendedMemo).toBeTruthy();
        expect(amendedMemo!.title).toBe(TEST_MEMO_AMENDED.title);
        expect(amendedMemo!.notes).toBe(TEST_MEMO_AMENDED.notes);
    });

    test("3. Amend memo with no data", async () => {
        await authAgent
            .patch(TEST_URLS.amendMemo)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("4. Amend memo with invalid data", async () => {
        await authAgent
            .patch(TEST_URLS.amendMemo)
            .send({ id: "Invalid id" })
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("5. Amend non-existing memo", async () => {
        await authAgent
            .patch(TEST_URLS.amendMemo)
            .send({
                id: testUser._id,
                title: "Kunimi <3",
                notes: "Kunimi wa kakkoi desu!!! <3"
            })
            .then((res: any) => {
                expect(res.body.status).toBe((new NotFoundError("not Found")).status);
            });
    });

    test("6. Amend memo belonging to another user", async () => {
        /* Create a new memo that belongs to another user */
        const memo = new Memo({
            userId: testUserAlt._id,
            title: TEST_MEMO.title,
            notes: TEST_MEMO.notes
        });
        await memo.save();

        /* Attempt to amend this memo */
        await authAgent
            .patch(TEST_URLS.amendMemo)
            .send({
                id: memo._id,
                title: "Coffee",
                notes: "I have to buy more beakers"
            })
            .then((res: any) => {
                expect(res.body.status).toBe((new ForbiddenError("Forbidden")).status);
            });
    });

    afterAll(async () => {
        /* Deauthenticate user agent */
        await authAgent.patch(TEST_URLS.logout);
        
        /* Delete test user */
        await User.deleteMany();
        
        /* Delete test memo */
        await Memo.deleteMany();
    });
})