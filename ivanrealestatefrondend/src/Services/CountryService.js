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

export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/countries/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const create = async (countryName) => {
    const res = await fetch(`${baseUrl}/api/countries`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(countryName)
    });
    return await res.json();
};

export const update = async (country, countryName) => {
    const res = await fetch(`${baseUrl}/api/countries/${country.countryId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(countryName)
    });
    return await res.json();
};

export const deleteCountry = async (countryId) => {
    const res = await fetch(`${baseUrl}/api/countries/${countryId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}