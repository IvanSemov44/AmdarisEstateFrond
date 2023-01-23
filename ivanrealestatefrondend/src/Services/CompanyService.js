const baseUrl = "https://localhost:7125";

export const getAll = async () => {
    const res = await fetch(`${baseUrl}/api/companies`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/companies/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const create = async (data) => {
    const res = await fetch(`${baseUrl}/api/companies`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};

export const update = async (id, data) => {
    const res = await fetch(`${baseUrl}/api/companies/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};

export const deleteCompany = async (id) => {
    const res = await fetch(`${baseUrl}/api/companies/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}