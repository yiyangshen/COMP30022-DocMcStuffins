/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { Types } from "mongoose";
import { agent } from "supertest";

/* Import the required classes and models */
import {
    BadRequestError, ForbiddenError,
    CreatedSuccess, OKSuccess, UnauthorizedError
} from "../../../src/classes";
import { Contact, Gender, Group, Name, User } from "../../../src/models";

/* Import the Express application */
import app from "../../../src/config/serverConfig";

/* Define test constants */
const BASE_URL = "/api";
const TEST_URLS = {
    createContact: `${BASE_URL}/contacts/new`,
    login: `${BASE_URL}/user/login`,
    logout: `${BASE_URL}/user/logout`
}

/* Define test data */
const TEST_USER = {
    email: "test.mctest@test.com",
    firstName: "Test",
    lastName: "McTest",
    password: "test password"
};

const TEST_GROUP = {
    name: "Test Subjects",
    members: []
};

const VALID_TEST_CONTACT = {
    firstName: "Phake",
    middleName: "Pherson",
    lastName: "McTest",
    groupId: Types.ObjectId(),
    gender: Gender.Other,
    dateOfBirth: new Date(),
    lastMet: new Date(),
    phoneNumber: "0123456789",
    email: "phake.mctest@test.com",
    photo: "VGhpcyBpcyBzdXBwb3NlZCB0byBiZSBhIEJhc2U2NC1lbmNvZGVkIHBpY3R1cmUsIGJ1dCBhbGFzIGl0J3MganVzdCBCYXNlNjQtZW5jb2RlZCBwbGFpbnRleHQu",
    relationship: "Imaginary friend",
    additionalNotes: "The friend is indeed, a lie"
};

const INVALID_TEST_CONTACT = {
    firstName: "Χ",
    middleName: "Æ",
    lastName: "A-12",
    groupId: "Definitely not a valid ObjectId",
    gender: "Apache attack helicopter",
    dateOfBirth: "30 Feb 1969",
    lastMet: "30 Feb 1969 23:59:59",
    phoneNumber: "+61 123 456 789",
    email: "X.A-12@tesla",
    photo: "Definitely not a Base64 encoded string",
    relationship: "Vehicle",
    additionalNotes: "Just... why?"
};

describe("Integration test for contact creation", () => {
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
    
    /* Create test group */
    const testGroup = new Group({
        userId: testUser._id,
        name: TEST_GROUP.name,
        members: TEST_GROUP.members
    });

    beforeAll(async () => {
        /* Save test user and group in database */
        await testUser.save();
        await testGroup.save();

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

    test("1. Create new contact without authentication", async () => {
        await unauthAgent
        .post(TEST_URLS.createContact)
        .send({
            firstName: VALID_TEST_CONTACT.firstName,
            lastName: VALID_TEST_CONTACT.lastName
        })
        .then((res: any) => {
            expect(res.body.status).toBe((new UnauthorizedError("Unauthorized")).status);
        });
    });

    test("2. Create new contact with minimal valid data", async () => {
        await authAgent
        .post(TEST_URLS.createContact)
        .send({
            firstName: VALID_TEST_CONTACT.firstName,
            lastName: VALID_TEST_CONTACT.lastName
        })
        .then((res: any) => {
            expect(res.body.status).toBe((new CreatedSuccess("Created")).status);
        });
    });

    test("3. Create new contact with full valid data", async () => {
        await authAgent
        .post(TEST_URLS.createContact)
        .send(VALID_TEST_CONTACT)
        .then((res: any) => {
            expect(res.body.status).toBe((new CreatedSuccess("Created")).status);
        });
    });

    test("4. Create new contact with no data", async () => {
        await authAgent
        .post(TEST_URLS.createContact)
        .send({})
        .then((res: any) => {
            expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
        });
    });

    test("5. Create new contact with minimal invalid data", async () => {
        await authAgent
        .post(TEST_URLS.createContact)
        .send({
            firstName: INVALID_TEST_CONTACT.firstName,
            lastName: INVALID_TEST_CONTACT.lastName
        })
        .then((res: any) => {
            expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
        });
    });
    
    test("6. Create new contact with full invalid data", async () => {
        await authAgent
        .post(TEST_URLS.createContact)
        .send(INVALID_TEST_CONTACT)
        .then((res: any) => {
            expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
        });
    });

    test("7. Create new contact with minimal valid data and assign it to an existing group", async () => {
        await authAgent
        .post(TEST_URLS.createContact)
        .send({
            firstName: VALID_TEST_CONTACT.firstName,
            lastName: VALID_TEST_CONTACT.lastName,
            groupId: testGroup._id
        })
        .then(async (res: any) => {
            /* Reacquire the test group */
            const reloadedTestGroup = await Group.findById(testGroup!._id);

            expect(res.body.status).toBe((new CreatedSuccess("Created")).status);
            expect(reloadedTestGroup!.members.length).toBeGreaterThan(0);
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
