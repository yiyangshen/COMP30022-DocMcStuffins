/* Import the required libraries and types */
import axios from "axios";
import history from "../history";

/* Change the API base URL based on the environment */
var BASE_URL: string = "";
switch (process.env.NODE_ENV) {
    case "production":
        BASE_URL = "https://doc-mcstuffins.herokuapp.com/";
        break;
    case "development":
    default:
        BASE_URL = "http://localhost:48080/api";
        break;
}

/* Amends the given memo's details;
 * requires, in the request body:
 *   - id: ObjectId
 *   - title?: string
 *   - notes?: string
 * responds with a:
 *   - 200 OK if amendment is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the memo to amend does not belong to the currently-authenticated user
 *   - 404 Not Found if the given memo ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function amendMemoDetails(id: String, title?: String, notes?: String) {
    const endpoint = `${BASE_URL}/memos/details/amend`;
    return await axios.patch(endpoint, { id, title, notes }).then(
        (response) => {
            history.push("/memos");
            console.log(response);
        },
        (error) => {
            alert("Please check the input");
            console.log(error);
        }
    );
}

/* Creates a new memo with the given details;
 * requires, in the request body:
 *   - title: string
 *   - notes?: string
 * responds with a:
 *   - 201 Created if creation is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function createMemo(title: String, notes?: String) {
    const endpoint = `${BASE_URL}/memos/new`;
    return await axios.post(endpoint, { title, notes }).then(
        (response) => {
            history.push("/memos");
            console.log(response);
        },
        (error) => {
            alert("Please check the input");
            console.log(error);
        }
    );
}

/* Deletes the given memo;
 * requires, in the request body:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if deletion is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the memo to delete does not belong to the currently-authenticated user
 *   - 404 Not Found if the given memo ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function deleteMemo(id: String) {
    const endpoint = `${BASE_URL}/memos/delete`;
    return await axios.post(endpoint, { id }).then(
        (response) => {
            history.push("/memos");
            console.log(response);
        },
        (error) => {
            alert("Memo could not be deleted");
            console.log(error);
        }
    );
}

/* Returns the given memo's details;
 * requires, in the request params:
 *   - id: ObjectId
 * responds with a:
 *   - 200 OK if query is successful
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 403 Forbidden if the memo to return details on does not belong to the currently-authenticated user
 *   - 404 Not Found if the given memo ID does not exist in the database
 *   - 500 Internal Server Error otherwise
 */
async function getMemoDetails(id: String) {
    const endpoint = `${BASE_URL}/memos/details/${id}`;
    return await axios.get(endpoint);
}

/* Returns the currently-authenticated user's memos, along with their representative details;
 * responds with a:
 *   - 200 OK if query returns something
 *   - 204 No Content if the query returns nothing
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getMemos() {
    const endpoint = `${BASE_URL}/memos/`;
    return await axios.get(endpoint);
}

/* Returns the currently-authenticated user's n recentmost memos, along with their representative details;
 * requires, in the request params:
 *   - n: number
 * responds with a:
 *   - 200 OK if query is successful
 *   - 204 No Content if the query returns nothing
 *   - 400 Bad Request if the request body is malformed
 *   - 401 Unauthorized if the requester is not authenticated
 *   - 500 Internal Server Error otherwise
 */
async function getRecentMemos(n: number) {
    const endpoint = `${BASE_URL}/memos/recent/${n}`;
    return await axios.get(endpoint);
}

/* Export api functions */
export {
    amendMemoDetails,
    createMemo,
    deleteMemo,
    getMemoDetails,
    getMemos,
    getRecentMemos,
};
