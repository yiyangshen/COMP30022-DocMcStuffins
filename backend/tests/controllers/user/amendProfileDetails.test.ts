/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";
import { compareSync } from "bcrypt";

/* Import the required classes and models */
import {
    BadRequestError,
    OKSuccess, UnauthorizedError
} from "../../../src/classes";
import { Name, User } from "../../../src/models";

/* Import the Express application */
import app from "../../../src/config/serverConfig";

/* Define test constants */
const BASE_URL = "/api";
const TEST_URLS = {
    amendProfile: `${BASE_URL}/user/profile/amend`,
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

const TEST_USER_FULL = {
    email: "futabakagakushario@megane.jp",
    firstName: "Rio",
    middleName: "Kagakusha",
    lastName: "Futaba",
    password: "Megane wa kakkoi desu!"
}

const TEST_USER_AMENDED_INCOMPLETE = {
    email: "futabario@megane.jp",
    lastName: "Futaba",
    password: "Megane wa kakkoi desu!"
};

const TEST_USER_AMENDED_INVALID_EMAIL = {
    email: "futabario(at)megane(dot)jp",
    firstName: "Rio",
    lastName: "Futaba",
    password: "Megane wa kakkoi desu!"
};

const TEST_USER_AMENDED_INVALID_PASSWORD = {
    email: "futabario(at)megane(dot)jp",
    firstName: "Rio",
    lastName: "Futaba",
    password: "Shōto"
};

const TEST_USER_AMENDED_MINIMAL = {
    email: "futabaarioo@megane.jp",
    firstName: "Rioo",
    lastName: "Futabaa",
    password: "Megane wa dai kakkoi desu!"
};

const TEST_USER_AMENDED_FULL = {
    email: "futabaakagakushaarioo@megane.jp",
    firstName: "Rioo",
    middleName: "Kagakushaa",
    lastName: "Futabaa",
    password: "Megane wa dai kakkoi desu!"
}

describe("Integration test for profile amendment", () => {
    /* Create user agents */
    const unauthAgent = agent(app);
    const authAgent = agent(app);
    const authAgentFull = agent(app);

    /* Create test users */
    const testUser = new User({
        email: TEST_USER.email,
        password: TEST_USER.password,
        name: new Name({
            first: TEST_USER.firstName,
            last: TEST_USER.lastName
        })
    });
    const testUserFull = new User({
        email: TEST_USER_FULL.email,
        password: TEST_USER_FULL.password,
        name: new Name({
            first: TEST_USER_FULL.firstName,
            middle: TEST_USER_FULL.middleName,
            last: TEST_USER_FULL.lastName
        })
    });

    beforeAll(async () => {
        /* Save test user in database */
        await testUser.save();
        await testUserFull.save();

        /* Authenticate user agent */
        await authAgent
            .patch(TEST_URLS.login)
            .send({
                email: TEST_USER.email,
                password: TEST_USER.password
            })
            .then((res: any) => {
                if (res.body.status === (new OKSuccess("OK")).status) {
                    console.log("Test user 1 successfully authenticated!");
                }
            });
        
        /* Authenticate user agent */
        await authAgentFull
            .patch(TEST_URLS.login)
            .send({
                email: TEST_USER_FULL.email,
                password: TEST_USER_FULL.password
            })
            .then((res: any) => {
                if (res.body.status === (new OKSuccess("OK")).status) {
                    console.log("Test user 2 successfully authenticated!");
                }
            });
    });

    test("1. Amend profile without authentication", async () => {
        await unauthAgent
            .patch(TEST_URLS.amendProfile)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new UnauthorizedError("Unauthorized")).status);
            });
    });

    test("2. Amend profile with no data", async () => {
        await authAgent
            .patch(TEST_URLS.amendProfile)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("3. Amend profile with incomplete data", async () => {
        await authAgent
            .patch(TEST_URLS.amendProfile)
            .send(TEST_USER_AMENDED_INCOMPLETE)
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("4. Amend profile with invalid email", async () => {
        await authAgent
            .patch(TEST_URLS.amendProfile)
            .send(TEST_USER_AMENDED_INVALID_EMAIL)
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("5. Amend profile with invalid password", async () => {
        await authAgent
            .patch(TEST_URLS.amendProfile)
            .send(TEST_USER_AMENDED_INVALID_PASSWORD)
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("6. Amend profile with minimal data", async () => {
        await authAgent
            .patch(TEST_URLS.amendProfile)
            .send(TEST_USER_AMENDED_MINIMAL)
            .then((res: any) => {
                expect(res.body.status).toBe((new OKSuccess("Bad Request")).status);
            });

        /* Check that the user's details have been updated correctly */
        const user = await User.findById(testUser._id);
        expect(user).toBeTruthy();
        expect(user!.email).toBe(TEST_USER_AMENDED_MINIMAL.email);
        expect(user!.name.first).toBe(TEST_USER_AMENDED_MINIMAL.firstName);
        expect(user!.name.middle).toBeUndefined();
        expect(user!.name.last).toBe(TEST_USER_AMENDED_MINIMAL.lastName);
        expect(compareSync(TEST_USER_AMENDED_MINIMAL.password, user!.password)).toBe(true);
    });

    test("7. Amend profile with full data", async () => {
        await authAgentFull
            .patch(TEST_URLS.amendProfile)
            .send(TEST_USER_AMENDED_FULL)
            .then((res: any) => {
                expect(res.body.status).toBe((new OKSuccess("Bad Request")).status);
            });

        /* Check that the user's details have been updated correctly */
        const user = await User.findById(testUserFull._id);
        expect(user).toBeTruthy();
        expect(user!.email).toBe(TEST_USER_AMENDED_FULL.email);
        expect(user!.name.first).toBe(TEST_USER_AMENDED_FULL.firstName);
        expect(user!.name.middle).toBe(TEST_USER_AMENDED_FULL.middleName);
        expect(user!.name.last).toBe(TEST_USER_AMENDED_FULL.lastName);
        expect(compareSync(TEST_USER_AMENDED_FULL.password, user!.password)).toBe(true);
    });

    afterAll(async () => {
        /* Deauthenticate user agent */
        await authAgent.patch(TEST_URLS.logout);
        await authAgentFull.patch(TEST_URLS.logout);
        
        /* Delete test user */
        await User.deleteMany();
    });
});