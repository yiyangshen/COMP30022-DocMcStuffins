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

async function amendMemoDetails(id: String, title?: String, notes?: String) {
    const endpoint = `${BASE_URL}/memos/details/amend`;
    return await axios.patch(endpoint, { id, title, notes });
}
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
async function deleteMemo(id: String) {
    //id not used
    const endpoint = `${BASE_URL}/memos/delete`;
    return await axios.delete(endpoint);
}
async function getMemoDetails(id: String) {
    const endpoint = `${BASE_URL}/memos/details/${id}`;
    return await axios.get(endpoint);
}
async function getMemos() {
    const endpoint = `${BASE_URL}/memos/`;
    return await axios.get(endpoint);
}
async function getRecentMemos(n: number) {
    const endpoint = `${BASE_URL}/memos/recent/${n}`;
    return await axios.get(endpoint);
}

export {
    amendMemoDetails,
    createMemo,
    deleteMemo,
    getMemoDetails,
    getMemos,
    getRecentMemos,
};
