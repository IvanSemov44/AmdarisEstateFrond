const baseUrl = "https://localhost:7125";

export const getAll = () => {
    return fetch(`${baseUrl}/api/estates/page`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',}
        })
    .then(res=>res.json());
};