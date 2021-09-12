/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";
import app from "../src/config/serverConfig";

/* Import models */
import { User, Memo } from "../src/models/index";

const TEST_USER_EMAIL = "phil@gaming.come";
const TEST_USER_FIRST_NAME = "Philip";
const TEST_USER_LAST_NAME = "Holes";
const TEST_USER_PASSWORD = "phillycheese";

const MEMO_TITLE_1 = "Test"
const MEMO_DATE_CREATED_1 = new Date("1/1/2021")
const MEMO_DATE_VIEWED_1 = new Date()

const MEMO_TITLE_2 = "Presentation"
const MEMO_DATE_CREATED_2 = new Date("5/1/2021")
const MEMO_DATE_VIEWED_2 = new Date()

const BASE_URL = "/api/memos";

describe('Recent memos', () => {
    const userAgent = agent(app);
    const memoAgent = agent(app);

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

    test('1. Call recent-memos without being authenticated', async () => {
        await userAgent
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
            .patch(`/api/user/login`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })

        await userAgent
            .get(`${BASE_URL}/recent/something`)
            .then((res: any) => {
                expect(res.body.status).toEqual(400);
            })
        await userAgent.get(`/api/user/logout`);
    });

    test('3. No content found', async () => {
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
            .get(`${BASE_URL}/recent/1`)
            .then((res: any) => {
                expect(res.status).toEqual(204);
            })
        await userAgent.get(`/api/user/logout`);
    });

    // !! TODO - successful query
    test('4. Successful query with contents added', async () => {
        const oneUser = await User.findOne({email: TEST_USER_EMAIL})
        const userID = oneUser._id;

        const req: any = {
            email: TEST_USER_EMAIL,
            password: TEST_USER_PASSWORD
        };

        await userAgent
            .patch(`/api/user/login`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
        });

        const memo1 = new Memo({
            userId:userID,
            title:MEMO_TITLE_1,
            timestamps:{
                created: MEMO_DATE_CREATED_1,
                viewed:MEMO_DATE_VIEWED_1,
            },
        });

        const memo2 = new Memo({
            userId:userID,
            title:MEMO_TITLE_2,
            timestamps:{
                created: MEMO_DATE_CREATED_2,
                viewed:MEMO_DATE_VIEWED_2,
            },
        });

        await memo1.save();
        await memo2.save()

        await userAgent
            .get(`${BASE_URL}/recent/2`)
            .then((res: any) => {
                console.log(res.body);
                expect(res.status).toEqual(200);
            })
        await userAgent.get(`/api/user/logout`);
        await Memo.deleteMany({userId:userID});
    })
    afterAll(async () => {
        await User.deleteOne({ email: TEST_USER_EMAIL });
    })
});