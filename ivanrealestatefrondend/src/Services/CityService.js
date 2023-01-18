const baseUrl = "https://localhost:7125";

export const getAll = async (token) => {
    const res = await fetch(`${baseUrl}/api/cities`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    return await res.json();
};

export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/cities/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};


export const create = async (cityName) => {
    const res = await fetch(`${baseUrl}/api/cities`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cityName)
    });
    return await res.json();
};

export const Update = async (city,cityName) => {
    const res = await fetch(`${baseUrl}/api/cities/${city.cityId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cityName)
    });
    return await res.json();
};

export const deleteCity = async (cityId) => {
    const res = await fetch(`${baseUrl}/api/cities/${cityId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}