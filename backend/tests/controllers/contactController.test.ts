/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";
import app from "../../src/config/serverConfig";

/* Import models */
import { User, Contact } from "../../src/models/index";

const TEST_USER_EMAIL_1 = "phil@gaming.comt"; 
const TEST_USER_EMAIL_2 = TEST_USER_EMAIL_1 + "1"; 
const TEST_USER_FIRST_NAME = "Philip";
const TEST_USER_LAST_NAME = "Holes";
const TEST_USER_PASSWORD = "phillycheese";

const TEST_CONTACT_FIRST_NAME_1 = "Adam";
const TEST_CONTACT_LAST_NAME_1 = "Smithy";
const TEST_CONTACT_GENDER_1 = "Female";
const TEST_CONTACT_DATE_CREATED_1 = new Date("1/1/2021");
const TEST_CONTACT_DATE_VIEWED_1 = new Date();

const TEST_CONTACT_FIRST_NAME_2 = "Ricardo";
const TEST_CONTACT_LAST_NAME_2 = "Tempesto";
const TEST_CONTACT_GENDER_2 = "Male";
const TEST_CONTACT_DATE_CREATED_2 = new Date("3/1/2021");
const TEST_CONTACT_DATE_VIEWED_2 = new Date();

const BASE_URL = "/api/contacts";

beforeAll(async () => {
    // Register new users for testing
    // user with contact
    const newUser1 = new User({
        email: TEST_USER_EMAIL_1,
        password: TEST_USER_PASSWORD,
        name: {
            first: TEST_USER_FIRST_NAME,
            last: TEST_USER_LAST_NAME
        }
    });
    await newUser1.save(); 

    // user with no contact
    const newUser2 = new User({
        email: TEST_USER_EMAIL_2,
        password: TEST_USER_PASSWORD,
        name: {
            first: TEST_USER_FIRST_NAME,
            last: TEST_USER_LAST_NAME
        }
    });
    await newUser2.save();
    
    // Add new contacts to newUser1 for testing 
    const newContact1 = new Contact({
        userId : newUser1._id,
        name : {
            first: TEST_CONTACT_FIRST_NAME_1,
            last: TEST_CONTACT_LAST_NAME_1
        },
        gender: TEST_CONTACT_GENDER_1,
        timestamps:{
            created:TEST_CONTACT_DATE_CREATED_1,
            viewed:TEST_CONTACT_DATE_VIEWED_1
        }
    })
    const newContact2 = new Contact({
        userId : newUser1._id,
        name : {
            first: TEST_CONTACT_FIRST_NAME_2,
            last: TEST_CONTACT_LAST_NAME_2
        },
        gender: TEST_CONTACT_GENDER_2,
        timestamps:{
            created:TEST_CONTACT_DATE_CREATED_2,
            viewed:TEST_CONTACT_DATE_VIEWED_2
        }
    })
    await newContact1.save();
    await newContact2.save();
});

describe('Contact count', () => {
    const userAgent = agent(app);

    test('1. Get a contact count without being authorised', async () => {
        await userAgent.get(`/api/user/logout`);
        await userAgent
            .get(`${BASE_URL}/count`)
            .then((res: any) => {
                expect(res.body.status).toEqual(403);
            })
    });

    test('2. Get contact count of an authenticated user', async () => {
        const req: any = {
            email: TEST_USER_EMAIL_1,
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
                expect(res.body.data).toEqual(2);
            })
        await userAgent.get(`/api/user/logout`);
    });


});

describe('Contacts lists (getContacts)', () => {
    const userAgent = agent(app);

    test('1. Get contacts list without being authenticated', async () => {
        await userAgent.get(`/api/user/logout`);
        await userAgent
            .get(`${BASE_URL}`)
            .then((res: any) => {
                expect(res.body.status).toEqual(403);
            })
    })

    test('2. Get lists of contacts of an authenticated user', async () => {
        const req: any = {
            email: TEST_USER_EMAIL_1,
            password: TEST_USER_PASSWORD
        };

        await userAgent
            .patch(`/api/user/login`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })

        await userAgent
            .get(`${BASE_URL}`)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
                console.log(res.body.data);
                // confirming contacts
                expect(res.body.data[0].name.first).toBe(TEST_CONTACT_FIRST_NAME_1);
                expect(res.body.data[0].name.last).toBe(TEST_CONTACT_LAST_NAME_1);

                expect(res.body.data[1].name.first).toBe(TEST_CONTACT_FIRST_NAME_2);
                expect(res.body.data[1].name.last).toBe(TEST_CONTACT_LAST_NAME_2);
            })
        await userAgent.get(`/api/user/logout`);
    })

    test('3. Get contact list of user with 0 contacts', async () => {
        const req: any = {
            email: TEST_USER_EMAIL_2,
            password: TEST_USER_PASSWORD
        };

        await userAgent
            .patch(`/api/user/login`)
            .send(req)
            .then((res: any) => {
                expect(res.body.status).toEqual(200);
            })

        await userAgent
            .get(`${BASE_URL}`)
            .then((res: any) => {
                expect(res.status).toEqual(204);
            })
        await userAgent.get(`/api/user/logout`);
    })
})

afterAll(async () => {
    const USER_ID = (await User.findOne({ email: TEST_USER_EMAIL_1}))!._id;
    await Contact.deleteMany({ userId: USER_ID });
    await User.deleteOne({ email: TEST_USER_EMAIL_1 });
    await User.deleteOne({ email: TEST_USER_EMAIL_2 });
})