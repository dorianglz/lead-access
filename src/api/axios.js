import axios from 'axios';

const URL = "http://127.0.0.1:8080"

export default axios.create({
    baseURL: URL
});

export async function getLeads() {
    const res = await axios.get(URL + "/leads");
    return (res);
}

export async function getManagerLeads(id) {
    const res = await axios.get(URL + "/leads/manager/" + id);
    return (res);
}

export async function getUserLeads(id) {
    const res = await axios.get(URL + "/leads/user/" + id);
    return (res);
}

export async function getUser(id) {
    const res = await axios.get(URL + "/users/" + id);
    return (res);
}

export async function getNRP() {
    const res = await axios.get(URL + "/nrp");
    return (res);
}

export async function getNRPCount() {
    const res = await axios.get(URL + "/nrp/count");
    return (res);
}

export async function createCollaborator(json) {
    const res = await axios.post(URL + "/users", json,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return (res);
}

export async function updateLead(id, json) {
    const res = await axios.post(URL + "/leads/" + id, json,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );    
    return (res);
}

export async function getCollaborators(id) {
    const res = await axios.get(URL + "/collaborators/" + id);
    return (res);
}