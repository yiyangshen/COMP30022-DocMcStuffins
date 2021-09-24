/* Import the required types and libraries */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { agent } from "supertest";

/* Import the required classes and models */
import {
    BadRequestError, ForbiddenError,
    OKSuccess, UnauthorizedError, NotFoundError
} from "../../../src/classes";
import { Contact, Gender, Group, Name, User } from "../../../src/models";

/* Import the Express application */
import app from "../../../src/config/serverConfig";

/* Define test constants */
const BASE_URL = "/api";
const TEST_URLS = {
    amendGroup: `${BASE_URL}/groups/details/amend`,
    login: `${BASE_URL}/user/login`,
    logout: `${BASE_URL}/user/logout`
};

/* Define test data */
const TEST_USER = {
    email: "futabario@megane.jp",
    firstName: "Rio",
    lastName: "Futaba",
    password: "Megane wa kakkoi desu!"
};

const TEST_USER_ALT = {
    email: "asadashino@megane.jp",
    firstName: "Asada",
    lastName: "Shino",
    password: "Kirito-kun"
};

const TEST_GROUP_1 = {
    name: "Megane Lovers"
};

const TEST_GROUP_1_AMENDED = {
    name: "Megane Fans"
};

const TEST_GROUP_2 = {
    name: "Kawaii Researchers"
};

const TEST_CONTACT = {
    firstName: "Yuma",
    lastName: "Kunimi",
    gender: Gender.Male,
    relationship: "Tomodachi"
};

describe("Integration test for group amendment", () => {
    /* Create user agents */
    const unauthAgent = agent(app);
    const authAgent = agent(app);

    /* Create test users */
    const testUser = new User({
        email: TEST_USER.email,
        password: TEST_USER.password,
        name: new Name({
            first: TEST_USER.firstName,
            last: TEST_USER.lastName
        })
    });
    const testUserAlt = new User({
        email: TEST_USER_ALT.email,
        password: TEST_USER_ALT.password,
        name: new Name({
            first: TEST_USER_ALT.firstName,
            last: TEST_USER_ALT.lastName
        })
    });

    beforeAll(async () => {
        /* Save test users in database */
        await testUser.save();
        await testUserAlt.save();

        /* Authenticate user agent */
        await authAgent
            .patch(TEST_URLS.login)
            .send({
                email: TEST_USER.email,
                password: TEST_USER.password
            })
            .then((res: any) => {
                if (res.body.status === (new OKSuccess("OK")).status) {
                    console.log("Test user successfully authenticated!");
                }
            });
    });

    test("1. Amend group without authentication", async () => {
        await unauthAgent
            .patch(TEST_URLS.amendGroup)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new UnauthorizedError("Unauthorized")).status);
            });
    });

    test("2. Amend existing group without changing memebrs", async () => {
        /* Create a new group */
        const group = new Group({
            userId: testUser._id,
            name: TEST_GROUP_1.name
        });
        await group.save();

        /* Amend the new group */
        await authAgent
            .patch(TEST_URLS.amendGroup)
            .send({
                id: group._id,
                name: TEST_GROUP_1_AMENDED.name
            })
            .then((res: any) => {
                expect(res.body.status).toBe((new OKSuccess("OK")).status);
            });

        /* Check that the group's name has been changed */
        const amendedGroup = await Group.findById(group._id);
        expect(amendedGroup).toBeTruthy();
        expect(amendedGroup!.name).toBe(TEST_GROUP_1_AMENDED.name);
    });

    test("3. Amend group with no data", async () => {
        await authAgent
            .patch(TEST_URLS.amendGroup)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("4. Amend group with invalid data", async () => {
        await authAgent
            .patch(TEST_URLS.amendGroup)
            .send({ id: "Invalid id" })
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });
    
    test("5. Amend non-existing group", async () => {
        await authAgent
            .patch(TEST_URLS.amendGroup)
            .send({
                id: testUser._id,
                name: "Mai"
            })
            .then((res: any) => {
                expect(res.body.status).toBe((new NotFoundError("Not Found")).status);
            });
    });

    test("6. Amend group belonging to another user", async () => {
        /* Create a new group that belongs to another user */
        const group = new Group({
            userId: testUserAlt._id,
            name: TEST_GROUP_1.name
        });
        await group.save();

        /* Attempt to amend this group */
        await authAgent
            .patch(TEST_URLS.amendGroup)
            .send({
                id: group._id,
                name: "Sakuta"
            })
            .then((res: any) => {
                expect(res.body.status).toBe((new ForbiddenError("Forbidden")).status);
            });
    });

    test("7. Amend existing group while changing members", async () => {
        /* Create two new groups */
        const group1 = new Group({
            userId: testUser._id,
            name: TEST_GROUP_1.name
        });
        const group2 = new Group({
            userId: testUser._id,
            name: TEST_GROUP_2.name
        });
        await group1.save();
        await group2.save();

        /* Create a new contact */
        const contact = new Contact({
            userId: testUser._id,
            name: new Name({
                first: TEST_CONTACT.firstName,
                last: TEST_CONTACT.lastName
            })
        });
        await contact.save();

        /* Add contact to group 1 */
        await authAgent
            .patch(TEST_URLS.amendGroup)
            .send({
                id: group1._id,
                name: TEST_GROUP_1,
                members: [contact._id]
            })
            .then(async (res: any) => {
                expect(res.body.status).toBe((new OKSuccess("OK")).status);

                const amendedContact = await Contact.findById(contact._id);
                expect(amendedContact).toBeTruthy();
                expect(amendedContact!.groupId).toStrictEqual(group1._id);

                const amendedGroup1 = await Group.findById(group1._id);
                expect(amendedGroup1).toBeTruthy();
                expect([...amendedGroup1!.members]).toStrictEqual([contact._id]);
            });

        /* Move contact from group 1 to group 2 */
        await authAgent
            .patch(TEST_URLS.amendGroup)
            .send({
                id: group2._id,
                name: TEST_GROUP_2,
                members: [contact._id]
            })
            .then(async (res: any) => {
                expect(res.body.status).toBe((new OKSuccess("OK")).status);

                const amendedContact = await Contact.findById(contact._id);
                expect(amendedContact).toBeTruthy();
                expect(amendedContact!.groupId).toStrictEqual(group2._id);

                const amendedGroup1 = await Group.findById(group1._id);
                expect(amendedGroup1).toBeTruthy();
                expect([...amendedGroup1!.members]).toHaveLength(0);

                const amendedGroup2 = await Group.findById(group2._id);
                expect(amendedGroup2).toBeTruthy();
                expect([...amendedGroup2!.members]).toStrictEqual([contact._id]);
            });

        /* Remove contact from group 2 */
        await authAgent
            .patch(TEST_URLS.amendGroup)
            .send({
                id: group2._id,
                name: TEST_GROUP_2
            })
            .then(async (res: any) => {
                expect(res.body.status).toBe((new OKSuccess("OK")).status);

                const amendedContact = await Contact.findById(contact._id);
                expect(amendedContact).toBeTruthy();
                expect(amendedContact!.groupId).toBeUndefined();

                const amendedGroup2 = await Group.findById(group2._id);
                expect(amendedGroup2).toBeTruthy();
                expect(amendedGroup2!.members).toHaveLength(0);
            });
    });

    afterAll(async () => {
        /* Deauthenticate user agent */
        await authAgent.patch(TEST_URLS.logout);
        
        /* Delete test user */
        await User.deleteMany();
        
        /* Delete test groups */
        await Group.deleteMany();

        /* Delete test contacts */
        await Contact.deleteMany();
    });
})