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
const BASE_URL = "/api/groups";

/* Define test data */
const TEST_USER = {
    email: "test.mctest@test.com",
    firstName: "Test",
    lastName: "McTest",
    password: "test password"
};

const TEST_GROUP_1 = {
    userId: "tottallywrong",
    name: "DocMcStuffins",
    members: []
};

const TEST_GROUP_2 = {
    name: "PorkBelly",
    members: []
};



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

describe("getGroupDetails Tests", () => {
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

    //  Create test contacts
    const testContact1 = new Contact({
        userId : testUser._id,
        firstName: TEST_CONTACT_1.firstName,
        middleName: TEST_CONTACT_1.middleName,
        lastName: TEST_CONTACT_1.lastName,
        gender: TEST_CONTACT_1.gender,
        email: TEST_CONTACT_1.email,
        relationship: TEST_CONTACT_1.relationship,
    })

    const testContact2 = new Contact({
        userId : testUser._id,
        firstName: TEST_CONTACT_2.firstName,
        lastName: TEST_CONTACT_2.lastName,
        gender: TEST_CONTACT_2.gender,
        email: TEST_CONTACT_2.email,
        relationship: TEST_CONTACT_2.relationship,
    })

    beforeAll(async () => {
        /* Save test user in database */
        await testUser.save();

        //  Save testContacts
        await testContact1.save();
        await testContact2.save();

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

    test("1. Get group details without authentication", async () => {
        await unauthAgent
            .get(`${BASE_URL}/1`)
            .then((res: any) => {
                expect(res.body.status).toEqual(401);
        });
    });

    test("2. Get group details with malformed parameter", async () => {
        await authAgent
            .get(`${BASE_URL}`)
            .then((res: any) => {
                expect(res.body.status).toEqual(400);
        });
    });

    test("3. Get group details with group ID not belonging to the requester", async () => {
        const testGroup = new Group(TEST_GROUP_1);
        await testGroup.save();
        await authAgent
            .get(`${BASE_URL}/${testGroup._id}`)
            .then((res: any) => {
                expect(res.body.status).toEqual(403);
            });
    });

    test("4. Get group details with group ID that does not exist", async () => {
        await authAgent
            .get(`${BASE_URL}/0`)
            .then((res: any) => {
                expect(res.body.status).toEqual(404);
            });
    });

    test("5. Get group details successfully", async () => {
        const testGroup = new Group({
            name : TEST_GROUP_2.name,
            userId : testUser._id,
            members: [testContact1, testContact2],
        });
        await testGroup.save();
        await authAgent
            .get(`${BASE_URL}/${testGroup._id}`)
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

        
        /* Delete test contacts */
        await Group.deleteMany();
    });
});