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
    deleteContact: `${BASE_URL}/contacts/delete`,
    login: `${BASE_URL}/user/login`,
    logout: `${BASE_URL}/user/logout`
}

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
}

const TEST_GROUP = {
    name: "Megane Lovers"
};

const TEST_CONTACT = {
    firstName: "Rio",
    lastName: "Futaba",
    gender: Gender.Female,
};

describe("Integration test for contact deletion", () => {
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

    test("1. Delete contact without authentication", async () => {
        await unauthAgent
            .delete(TEST_URLS.deleteContact)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new UnauthorizedError("Unauthorized")).status);
            });
    })

    test("2. Delete ungrouped contact", async () => {
        /* Create a new contact */
        const contact = new Contact({
            userId: testUser._id,
            name: new Name({
                first: TEST_CONTACT.firstName,
                last: TEST_CONTACT.lastName
            }),
            gender: TEST_CONTACT.gender
        });
        await contact.save();

        /* Delete the new contact */
        await authAgent
            .delete(TEST_URLS.deleteContact)
            .send({ id: contact._id })
            .then((res: any) => {
                expect(res.body.status).toBe((new OKSuccess("OK")).status);
            });

        /* Check that the contact has been deleted */
        expect(await Contact.findById(contact._id)).toBeNull();
    });

    test("3. Delete contact with no data", async () => {
        await authAgent
            .delete(TEST_URLS.deleteContact)
            .send({})
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("4. Delete contact with invalid data", async () => {
        await authAgent
            .delete(TEST_URLS.deleteContact)
            .send({ id: "Invalid id" })
            .then((res: any) => {
                expect(res.body.status).toBe((new BadRequestError("Bad Request")).status);
            });
    });

    test("5. Delete non-existing contact", async () => {
        await authAgent
            .delete(TEST_URLS.deleteContact)
            .send({ id: testUser._id })
            .then((res: any) => {
                expect(res.body.status).toBe((new NotFoundError("not Found")).status);
            });
    });

    test("6. Delete contact belonging to another user", async () => {
        /* Create a new contact that belongs to another user */
        const contact = new Contact({
            userId: testUserAlt._id,
            name: new Name({
                first: TEST_CONTACT.firstName,
                last: TEST_CONTACT.lastName
            }),
            gender: TEST_CONTACT.gender
        });
        await contact.save();

        /* Attempt to delete this contact */
        await authAgent
            .delete(TEST_URLS.deleteContact)
            .send({ id: contact._id })
            .then((res: any) => {
                expect(res.body.status).toBe((new ForbiddenError("Forbidden")).status);
            });
    });

    test("7. Delete grouped contact", async () => {
        /* Create a new group with no members */
        const group = new Group({
            userId: testUser._id,
            name: TEST_GROUP.name
        });

        /* Create a new contact that members this group */
        const contact = new Contact({
            userId: testUser._id,
            name: new Name({
                first: TEST_CONTACT.firstName,
                last: TEST_CONTACT.lastName
            }),
            gender: TEST_CONTACT.gender,
            groupId: group._id
        });

        /* Add the new contact to the group member list */
        group.members.push(contact._id);
        await group.save();
        await contact.save();

        /* Delete this contact */
        await authAgent
            .delete(TEST_URLS.deleteContact)
            .send({ id: contact._id })
            .then((res: any) => {
                expect(res.body.status).toBe((new OKSuccess("OK")).status);
            });

        /* Check that the contact has been deleted */
        expect(await Contact.findById(contact._id)).toBeNull();
        
        /* Check that the group has no members */
        const groupFinal = await Group.findById(group._id);
        expect(groupFinal!.members.length).toBe(0);
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