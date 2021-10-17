/* Import the required libraries and types */
import axios from "axios";
import history from "../history";

/* Change the API base URL based on the environment */
var BASE_URL: string = "";
switch (process.env.NODE_ENV) {
    case "production":
        BASE_URL = "https://doc-mcstuffins.herokuapp.com/api";
        break;
    case "development":
    default:
        BASE_URL = "http://localhost:48080/api";
        break;
}

/* Returns the currently-authenticated user's contacts, along with their representative details;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 204 No Content if query returns nothing
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getContacts() {
    const endpoint = `${BASE_URL}/contacts/`;
    return await axios.get(endpoint);
}

/* Returns a count of the currently-authenticated user's contacts;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getContactCount() {
    const endpoint = `${BASE_URL}/contacts/count`;
    return await axios.get(endpoint);
}

/* Deletes the given contact and deassociates it from its group, if present;
 * requires, in the request body:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if deletion is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the contact to delete does not belong to the currently-authenticated user
 *   - 404 Not Found if the given contact ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function deleteContact(id: String) {
    const endpoint = `${BASE_URL}/contacts/delete`;
    return await axios.post(endpoint, { id }).then(
        (response) => {
            history.push("/contacts");
            console.log(response);
        },
        (error) => {
            alert("Can not be deleted");
            console.log(error);
        }
    );
}

/* Returns the given contact's details;
 * requires, in the request params:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if query is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the contact to return details on does not belong to the currently-authenticated user
 *   - 404 Not Found if the given contact ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function getContactDetails(id: String) {
    const endpoint = `${BASE_URL}/contacts/details/${id}`;
    return await axios.get(endpoint);
}

/* Amends the given contact's details;
 * requires, in the request body:
 *   - id: ObjectId
 *   - firstName?: string
 *   - middleName?: string
 *   - lastName?: string
 *   - groupId?: ObjectId
 *   - gender?: string
 *   - dateOfBirth?: Date
 *   - lastMet?: Date
 *   - phoneNumber?: string
 *   - email?: string
 *   - photo?: string
 *   - relationship?: string
 *   - additionalNotes?: string
 * responds with a:
 *   - 200 OK if amendment is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if:
 *     - the requester is not authenticated
 *     - the group to amend does not belong to the currently-authenticated user
 *   - 404 Not Found if the given contact ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function amendContactDetails(
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    groupId: string,
    gender: string,
    dateOfBirth: Date,
    lastMet: Date,
    phoneNumber: string,
    email: string,
    photo: string,
    relationship: string,
    additionalNotes: string
) {
    const endpoint = `${BASE_URL}/contacts/details/amend`;
    return await axios
        .patch(endpoint, {
            id,
            firstName,
            middleName,
            lastName,
            groupId,
            gender,
            dateOfBirth,
            lastMet,
            phoneNumber,
            email,
            photo,
            relationship,
            additionalNotes,
        })
        .then(
            (response) => {
                history.push("/contacts");
                console.log(response);
            },
            (error) => {
                alert("Please check the input");
                console.log(error);
            }
        );
}

/* Creates a new contact with the given details;
 * requires, in the request body:
 *   - firstName: string
 *   - middleName?: string
 *   - lastName: string
 *   - groupId?: ObjectId
 *   - gender?: string
 *   - dateOfBirth?: Date
 *   - lastMet?: Date
 *   - phoneNumber?: string
 *   - email?: string
 *   - photo?: string
 *   - relationship?: string
 *   - additionalNotes?: string
 * responds with a:
 *   - 201 Created if creation is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function createContact(
    firstName: string,
    middleName: string,
    lastName: string,
    groupId: string,
    gender: string,
    dateOfBirth: Date,
    lastMet: Date,
    phoneNumber: string,
    email: string,
    photo: string,
    relationship: string,
    additionalNotes: string
) {
    const endpoint = `${BASE_URL}/contacts/new`;
    return await axios
        .post(endpoint, {
            firstName,
            middleName,
            lastName,
            groupId,
            gender,
            dateOfBirth,
            lastMet,
            phoneNumber,
            email,
            photo,
            relationship,
            additionalNotes,
        })
        .then(
            (response) => {
                history.push("/contacts");
                console.log(response);
            },
            (error) => {
                alert("Please check the input");
                console.log(error);
            }
        );
}

/* Returns a list of contacts with no associated groups
 * responds with a:
 *   - 200 OK if query is successful
 *   - 204 No Content if query returns nothing
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getGrouplessContacts() {
    const endpoint = `${BASE_URL}/contacts/groupless`;
    return await axios.get(endpoint);
}

/* Export api functions */
export {
    getContacts,
    getContactCount,
    deleteContact,
    getContactDetails,
    amendContactDetails,
    createContact,
    getGrouplessContacts,
};
