const baseUrl = "https://localhost:7125";

export const getAll = () => {
    return fetch(`${baseUrl}/api/estatetypes`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json());
};

export const getById = (id) => {
    return fetch(`${baseUrl}/api/estatetypes/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json());
};