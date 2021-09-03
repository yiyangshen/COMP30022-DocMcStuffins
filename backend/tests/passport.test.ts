/* Import the required types and libraries */
import { agent } from "supertest";
import app from "../../backend/src/server";
import { Response, Request } from "express";

/* Import the User and Name model */
import { User } from "../../backend/src/models/index";

const TEST_USER_EMAIL = "phil@gaming.com";
const TEST_USER_FIRST_NAME = "Philip";
const TEST_USER_MID_NAME = "Oliver";
const TEST_USER_LAST_NAME = "Holes";
const TEST_USER_PASSWORD = "phillycheese";

/* Emails used for different registration tests */
const TEST_USER_EMAIL_TR0 = TEST_USER_EMAIL + '.au';
const TEST_USER_EMAIL_TR1 = TEST_USER_EMAIL + '.id'
const TEST_USER_EMAIL_TR2 = TEST_USER_EMAIL + '.edu'

describe('Registration tests', () => {
    const userAgent = agent(app);

    test('1. Register with empty data', async () => {
        const req: any = { };
        await userAgent
            .post('/api/passport/register')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(400);
            })
    });

    test('2. Register only with required fields', async () => {
        const req: any = {
            email: TEST_USER_EMAIL_TR0,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD
        };
        await userAgent
            .post('/api/passport/register')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })
    });

    test('3. Register by sending all fields', async () => {
        const req: any = {
            email: TEST_USER_EMAIL_TR1,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD,
            middle: TEST_USER_MID_NAME
        };
        await userAgent
            .post('/api/passport/register')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })
    });

    test('4. Register with less than required password length', async () => {
        const req: any = {
            email: TEST_USER_EMAIL_TR0,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: '0123',
            middle: TEST_USER_MID_NAME
        };
        await userAgent
            .post('/api/passport/register')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(400);
            })
    });

    test('5. Register with pre-existing email address', async () => {
        const req: any = {
            email: TEST_USER_EMAIL_TR2,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD,
            middle: TEST_USER_MID_NAME
        };
        await userAgent
            .post('/api/passport/register')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })
        await userAgent
            .post('/api/passport/register')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(404);
            })
    })


    afterAll(async () => {

        // delete all created accounts
        await User.deleteOne({ email: TEST_USER_EMAIL });
        await User.deleteOne({ email: TEST_USER_EMAIL_TR0 });
        await User.deleteOne({ email: TEST_USER_EMAIL_TR1 });
        await User.deleteOne({ email: TEST_USER_EMAIL_TR2 });
    })

});

describe('Login tests', () => {
    const userAgent = agent(app);

    beforeAll(async () => {
        // register an account to be used for login testing
        const req: any = {
            email: TEST_USER_EMAIL,
            firstName: TEST_USER_FIRST_NAME,
            lastName: TEST_USER_LAST_NAME,
            password: TEST_USER_PASSWORD,
            middle: TEST_USER_MID_NAME
        };
        await userAgent
            .post('/api/passport/register')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })
    })

    test('1. Login with empty data', async () => {
        const req: any = { };
        await userAgent
            .post('/api/passport/login')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(400);
            })
    });

    test('2. Login with valid email and password', async () => {
        const req: any = {
            email: TEST_USER_EMAIL,
            password: TEST_USER_PASSWORD
        }
        await userAgent
            .post('/api/passport/login')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })
    });

    test('3. Login with invalid email', async () => {
        const req: any = {
            email: 'any',
            password: TEST_USER_PASSWORD
        }
        await userAgent
            .post('/api/passport/login')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(404);
            })
    });

    test('4. Login with incorrect password', async () => {
        const req: any = {
            email: TEST_USER_EMAIL,
            password: '012'
        }
        await userAgent
            .post('/api/passport/login')
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(401);
            })
    });

    afterAll(async () => {
        await User.deleteOne({ email: TEST_USER_EMAIL });
    })

})
