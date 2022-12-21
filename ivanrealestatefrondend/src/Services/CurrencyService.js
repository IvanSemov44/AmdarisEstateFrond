const baseUrl = "https://localhost:7125";

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