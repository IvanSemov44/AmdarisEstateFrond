

// const baseUrl = "https://localhost:7125";
import { baseUrl } from "./BaseUrl";

export const getAll = async (owner) => {
    const res = await fetch(`${baseUrl}/api/owner/${owner}/messages`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (owner, id) => {
    const res = await fetch(`${baseUrl}/api/owner/${owner}/messages/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};


export const create = async (owner, data) => {
    const res = await fetch(`${baseUrl}/api/owner/${owner}/messages`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};

export const update = async (owner, id, data) => {
    const res = await fetch(`${baseUrl}/api/owner/${owner}/messages/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};

export const deleteMessage = async (owner, id) => {
    const res = await fetch(`${baseUrl}/api/owner/${owner}/messages/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

