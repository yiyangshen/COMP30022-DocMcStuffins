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
const BASE_URL = "/api/groups/details";

/* Define test data */
const TEST_USER_1 = {
    email: "test.mctest@test.com",
    firstName: "Test",
    lastName: "McTest",
    password: "test password"
};

const TEST_USER_2 = {
    email: "lasagne@pizza.com",
    firstName: "Test",
    lastName: "McTest",
    password: "test password"
};

const TEST_GROUP_1 = {
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
    
    /* Create test users */
    const testUser1 = new User({
        email: TEST_USER_1.email,
        password: TEST_USER_1.password,
        name: new Name({
            first: TEST_USER_1.firstName,
            last: TEST_USER_1.lastName
        })
    });
    const testUser2 = new User({
        email: TEST_USER_2.email,
        password: TEST_USER_2.password,
        name: new Name({
            first: TEST_USER_2.firstName,
            last: TEST_USER_2.lastName
        })
    });

    //  Create test contacts
    const testContact1 = new Contact({
        userId : testUser1._id,
        name: {
            first: TEST_CONTACT_1.firstName,
            last: TEST_CONTACT_1.lastName
        },
        gender: TEST_CONTACT_1.gender,
        email: TEST_CONTACT_1.email,
        relationship: TEST_CONTACT_1.relationship,
    })

    const testContact2 = new Contact({
        userId : testUser1._id,
        name: {
            first: TEST_CONTACT_2.firstName,
            last: TEST_CONTACT_2.lastName
        },
        gender: TEST_CONTACT_2.gender,
        email: TEST_CONTACT_2.email,
        relationship: TEST_CONTACT_2.relationship,
    })

    // Create test groups
    const testGroup1 = new Group({
        name : TEST_GROUP_1.name,
        userId : testUser2._id,
        members: [],
    });
    const testGroup2 = new Group({
        name : TEST_GROUP_2.name,
        userId : testUser1._id,
        members: [testContact1, testContact2],
    });

    beforeAll(async () => {
        /* Save test user in database */
        await testUser1.save();
        await testUser2.save();

        //  Save testContacts
        await testContact1.save();
        await testContact2.save();

        // save test groups
        await testGroup1.save();
        await testGroup2.save();

        /* Authenticate user agent */
        await authAgent
            .patch(`/api/user/login`)
            .send({
                email: TEST_USER_1.email,
                password: TEST_USER_1.password
            })
            .then((res: any) => {
                if (res.body.status === (new OKSuccess("OK")).status) {
                    console.log("Test user successfully authenticated!");
                }
            });
    });

    test("1. Get group details without authentication", async () => {
        await unauthAgent
            .get(`${BASE_URL}/${testGroup1._id}`)
            .then((res: any) => {
                console.log(res.body.data);
                expect(res.body.status).toEqual(401);
        });
    });

    test("2. Get group details with malformed parameter", async () => {
        await authAgent
            .get(`${BASE_URL}/something`)
            .then((res: any) => {
                console.log(res.body.data);
                expect(res.body.status).toEqual(400);
        });
    });

    test("3. Get group details with group ID not belonging to the requester", async () => {
        await authAgent
            .get(`${BASE_URL}/${testGroup1._id}`)
            .then((res: any) => {
                console.log(res.body.data);
                expect(res.body.status).toEqual(403);
            });
    });

    test("4. Get group details with group ID that does not exist", async () => {
        const id = Types.ObjectId();
        await authAgent
            .get(`${BASE_URL}/${id}`)
            .then((res: any) => {
                console.log(res.body.data);
                expect(res.body.status).toEqual(404);
            });
    });

    test("5. Get group details successfully", async () => {
        await authAgent
            .get(`${BASE_URL}/${testGroup2._id}`)
            .then((res: any) => {
                console.log(res.body.data);
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

        
        /* Delete test groups */
        await Group.deleteMany();
    });
});