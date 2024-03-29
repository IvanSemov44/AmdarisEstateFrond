// const baseUrl = "https://localhost:7125/api/estates/";
import { baseUrl } from "./BaseUrl";



export const getAll = async (estateId) => {
    const res = await fetch(`${baseUrl}/api/estates/${estateId}/images`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (estateId, imageId) => {
    const res = await fetch(`${baseUrl}/api/estates/${estateId}/images/${imageId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};


export const create = async (estateId, imageData) => {
    const res = await fetch(`${baseUrl}/api/estates/${estateId}/images`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData)
    });
    return await res.json();
};

export const update = async (estateId, imageId, imageData) => {
    const res = await fetch(`${baseUrl}/api/estates/${estateId}/images/${imageId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData)
    });
    return await res.json();
};

export const deleteImage = async (estateId, imageId) => {
    const res = await fetch(`${baseUrl}/api/estates/${estateId}/images/${imageId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}
