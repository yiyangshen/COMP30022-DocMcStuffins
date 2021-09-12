/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";
import app from "../src/config/serverConfig";

/* Import models */
import { User, Memo } from "../src/models/index";

const TEST_USER_EMAIL = "phil@gaming.com";
const TEST_USER_FIRST_NAME = "Philip";
const TEST_USER_LAST_NAME = "Holes";
const TEST_USER_PASSWORD = "phillycheese";

const BASE_URL = "/api/memos";

describe('Recent memos', () => {
    const userAgent = agent(app);
    const memoAgent = agent(app);

    beforeAll(async () => {
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
    });

    test('1. Call recent-memos without being authenticated', async () => {
        await userAgent.get(`/api/passport/logout`)
        await memoAgent
            .get(`${BASE_URL}/recent/:2`)
            .then((res: any) => {
                expect(res.body.status).toEqual(403);
            })
    });

    test('2. Malformed request parameter', async () => {
        const req: any = {
            email: TEST_USER_EMAIL,
            password: TEST_USER_PASSWORD
        };

        await userAgent
            .post(`/api/passport/login`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })

        await memoAgent
            .get(`${BASE_URL}/recent/something`)
            .then((res: any) => {
                expect(res.body.status).toEqual(400);
            })
    });

    test('3. No content found', async () => {
        const req: any = {
            email: TEST_USER_EMAIL,
            password: TEST_USER_PASSWORD
        };

        await userAgent
            .post(`/api/passport/login`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })

        await memoAgent
            .get(`${BASE_URL}/recent/1`)
            .then((res: any) => {
                expect(res.status).toEqual(204);
            })
    });

    // !! TODO - successful query
    afterAll(async () => {
        await User.deleteOne({ email: TEST_USER_EMAIL });
    })
});