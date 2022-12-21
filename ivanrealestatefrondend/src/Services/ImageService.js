const baseUrl = "https://localhost:7125";

export const getById = async (estateId,imageId) => {
    const res = await fetch(`${baseUrl}/api/estates/${estateId}/images/${imageId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};