/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { Types } from "mongoose";
import { agent } from "supertest";

/* Import the required classes and models */
import {
    BadRequestError, ForbiddenError,
    CreatedSuccess, OKSuccess, UnauthorizedError
} from "../../../src/classes";
import { Name, User, Memo } from "../../../src/models";

/* Import the Express application */
import app from "../../../src/config/serverConfig";

/* Define test constants */
const BASE_URL = "/api/memos/details";

/* Define test data */
const TEST_USER_1 = {
    email: "test.mctest@test.com",
    firstName: "Test",
    lastName: "McTest",
    password: "test password"
};

const TEST_USER_2 = {
    email: "oatmeal@test.com",
    firstName: "Thiccc",
    lastName: "Oatmeale",
    password: "test password"
};

const TEST_MEMO_1 = {
    title : "Secret Meeting"
}

const TEST_MEMO_2 = {
    title : "Lunch"
}

describe("getmemoDetails Tests", () => {
    /* Create user agents */
    const unauthAgent = agent(app);
    const authAgent = agent(app);
    
    /* Create test user */
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

    const testMemo1 = new Memo({
        title : TEST_MEMO_1.title,
        userId : testUser2._id
    });

    const testMemo2 = new Memo({
        title : TEST_MEMO_2.title,
        userId : testUser1._id
    });

    beforeAll(async () => {
        /* Save test user in database */
        await testUser1.save();
        await testUser2.save();

        //  save memos in database
        await testMemo1.save();
        await testMemo2.save();
        
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

    test("1. Get memo details without authentication", async () => {
        await unauthAgent
            .get(`${BASE_URL}/${testMemo1._id}`)
            .then((res: any) => {
                console.log(res.body.data);
                expect(res.body.status).toEqual(401);
        });
    });

    test("2. Get memo details with malformed parameter", async () => {
        await authAgent
            .get(`${BASE_URL}/something`)
            .then((res: any) => {
                console.log(res.body.data);
                expect(res.body.status).toEqual(400);
        });
    });

    test("3. Get memo details with user ID not belonging to the requester", async () => {
        await authAgent
            .get(`${BASE_URL}/${testMemo1._id}`)
            .then((res: any) => {
                console.log(res.body.data);
                expect(res.body.status).toEqual(403);
            });
    });

    test("4. Get memo details with memo ID that does not exist", async () => {
        const id = Types.ObjectId();
        await authAgent
            .get(`${BASE_URL}/${id}`)
            .then((res: any) => {
                console.log(res.body.data);
                expect(res.body.status).toEqual(404);
            });
    });

    test("5. Get memo details successfully", async () => {
        await authAgent
            .get(`${BASE_URL}/${testMemo2._id}`)
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

        /* Delete test memos */
        await Memo.deleteMany();
    });
});