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

export const create = async (currencyName) => {
    const res = await fetch(`${baseUrl}/api/currencies`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currencyName)
    });
    return await res.json();
};

export const update = async (currency, currencyName) => {
    const res = await fetch(`${baseUrl}/api/currencies/${currency.currencyId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currencyName)
    });
    return await res.json();
};

export const deleteCurrency = async (currencyId) => {
    const res = await fetch(`${baseUrl}/api/currencies/${currencyId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}