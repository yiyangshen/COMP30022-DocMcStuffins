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
const BASE_URL = "/api/contacts";

/* Define test data */
const TEST_USER = {
    email: "test.mctest@test.com",
    firstName: "Test",
    lastName: "McTest",
    password: "test password"
};

const TEST_CONTACT_1 = {
    userId: "tottallywrong",
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

const TEST_CONTACT_2 = {
    firstName: "Quarter",
    lastName: "Pounder",
    groupId: Types.ObjectId(),
    gender: Gender.Other,
    dateOfBirth: new Date(),
    lastMet: new Date(),
    phoneNumber: "0123456789",
    email: "big_mcmuffin@test.com",
    photo: "VGhpcyBpcyBzdXBwb3NlZCB0byBiZSBhIEJhc2U2NC1lbmNvZGVkIHBpY3R1cmUsIGJ1dCBhbGFzIGl0J3MganVzdCBCYXNlNjQtZW5jb2RlZCBwbGFpbnRleHQu",
    relationship: "Food",
    additionalNotes: "The friend is indeed, a lie"
};

describe("getContactDetails Tests", () => {
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
            .patch(`/api/user/login`)
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

    test("1. Get contact details without authentication", async () => {
        await unauthAgent
            .get(`${BASE_URL}/1`)
            .then((res: any) => {
                expect(res.body.status).toEqual(401);
        });
    });

    test("2. Get contact details with malformed parameter", async () => {
        await authAgent
            .get(`${BASE_URL}`)
            .then((res: any) => {
                expect(res.body.status).toEqual(400);
        });
    });

    test("3. Get contact details with contact ID not belonging to the requester", async () => {
        const testContact = new Contact(TEST_CONTACT_1);
        await testContact.save();
        await authAgent
            .get(`${BASE_URL}/${testContact._id}`)
            .then((res: any) => {
                expect(res.body.status).toEqual(403);
            });
    });

    test("4. Get contact details with contact ID that does not exist", async () => {
        await authAgent
            .get(`${BASE_URL}/0`)
            .then((res: any) => {
                expect(res.body.status).toEqual(404);
            });
    });

    test("5. Get contact details successfully", async () => {
        const testContact = new Contact(TEST_CONTACT_2);
        await testContact.save();
        await authAgent
            .get(`${BASE_URL}/${testContact._id}`)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            });
    });
    

    afterAll(async () => {
        /* Deauthenticate user agent */
        await authAgent.patch(`/api/user/logout`);
        
        /* Delete test user */
        await User.deleteMany();

        /* Delete test contacts */
        await Contact.deleteMany();
    });
});
