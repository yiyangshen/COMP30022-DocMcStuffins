/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";
import app from "../src/config/serverConfig";

/* Import models */
import { User, Contact } from "../src/models/index";

const TEST_USER_EMAIL = "phil@gaming.com";
const TEST_USER_FIRST_NAME = "Philip";
const TEST_USER_LAST_NAME = "Holes";
const TEST_USER_PASSWORD = "phillycheese";

const BASE_URL = "/api/contacts";

describe('Contact count', () => {
    const userAgent = agent(app);
    const contactAgent = agent(app);

    test('1. Get a contact count without being authorised', async () => {
        await contactAgent
            .get(`${BASE_URL}/count`)
            .then((res: any) => {
                expect(res.body.status).toEqual(403);
            })
    });

    test('2. Get contact count of an authenticated user', async () => {
        // register the account first
        const req: any = {
            email: TEST_USER_EMAIL,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD
        };
        await userAgent
            .post(`/api/user/register`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(201);
            })

        await contactAgent
            .get(`${BASE_URL}/count`)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
                expect(res.body.data).toEqual(0);
            })
        await User.deleteOne({ email: TEST_USER_EMAIL });
    });
});