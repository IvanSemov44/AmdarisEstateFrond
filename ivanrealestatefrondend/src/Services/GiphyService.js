const key = "SvZdXBNkeqka0kFflLjp95Kylo0XmYWo";

export const getAll = async () => {
    const res = await fetch(`http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${key}&limit=5`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (id) => {
    const res = await fetch(`http://api.giphy.com/v1/gifs/${id}?api_key=${key}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const get = async (id) => {
    const res = await fetch(`https://api.giphy.com/v1/gifs`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

//http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5