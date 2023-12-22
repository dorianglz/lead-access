import axios from 'axios';

const URL = "http://127.0.0.1:8080"

export default axios.create({
    baseURL: URL
});

export async function getLeads() {
    try {
        const res = await axios.get(URL + "/leads");
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getManagerLeads(id) {
    try {
        const res = await axios.get(URL + "/leads/manager/" + id);
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getUserLeads(id) {
    try {
        const res = await axios.get(URL + "/leads/user/" + id);
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getUser(id) {
    try {
        const res = await axios.get(URL + "/users/" + id);
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getUserEmail(email) {
    try {
        const json = JSON.stringify({ email: email })
        const res = await axios.post(URL + "/users/email", json,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getNRP() {
    try {
        const res = await axios.get(URL + "/nrp");
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function clearNRP() {
    try {
        const res = await axios.get(URL + "/leads/clear");
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getNRPCount() {
    try {
        const res = await axios.get(URL + "/nrp/count");
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function createCollaborator(json) {
    try {
        const res = await axios.post(URL + "/users", json,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getLeadsDepartementCount(json) {
    try {
        const res = await axios.post(URL + "/leads/departement/count", json,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function updateLead(id, json) {
    try {
        const res = await axios.post(URL + "/leads/" + id, json,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );    
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function addLeads(id, json) {
    try {
        const res = await axios.post(URL + "/leads/user/" + id, json,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );    
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getCollaborators(id) {
    try {
        const res = await axios.get(URL + "/collaborators/" + id);
        return (res);
    } catch (err) {
        console.error(err);
    }
}