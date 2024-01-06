import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

//const URL = "http://127.0.0.1:8080"
const URL = process.env.HOST_URL;

const axiosInstance = axios.create({
    baseURL: URL
});

export async function getLeads() {
    try {
        const res = await axiosInstance.get("leads");
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getManagerLeads(id) {
    try {
        const res = await axiosInstance.get("leads/manager/" + id);
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getUserLeads(id) {
    try {
        const res = await axiosInstance.get("leads/user/" + id);
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getUser(id) {
    try {
        const res = await axiosInstance.get("users/" + id);
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getUserEmail(email) {
    try {
        const json = JSON.stringify({ email: email })
        const res = await axiosInstance.post("users/email", json,
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
        const res = await axiosInstance.get("nrp");
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function clearNRP() {
    try {
        const res = await axiosInstance.get("leads/clear");
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function getNRPCount() {
    try {
        const res = await axiosInstance.get("nrp/count");
        return (res);
    } catch (err) {
        console.error(err);
    }
}

export async function createCollaborator(json) {
    try {
        const res = await axiosInstance.post("users", json,
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
        const res = await axiosInstance.post("leads/departement/count", json,
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
        const res = await axiosInstance.post("leads/" + id, json,
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
        const res = await axiosInstance.post("leads/user/" + id, json,
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
        const res = await axiosInstance.get("collaborators/" + id);
        return (res);
    } catch (err) {
        console.error(err);
    }
}