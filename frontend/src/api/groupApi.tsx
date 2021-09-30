/* Import the required libraries and types */
import axios from "axios";
import history from "../history";

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

/* Amends the given group's details;
 * requires, in the request body:
 *   - id: ObjectId
 *   - name: string
 *   - members?: [ObjectId]
 * responds with a:
 *   - 200 OK if amendment is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the group to amend does not belong to the currently-authenticated user
 *   - 404 Not Found if the given group ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function amendGroupDetails(
    id: String,
    name?: string,
    members?: [String]
) {
    const endpoint = `${BASE_URL}/groups/details/amend`;
    return await axios.patch(endpoint, { id, name, members });
}

/* Creates a new group with the given details;
 * requires, in the request body:
 *   - name: string
 *   - members?: [ObjectId]
 * responds with a:
 *   - 201 Created if creation is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function createGroup(name: string, members?: String[]) {
    const endpoint = `${BASE_URL}/groups/new`;
    return await axios.post(endpoint, { name, members }).then(
        (response) => {
            history.push("/groups");
            console.log(response);
        },
        (error) => {
            alert("Group could not be created");
            console.log(error);
        }
    );
}

/* Deletes the given group and deassociates all its members from the group;
 * requires, in the request body:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if deletion is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the group to delete does not belong to the currently-authenticated user
 *   - 404 Not Found if the given group ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function deleteGroup(id: String) {
    const endpoint = `${BASE_URL}/groups/delete`;
    return await axios.post(endpoint, { id }).then(
        (response) => {
            history.push("/groups");
            console.log(response);
        },
        (error) => {
            alert("Group could not be deleted");
            console.log(error);
        }
    );
}

/* Returns a count of the currently-authenticated user's groups;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getGroupCount() {
    const endpoint = `${BASE_URL}/groups/count`;
    return await axios.get(endpoint);
}

/* Returns the given group's details;
 * requires, in the request params:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if query is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the group to return details on does not belong to the currently-authenticated user
 *   - 404 Not Found if the given group ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function getGroupDetails(id: String) {
    const endpoint = `${BASE_URL}/groups/details/${id}`;
    return await axios.get(endpoint);
}

/* Returns the currently-authenticated user's groups, along with their representative details;
 * responds with a:
 *   - 200 OK if query is successful
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getGroups() {
    const endpoint = `${BASE_URL}/groups/`;
    return await axios.get(endpoint);
}

/* Export api functions */
export {
    amendGroupDetails,
    createGroup,
    deleteGroup,
    getGroupCount,
    getGroupDetails,
    getGroups,
};
