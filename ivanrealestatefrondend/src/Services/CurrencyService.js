// const baseUrl = "https://localhost:7125";
import { baseUrl } from "./BaseUrl";

export const getAll = async () => {
    const res = await fetch(`${baseUrl}/api/currencies`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/currencies/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const create = async (currencyName,token) => {
    const res = await fetch(`${baseUrl}/api/currencies`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(currencyName)
    });
    return await res.json();
};

export const update = async (currency, currencyName,token) => {
    const res = await fetch(`${baseUrl}/api/currencies/${currency.currencyId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(currencyName)
    });
    return await res.json();
};

export const deleteCurrency = async (currencyId,token) => {
    const res = await fetch(`${baseUrl}/api/currencies/${currencyId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    return await res.json();
}