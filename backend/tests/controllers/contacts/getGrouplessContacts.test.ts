/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";
import app from "../../../src/config/serverConfig";

/* Import models */
import { User, Contact, Group } from "../../../src/models/index";

const TEST_USER_EMAIL_1 = "phil@gaming.com"; 
const TEST_USER_EMAIL_2 = TEST_USER_EMAIL_1 + "1"; 
const TEST_USER_FIRST_NAME = "Philip";
const TEST_USER_LAST_NAME = "Holes";
const TEST_USER_PASSWORD = "phillycheese";

const TEST_USER_1 = {
    email: "phil@gaming.comt",
    firstName : "Philip",
    lastName : "Holes",
    password : "phillycheese"
}

const TEST_USER_2 = {
    email: TEST_USER_1.email + ".au",
    firstName: TEST_USER_1.firstName,
    lastName: TEST_USER_1.lastName,
    password: TEST_USER_1.password
}

const TEST_GROUP_1 = {
    name : "Pork Belly"
}
const TEST_GROUP_2 = {
    name : "Katsu Curry"
}

const TEST_CONTACT_GROUPED_1 = {
    firstName : "Adam",
    lastName : "Smith",
    gender : "Female",
    dateCreated : new Date("1/1/2021"),
    dateViewed: new Date()
}

const TEST_CONTACT_GROUPED_2 = {
    firstName : "Bald",
    lastName : "Bankrupt",
    gender : "Other",
    dateCreated : new Date("11/1/2021"),
    dateViewed : new Date()
}

const TEST_CONTACT_UNGROUPED = {
    firstName : "Ricardo",
    lastName : "Tempesto",
    gender : "Male",
    dateCreated : new Date("3/1/2021"),
    dateViewed : new Date()
}

const BASE_URL = "/api/contacts/groupless";

describe('Contacts lists (getContacts)', () => {
    beforeAll(async () => {
        // Register new users for testing
        // user with grouped and ungrouped contact
        const newUser1 = new User({
            email: TEST_USER_1.email,
            password: TEST_USER_1.password,
            name: {
                first: TEST_USER_1.firstName,
                last: TEST_USER_1.lastName
            }
        });

        // user with only grouped contact
        const newUser2 = new User({
            email: TEST_USER_2.email,
            password: TEST_USER_2.password,
            name: {
                first: TEST_USER_2.firstName,
                last: TEST_USER_2.lastName
            }
        });

        await newUser1.save(); 
        await newUser2.save();
        
        // add new groups
        const newGroup = new Group({
            userId: newUser1._id,
            name : TEST_GROUP_1.name
        })
        const newGroup2 = new Group({
            userId: newUser2._id,
            name : TEST_GROUP_2.name
        })

        await newGroup.save();
        await newGroup2.save();

        // Add new contacts to newUser1 for testing 
        const newContactGrouped = new Contact({
            userId : newUser1._id,
            name : {
                first: TEST_CONTACT_GROUPED_1.firstName,
                last: TEST_CONTACT_GROUPED_1.lastName
            },
            gender: TEST_CONTACT_GROUPED_1.gender,
            timestamps:{
                created: TEST_CONTACT_GROUPED_1.dateCreated,
                viewed: TEST_CONTACT_GROUPED_1.dateViewed
            },
            groupId : newGroup._id
        })
        const newContactUngrouped = new Contact({
            userId : newUser1._id,
            name : {
                first: TEST_CONTACT_UNGROUPED.firstName,
                last: TEST_CONTACT_UNGROUPED.lastName
            },
            gender: TEST_CONTACT_UNGROUPED.gender,
            timestamps:{
                created: TEST_CONTACT_UNGROUPED.dateCreated,
                viewed: TEST_CONTACT_UNGROUPED.dateViewed
            }
        })

        await newContactGrouped.save();
        await newContactUngrouped.save();

        // add grouped contact to user2 for testing
        const newContactGrouped2 = new Contact({
            userId : newUser1._id,
            name : {
                first: TEST_CONTACT_GROUPED_2.firstName,
                last: TEST_CONTACT_GROUPED_2.lastName
            },
            gender: TEST_CONTACT_GROUPED_2.gender,
            timestamps:{
                created: TEST_CONTACT_GROUPED_2.dateCreated,
                viewed: TEST_CONTACT_GROUPED_2.dateViewed,
            },
            groupId : newGroup2._id
        })

        await newContactGrouped2.save();
    });

    const userAgent = agent(app);

    test('1. Get contacts list without being authenticated', async () => {
        await userAgent.get(`/api/user/logout`);
        await userAgent
            .get(`${BASE_URL}`)
            .then((res: any) => {
                expect(res.body.status).toEqual(401);
            })
    });

    test('2. Get lists of ungrouped contacts of an authenticated user', async () => {
        const req: any = {
            email: TEST_USER_1.email,
            password: TEST_USER_1.password
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
                expect(res.body.data.length).toEqual(1);
                expect(res.body.data[0].name.first).toBe(TEST_CONTACT_UNGROUPED.firstName);
                expect(res.body.data[0].name.last).toBe(TEST_CONTACT_UNGROUPED.lastName);
            })
        await userAgent.get(`/api/user/logout`);
    });

    test('3. Get contact list of user with 0 ungrouped contacts', async () => {
        const req: any = {
            email: TEST_USER_2.email,
            password: TEST_USER_2.password
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
    });

    afterAll(async () => {
        /* Delete test user */
        await User.deleteMany();
        
        /* Delete test contacts */
        await Contact.deleteMany();

        /* Delete test groups */
        await Group.deleteMany();
    });
})