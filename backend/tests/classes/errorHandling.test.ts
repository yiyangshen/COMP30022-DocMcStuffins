import { describe, test, expect } from "@jest/globals";
import { agent } from "supertest";
import app from "../../src/config/serverConfig";

const BASE_URL = "/api/errorHandling";

const ERROR_MIMETYPE = "text/error";
const TEST_ERROR_STATUS = 418;
const TEST_ERROR_STATUSTEXT = "I'm a teapot";
const TEST_ERROR_MESSAGE = "Would you like to have tea?";

const FAILED_ERROR_STATUS = 500;
const FAILED_ERROR_STATUSTEXT = "Internal Server Error";

const JSON_MIMETYPE = "application/json";
const SUCCESS_JSON_STATUS = 200;
const SUCCESS_JSON_STATUSTEXT = "OK";
const TEST_JSON_VALUE_1 = "Steven";
const TEST_JSON_VALUE_2 = "Megane wa kakkoi desu!";

describe("Error handling tests", () => {
    const errorAgent = agent(app);
    const URL = BASE_URL + "/error";
    
    test(`Trigger a well formed ${TEST_ERROR_STATUS} error`, async () => {
        await errorAgent
            .post(URL)
            .send({
                "status": TEST_ERROR_STATUS,
                "statusText": TEST_ERROR_STATUSTEXT,
                "body": TEST_ERROR_MESSAGE
            })
            .then((res: any) => {
                expect(res.statusCode).toBe(TEST_ERROR_STATUS);
                expect(res.body.mimetype).toBe(ERROR_MIMETYPE);
                expect(res.body.status).toBe(TEST_ERROR_STATUS);
                expect(res.body.statusText).toBe(TEST_ERROR_STATUSTEXT);
                expect(res.body.data).toBe(TEST_ERROR_MESSAGE);
            });
    });

    test(`Trigger a ${TEST_ERROR_STATUS} error with missing status field`, async () => {
        await errorAgent
            .post(URL)
            .send({
                "statusText": TEST_ERROR_STATUSTEXT,
                "body": TEST_ERROR_MESSAGE
            })
            .then((res: any) => {
                expect(res.statusCode).toBe(FAILED_ERROR_STATUS);
                expect(res.body.mimetype).toBe(ERROR_MIMETYPE);
                expect(res.body.status).toBe(FAILED_ERROR_STATUS);
                expect(res.body.statusText).toBe(FAILED_ERROR_STATUSTEXT);
            });
    });

    test(`Trigger a ${TEST_ERROR_STATUS} error with missing statusText field`, async () => {
        await errorAgent
            .post(URL)
            .send({
                "status": TEST_ERROR_STATUS,
                "body": TEST_ERROR_MESSAGE
            })
            .then((res: any) => {
                expect(res.statusCode).toBe(FAILED_ERROR_STATUS);
                expect(res.body.mimetype).toBe(ERROR_MIMETYPE);
                expect(res.body.status).toBe(FAILED_ERROR_STATUS);
                expect(res.body.statusText).toBe(FAILED_ERROR_STATUSTEXT);
            });
    });

    test(`Trigger a ${TEST_ERROR_STATUS} error with missing body field`, async () => {
        await errorAgent
            .post(URL)
            .send({
                "status": TEST_ERROR_STATUS,
                "statusText": TEST_ERROR_STATUSTEXT
            })
            .then((res: any) => {
                expect(res.statusCode).toBe(FAILED_ERROR_STATUS);
                expect(res.body.mimetype).toBe(ERROR_MIMETYPE);
                expect(res.body.status).toBe(FAILED_ERROR_STATUS);
                expect(res.body.statusText).toBe(FAILED_ERROR_STATUSTEXT);
            });
    });
})

describe ("JSON response test", () => {
    const jsonAgent = agent(app);
    const URL = BASE_URL + "/json";

    test(`Receive a well formed JSON response successfully`, async () => {
        const jsonObject = {
            "nickname": TEST_JSON_VALUE_1,
            "punchline": TEST_JSON_VALUE_2
        };

        await jsonAgent
            .post(URL)
            .send(jsonObject)
            .then((res: any) => {
                expect(res.statusCode).toBe(SUCCESS_JSON_STATUS);
                expect(res.body.mimetype).toBe(JSON_MIMETYPE);
                expect(res.body.status).toBe(SUCCESS_JSON_STATUS);
                expect(res.body.statusText).toBe(SUCCESS_JSON_STATUSTEXT);
                expect(res.body.data).toStrictEqual(jsonObject);
            })
    })
})