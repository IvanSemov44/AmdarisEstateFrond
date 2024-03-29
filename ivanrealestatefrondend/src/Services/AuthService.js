// const baseUrl = "https://localhost:7125";
// const baseUrl = "http://ivanrealestate.azurewebsites.net";
import { baseUrl } from "./BaseUrl";

export const login = async (loginData) => {
    const res = await fetch(`${baseUrl}/api/authentication/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    });
    return await res.json();
};

export const register = async (loginData) => {
    const res = await fetch(`${baseUrl}/api/authentication`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    });
    return await res.json();
};

