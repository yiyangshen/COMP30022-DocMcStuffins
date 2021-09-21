/* Import the required libraries and types */
import axios from "axios";
import history from "./history";

/* Change the API base URL based on the environment */
var BASE_URL: string = "";
switch (process.env.NODE_ENV) {
    case "production":
        BASE_URL = "https://comp30023.herokuapp.com/api";
        break;
    case "development":
    default:
        BASE_URL = "http://localhost:48080/api";
        break;
}

/* Retrieves the currently-authenticated user's profile details;
 * responds with a:
 *   - 200 OK if the details was successfully retrieved
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getUserProfile() {
    const endpoint = `${BASE_URL}/user/login`;
    return await axios.patch(endpoint);
}

/* Authenticate the user;
 * requires, in the request body:
 *   - email: string
 *   - password: string
 * responds with a:
 *   - 200 OK if authentication is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if the provided information does not match any user in the database
 *   - 500 Internal Server Error otherwise
 */
async function loginUser(email: String, password: String) {
    const endpoint = `${BASE_URL}/user/login`;
    return await axios.patch(endpoint, { email, password });
}

/* Deauthenticates the currently-authenticated user;
 * responds with a:
 *   - 200 OK if deauthentication is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function logoutUser() {
    const endpoint = `${BASE_URL}/user/logout`;
    return await axios.patch(endpoint);
}

/* Registers and subsequently authenticates a new user;
 * requires, in the request body:
 *   - firstName: string
 *   - middleName?: string
 *   - lastName: string
 *   - email: string
 *   - password: string
 * responds with a:
 *   - 201 Created if the registration is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 403 Forbidden if the requester:
 *     - is already authenticated
 *     - provides an existing email address within the database
 *   - 500 Internal Server Error otherwise
 */
async function registerUser(
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    password: String
) {
    const endpoint = `${BASE_URL}/user/register`;
    return await axios.patch(endpoint, {
        firstName,
        middleName,
        lastName,
        email,
        password,
    });
}

/* Returns the currently-authenticated user's contacts, along with their representative details;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 204 No Content if query returns nothing
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
function getContacts() {
    const endpoint = `${BASE_URL}/contacts/`;
    return axios.get(endpoint);
}

/* Export api functions */
export { getContacts };
