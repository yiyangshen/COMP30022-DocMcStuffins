/* Import the required types and libraries */
import { agent } from "supertest";
import app from "../../backend/src/server";
//import { compareSync } from "bcrypt";
import { Response } from "express";

/* Import the User and Name model */
import { User, Name } from "../../backend/src/models/index";


const TEST_USER_FIRST_NAME = "Tony";
const TEST_USER_MID_NAME = "M";
const TEST_USER_LAST_NAME = "Chungus";
const TEST_USER_PASSWORD = "peppEr0n1-";
const TEST_USER_EMAIL = "tony_pizza@gaming.com";

describe(`Create account, login, logout, and delete`, () => {

    const newUserField = {
        email: TEST_USER_EMAIL,
        firstName: TEST_USER_FIRST_NAME,
        middleName: TEST_USER_MID_NAME,
        lastName: TEST_USER_LAST_NAME,
        password: TEST_USER_PASSWORD
    };

    var userAgent = agent(app);
    /* Register test account first */


    beforeAll(async () => {
        /* Register test account first */
        await userAgent
            .post('/api/passport/register')
            .send(newUserField)
            .then((res: any) => {
                // expect(res.headersSent).toBeTruthy();
                expect(res.text).toBe("SUCCESS");
            })
    });

    test(`Login`, async () => {
        const req: any = {
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD
        };

        await userAgent
            .post('/api/passport/login')
            .send(req)
            .then((res: any) => {
                // expect(res.headersSent).toBeTruthy();
                expect(res.text).toBe("SUCCESS");
            })
    });


    test('Logout', async () => {
        await userAgent
            .get('/api/passport/logout')
            .then((res: any) => {
                // expect(res.headersSent).toBeTruthy();
                expect(res.text).toBe("SUCCESS");
            })
    })

    afterAll(async () => {
        await User.deleteOne({ email: TEST_USER_EMAIL });
    })
});
