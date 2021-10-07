/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";
import app from "../../../src/config/serverConfig";

/* Import models */
import { User, Contact, Group } from "../../../src/models/index";

const TEST_USER_EMAIL_1 = "phil@gaming.comt"; 
const TEST_USER_EMAIL_2 = TEST_USER_EMAIL_1 + "1"; 
const TEST_USER_FIRST_NAME = "Philip";
const TEST_USER_LAST_NAME = "Holes";
const TEST_USER_PASSWORD = "phillycheese";

const TEST_GROUP_NAME = "Pork Belly!";

const TEST_CONTACT_FIRST_NAME_GROUPED = "Adam";
const TEST_CONTACT_LAST_NAME_GROUPED = "Smithy";
const TEST_CONTACT_GENDER_GROUPED = "Female";
const TEST_CONTACT_DATE_CREATED_GROUPED = new Date("1/1/2021");
const TEST_CONTACT_DATE_VIEWED_GROUPED = new Date();

const TEST_CONTACT_FIRST_NAME_UNGROUPED = "Ricardo";
const TEST_CONTACT_LAST_NAME_UNGROUPED = "Tempesto";
const TEST_CONTACT_GENDER_UNGROUPED = "Male";
const TEST_CONTACT_DATE_CREATED_UNGROUPED = new Date("3/1/2021");
const TEST_CONTACT_DATE_VIEWED_UNGROUPED = new Date();


const BASE_URL = "/api/contacts/groupless";

describe('Contacts lists (getContacts)', () => {
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
        
        // add new group
        const newGroup = new Group({
            userId: newUser1._id,
            name : TEST_GROUP_NAME
        })

        await newGroup.save();

        // Add new contacts to newUser1 for testing 
        const newContactGrouped = new Contact({
            userId : newUser1._id,
            name : {
                first: TEST_CONTACT_FIRST_NAME_GROUPED,
                last: TEST_CONTACT_LAST_NAME_GROUPED
            },
            gender: TEST_CONTACT_GENDER_GROUPED,
            timestamps:{
                created:TEST_CONTACT_DATE_CREATED_GROUPED,
                viewed:TEST_CONTACT_DATE_VIEWED_GROUPED
            },
            groupId : newGroup._id
        })
        const newContactUngrouped = new Contact({
            userId : newUser1._id,
            name : {
                first: TEST_CONTACT_FIRST_NAME_UNGROUPED,
                last: TEST_CONTACT_LAST_NAME_UNGROUPED
            },
            gender: TEST_CONTACT_GENDER_UNGROUPED,
            timestamps:{
                created:TEST_CONTACT_DATE_CREATED_UNGROUPED,
                viewed:TEST_CONTACT_DATE_VIEWED_UNGROUPED
            }
        })


        await newContactGrouped.save();
        await newContactUngrouped.save();
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
                expect(res.body.data.length).toEqual(1);
                expect(res.body.data[0].name.first).toBe(TEST_CONTACT_FIRST_NAME_UNGROUPED);
                expect(res.body.data[0].name.last).toBe(TEST_CONTACT_LAST_NAME_UNGROUPED);
            })
        await userAgent.get(`/api/user/logout`);
    });

    test('3. Get contact list of user with 0 ungrouped contacts', async () => {
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