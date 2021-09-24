/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";
import app from "../../../src/config/serverConfig";

/* Import models */
import { User, Contact, Group } from "../../../src/models/index";

const TEST_USER_EMAIL = "phil@gaming.comm";
const TEST_USER_FIRST_NAME = "Philip";
const TEST_USER_LAST_NAME = "Holes";
const TEST_USER_PASSWORD = "phillycheese";

const TEST_GROUP_NAME_1 = "Doc McStuffins";
const TEST_GROUP_NAME_2 = "Prok Belly";

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

const BASE_URL = "/api/groups";

beforeAll(async () => {
    // Register new user
    const newUser = new User({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
        name: {
            first: TEST_USER_FIRST_NAME,
            last: TEST_USER_LAST_NAME
        }
    });
    await newUser.save();

    // Register new Contacts
    const newContact1 = new Contact({
        userId : newUser._id,
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
        userId : newUser._id,
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

    // Register new groups and assign contacts to them
    const newGroup1 = new Group({
        userId: newUser._id,
        name: TEST_GROUP_NAME_1,
        members : [newContact1._id]
    })
    const newGroup2 = new Group({
        userId: newUser._id,
        name: TEST_GROUP_NAME_2,
        members : [newContact2._id]
    })
    await newGroup1.save();
    await newGroup2.save();
});

describe('Group count', () => {
    const userAgent = agent(app);

    test('1. Get a group count without being authorised', async () => {
        await userAgent
            .get(`${BASE_URL}/count`)
            .then((res: any) => {
                expect(res.body.status).toEqual(401);
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
                expect(res.body.data).toBe(2);
            })
        await userAgent.get(`/api/user/logout`);
    });
});

afterAll(async () => {
    const USER_ID = (await User.findOne({ email: TEST_USER_EMAIL}))!._id;
    await User.deleteOne({ email: TEST_USER_EMAIL });
    await Contact.deleteMany({userId:USER_ID});
    await Group.deleteMany({userId:USER_ID});
});