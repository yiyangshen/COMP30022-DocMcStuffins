/* Import the required types and libraries */
import { describe, test, expect, afterAll } from "@jest/globals";
import { agent } from "supertest";
import app from "../src/config/serverConfig";

import { User } from "../src/models/index";

const TEST_USER_EMAIL = "futabario@megane.jp";
const TEST_USER_FIRST_NAME = "Futaba";
const TEST_USER_LAST_NAME = "Rio";
const TEST_USER_PASSWORD = "MeganeWaKakkoiDesu!";

const TEST_USER_EMAIL_1 = `${TEST_USER_EMAIL}1`;
const TEST_USER_EMAIL_2 = `${TEST_USER_EMAIL}2`;
const TEST_USER_EMAIL_3 = `${TEST_USER_EMAIL}3`;
const TEST_USER_EMAIL_4 = `${TEST_USER_EMAIL}4`;
const TEST_USER_EMAIL_5 = `${TEST_USER_EMAIL}5`;

const TEST_USER_PASSWORD_SHORT = "<3";

const BASE_URL = "/api/user";

describe("Registration Tests", () => {
    const userAgent = agent(app);
    
    test("1. Register succesfully", async () => {
        const req = {
            email: TEST_USER_EMAIL,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD
        };
        await userAgent
            .post(`${BASE_URL}/register`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toBe(201);
            });
        await userAgent
            .patch(`${BASE_URL}/logout`)
            .then((res: any) => {
                expect(res.body.status).toBe(200);
            });
    });

    test("2. Missing a required field ", async () => {
        const req = {
            email: TEST_USER_EMAIL_1,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD
        };
        await userAgent
            .post(`${BASE_URL}/register`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toBe(400);
            });
    });

    test("3. Password length < 6", async () => {
        const req = {
            email: TEST_USER_EMAIL_2,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD_SHORT
        };
        await userAgent
            .post(`${BASE_URL}/register`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toBe(403);
            });
    });

    test("4. User is already authenticated", async () => {
        // Register a user (subsequently logging them in)
        const req1 = {
            email: TEST_USER_EMAIL_3,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD
        };
        await userAgent
            .post(`${BASE_URL}/register`)
            .send(req1)
            .then((res: any) => {
                expect(res.body.status).toBe(201);
            });

        // Attempt to register another user while still being authenticated
        const req2 = {
            email: TEST_USER_EMAIL_4,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD
        };
        await userAgent
            .post(`${BASE_URL}/register`)
            .send(req2)
            .then((res: any) => {
                expect(res.body.status).toBe(403);
            });
        
        await userAgent
            .patch(`${BASE_URL}/logout`)
            .then((res: any) => {
                expect(res.body.status).toBe(200);
            });
    });

    test("5. Email address has already existed", async () => {
        // Register a user (subsequently logging them in)
        const req1 = {
            email: TEST_USER_EMAIL_5,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD
        };
        await userAgent
            .post(`${BASE_URL}/register`)
            .send(req1)
            .then((res: any) => {
                expect(res.body.status).toBe(201);
            });

        // Logout the user
        await userAgent
            .patch(`${BASE_URL}/logout`)
            .then((res: any) => {
                expect(res.body.status).toBe(200);
            });

        // Attempt to register another user with the same email
        const req2 = {
            email: TEST_USER_EMAIL_5,
            firstName: `${TEST_USER_FIRST_NAME}Clone`,
            lastName: `${TEST_USER_LAST_NAME}Clone`,
            password: `${TEST_USER_PASSWORD}!`
        };
        await userAgent
            .post(`${BASE_URL}/register`)
            .send(req2)
            .then((res: any) => {
                expect(res.body.status).toBe(403);
            });
    });

    afterAll(async () => {
        await User.deleteOne( { email: TEST_USER_EMAIL });
        await User.deleteOne( { email: TEST_USER_EMAIL_1 });
        await User.deleteOne( { email: TEST_USER_EMAIL_2 });
        await User.deleteOne( { email: TEST_USER_EMAIL_3 });
        await User.deleteOne( { email: TEST_USER_EMAIL_4 });
        await User.deleteOne( { email: TEST_USER_EMAIL_5 });
    });
})