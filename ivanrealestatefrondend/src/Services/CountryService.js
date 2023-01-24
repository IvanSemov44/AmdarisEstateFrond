const baseUrl = "https://localhost:7125";

export const getAll = async () => {
    const res = await fetch(`${baseUrl}/api/countries`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (id,token) => {
    const res = await fetch(`${baseUrl}/api/countries/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token

        }
    });
    return await res.json();
};

export const create = async (countryName,token) => {
    const res = await fetch(`${baseUrl}/api/countries`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify(countryName)
    });
    return await res.json();
};

export const update = async (country, countryName,token) => {
    const res = await fetch(`${baseUrl}/api/countries/${country.countryId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify(countryName)
    });
    return await res.json();
};

export const deleteCountry = async (countryId,token) => {
    const res = await fetch(`${baseUrl}/api/countries/${countryId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token

        }
    });
    return await res.json();
}