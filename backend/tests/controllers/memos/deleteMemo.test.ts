/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";

/* Import the required classes and models */
import {
    BadRequestError, ForbiddenError, UnauthorizedError, NotFoundError,
    OKSuccess
} from "../../../src/classes";
import { Memo, Name, User } from "../../../src/models";

/* Import the Express application */
import app from "../../../src/config/serverConfig";

/* Define test constants */
const BASE_URL = "/api";
const TEST_URLS = {
    deleteMemo: `${BASE_URL}/memos/delete`,
    login: `${BASE_URL}/user/login`,
    logout: `${BASE_URL}/user/logout`
};

const TEST_USER = {
    email: "futaba.rio@megane.jp",
    firstName: "Rio",
    lastName: "Futaba",
    password: "Megane Wa Kakkoi Desu!"
};

const TEST_USER_ALT = {
    email: "asada.shino@megane.jp",
    firstName: "Asada",
    lastName: "Shino",
    password: "Hecate Bow Marksman"
};

const TEST_MEMO = {
    title: "Adolesence Syndrome",
    notes: "Ano nise no Futaba"
};

describe("Integration test for memo deletion", () => {
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

    test("1. Delete memo without authentication", async () => {
        await unauthAgent
            .post(TEST_URLS.deleteMemo)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new UnauthorizedError("Unauthorized")).status);
            });
    });

    test("2. Delete existing memo", async () => {
        /* Create a new memo */
        const memo = new Memo({
            userId: testUser._id,
            title: TEST_MEMO.title,
            notes: TEST_MEMO.notes
        });
        await memo.save();

        /* Delete the new memo */
        await authAgent
            .post(TEST_URLS.deleteMemo)
            .send({ id: memo._id })
            .then((res: any) => {
                expect(res.body.status).toBe((new OKSuccess("OK")).status);
            });
    })

    test("3. Delete memo with no data", async () => {
        await authAgent
            .post(TEST_URLS.deleteMemo)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("4. Delete memo with invalid data", async () => {
        await authAgent
            .post(TEST_URLS.deleteMemo)
            .send({ id: "Invalid id" })
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("5. Delete non-existing memo", async () => {
        await authAgent
            .post(TEST_URLS.deleteMemo)
            .send({ id: testUser._id })
            .then((res: any) => {
                expect(res.body.status).toBe((new NotFoundError("not Found")).status);
            });
    });

    test("6. Delete memo belonging to another user", async () => {
        /* Create a new memo that belongs to another user */
        const memo = new Memo({
            userId: testUserAlt._id,
            title: TEST_MEMO.title,
            notes: TEST_MEMO.notes
        });
        await memo.save();

        /* Attempt to delete this memo */
        await authAgent
            .post(TEST_URLS.deleteMemo)
            .send({ id: memo._id })
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
});
