/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";

/* Import the required classes and models */
import {
    BadRequestError, ForbiddenError,
    CreatedSuccess, OKSuccess
} from "../../../src/classes";
import { Contact, Gender, Group, Name, User } from "../../../src/models";

/* Import the Express application */
import app from "../../../src/config/serverConfig";

/* Define test constants */
const BASE_URL = "/api";
const TEST_URLS = {
    createGroup: `${BASE_URL}/groups/new`,
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

const VALID_TEST_GROUP = {
    name: "Megane",
    members: []
};

const INVALID_TEST_GROUP = {
    name: "ŴÂŜÂẞÎ",
    members: ["Watashi wa ObjectId ja nai"]
}

const TEST_CONTACT_1 = {
    firstName: "Shino",
    middleName: "Sinon",
    lastName: "Asada",
    gender: Gender.Female,
    email: "sinon@megane.jp",
    relationship: "Tomodachi",
};

const TEST_CONTACT_2 = {
    firstName: "Reisi",
    lastName: "Munakata",
    gender: Gender.Male,
    email: "munakatareisi@megane.jp",
    relationship: "Suko no hito"
};

describe("Integration test for group creation", () => {
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
    
    /* Create test contacts */
    const testContact1 = new Contact({
        userId: testUser._id,
        name: new Name({
            first: TEST_CONTACT_1.firstName,
            middle: TEST_CONTACT_1.middleName,
            last: TEST_CONTACT_1.lastName
        }),
        gender: TEST_CONTACT_1.gender,
        email: TEST_CONTACT_1.email,
        relationship: TEST_CONTACT_1.relationship
    });
    const testContact2 = new Contact({
        userId: testUser._id,
        name: new Name({
            first: TEST_CONTACT_2.firstName,
            last: TEST_CONTACT_2.lastName
        }),
        gender: TEST_CONTACT_2.gender,
        email: TEST_CONTACT_2.email,
        relationship: TEST_CONTACT_2.relationship
    });


    beforeAll(async () => {
        /* Save test user and group in database */
        await testUser.save();
        await testContact1.save();
        await testContact2.save();

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

    test("1. Create new group without authentication", async () => {
        await unauthAgent
        .post(TEST_URLS.createGroup)
        .send(VALID_TEST_GROUP)
        .then((res: any) => {
            expect(res.body.status).toBe((new ForbiddenError("Forbidden")).status);
        });
    });

    test("2. Create new group with minimal valid data", async () => {
        await authAgent
        .post(TEST_URLS.createGroup)
        .send({
            name: VALID_TEST_GROUP.name
        })
        .then((res: any) => {
            expect(res.body.status).toBe((new CreatedSuccess("Created")).status);
        });
    });

    test("3. Create new group with full valid data", async () => {
        const groupName = `${VALID_TEST_GROUP.name}s`
        await authAgent
        .post(TEST_URLS.createGroup)
        .send({
            name: groupName,
            members: [testContact1._id, testContact2._id]
        })
        .then(async (res: any) => {
            /* Reacquire the test group and contacts */
            const testGroup = await Group.findOne({ userId: testUser._id, name: groupName });
            const reloadedTestContact1 = await Contact.findById(testContact1._id);
            const reloadedTestContact2 = await Contact.findById(testContact2._id);

            expect(res.body.status).toBe((new CreatedSuccess("Created")).status);
            expect(reloadedTestContact1!.groupId).toStrictEqual(testGroup!._id);
            expect(reloadedTestContact2!.groupId).toStrictEqual(testGroup!._id);
        });
    });

    test("4. Create new group with no data", async () => {
        await authAgent
        .post(TEST_URLS.createGroup)
        .send({})
        .then((res: any) => {
            expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
        });
    });

    test("5. Create new group with minimal invalid data", async () => {
        await authAgent
        .post(TEST_URLS.createGroup)
        .send({
            name: INVALID_TEST_GROUP.name
        })
        .then((res: any) => {
            expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
        });
    });
    
    test("6. Create new group with full invalid data", async () => {
        await authAgent
        .post(TEST_URLS.createGroup)
        .send(INVALID_TEST_GROUP)
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
        await Group.deleteMany();

        /* Delete test contacts */
        await Contact.deleteMany();
    });
});
