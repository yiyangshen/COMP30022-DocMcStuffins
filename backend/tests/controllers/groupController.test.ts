/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";
import app from "../../src/config/serverConfig";

/* Import models */
import { User, Contact } from "../../src/models/index";

const TEST_USER_EMAIL = "phil@gaming.comm";
const TEST_USER_FIRST_NAME = "Philip";
const TEST_USER_LAST_NAME = "Holes";
const TEST_USER_PASSWORD = "phillycheese";

const BASE_URL = "/api/groups";

describe('Group count', () => {
    const userAgent = agent(app);

    beforeAll(async () => {
        const newUser = new User({
            email: TEST_USER_EMAIL,
            password: TEST_USER_PASSWORD,
            name: {
                first: TEST_USER_FIRST_NAME,
                last: TEST_USER_LAST_NAME
            }
        });
        await newUser.save();
    });

    test('1. Get a group count without being authorised', async () => {
        await userAgent
            .get(`${BASE_URL}/count`)
            .then((res: any) => {
                expect(res.body.status).toEqual(403);
            })
    });

    test('2. Get group count of an authenticated user', async () => {
        const req: any = {
            email: TEST_USER_EMAIL,
            password: TEST_USER_PASSWORD
        };

        await userAgent
            .patch(`/api/user/login`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })
            
        await userAgent
            .get(`${BASE_URL}/count`)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
                expect(res.body.data).toBe(0);
            })
        await userAgent.get(`/api/user/logout`);
    });

    afterAll(async () => {
        await User.deleteOne({ email: TEST_USER_EMAIL });
    })
});