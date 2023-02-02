// const baseUrl = "https://localhost:7125";
import { baseUrl } from "./BaseUrl";

export const getAll = async () => {
    const res = await fetch(`${baseUrl}/api/estatetypes`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/estatetypes/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const create = async (typeName, token) => {
    const res = await fetch(`${baseUrl}/api/estatetypes`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(typeName)
    });
    return await res.json();
};

export const update = async (estateType, typeName,token) => {
    const res = await fetch(`${baseUrl}/api/estatetypes/${estateType.estateTypeId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(typeName)
    });
    return await res.json();
};

export const deleteEstateType = async (estateTypeId,token) => {
    const res = await fetch(`${baseUrl}/api/estatetypes/${estateTypeId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    return await res.json();
}