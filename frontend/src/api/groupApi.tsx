/* Import the required libraries and types */
import axios from "axios";

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

async function amendGroupDetails(id: String,
    name?: string,
    members?: [String]){
    const endpoint = `${BASE_URL}/groups/details/amend`;
    return await axios.patch(endpoint, {id, name, members});
}
async function createGroup(name: string,
    members?: [String]){
    const endpoint = `${BASE_URL}/groups/new`;
    return await axios.post(endpoint, {name, members});
}
async function deleteGroup(id: String){
    const endpoint = `${BASE_URL}/groups/delete`;
    return await axios.delete(endpoint);
}
async function getGroupCount(){
    const endpoint = `${BASE_URL}/groups/count`;
    return await axios.get(endpoint);
}
async function getGroupDetails(id: String){
    const endpoint = `${BASE_URL}/groups/details/:id`;
    return await axios.get(endpoint);
}
async function getGroups(){
    const endpoint = `${BASE_URL}/groups/`;
    return await axios.get(endpoint);
}

export {
    amendGroupDetails,
    createGroup,
    deleteGroup,
    getGroupCount,
    getGroupDetails,
    getGroups,
};