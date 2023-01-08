const baseUrl = "https://localhost:7125";

export const getAll = async () => {
    const res = await fetch(`${baseUrl}/api/estatetypes`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/estatetypes/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const create = async (typeName) => {
    const res = await fetch(`${baseUrl}/api/estatetypes`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(typeName)
    });
    return await res.json();
};

export const update = async (estateType, typeName) => {
    const res = await fetch(`${baseUrl}/api/estatetypes/${estateType.estateTypeId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(typeName)
    });
    return await res.json();
};

export const deleteEstateType = async (estateTypeId) => {
    const res = await fetch(`${baseUrl}/api/estatetypes/${estateTypeId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}