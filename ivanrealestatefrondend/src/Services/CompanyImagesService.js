// const baseUrl = "https://localhost:7125/api/companies/";

import { baseUrl } from "./BaseUrl";

export const getAll = async (companyId) => {
    const res = await fetch(`${baseUrl}/api/companies/${companyId}/images`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (companyId, imageId) => {
    const res = await fetch(`${baseUrl}/${companyId}/images/${imageId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};


export const create = async (companyId, imageData) => {
    const res = await fetch(`${baseUrl}/${companyId}/images`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData)
    });
    return await res.json();
};

export const update = async (companyId, imageId, imageData) => {
    const res = await fetch(`${baseUrl}/${companyId}/images/${imageId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData)
    });
    return await res.json();
};

export const deleteImage = async (companyId, imageId) => {
    const res = await fetch(`${baseUrl}/${companyId}/images/${imageId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}
