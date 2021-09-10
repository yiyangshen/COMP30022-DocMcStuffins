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

const BASE_URL = "/api/groups";

describe('Group count', () => {
    const userAgent = agent(app);
    const groupAgent = agent(app);

    test('1. Get a group count without being authorised', async () => {
        await groupAgent
            .get(`${BASE_URL}/count`)
            .then((res: any) => {
                expect(res.body.status).toEqual(403);
            })
    });

    test('2. Get group count of an authenticated user', async () => {
        // register the account first
        const req: any = {
            email: TEST_USER_EMAIL,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD
        };
        await userAgent
            .post(`/api/passport/register`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })

        await groupAgent
            .get(`${BASE_URL}/count`)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
                expect(res.body.data).toBe("0");
            })
        await User.deleteOne({ email: TEST_USER_EMAIL });
    });
});