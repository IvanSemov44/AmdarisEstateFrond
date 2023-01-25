const baseUrl = "https://localhost:7125";

export const getAll = async () => {
    const res = await fetch(`${baseUrl}/api/estates/page`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getByPage = async (
    pageNumber, city, country, currency, estateType, year, price, floor, rooms, area, isSell, searchTerm, orderBy, desc,pageSize
) => {
    const res = await fetch(`${baseUrl}/api/estates/page?` +
        `pageNumber=${pageNumber}` +
        `&pageSize=${pageSize}` +
        `&city=${city}` +
        `&country=${country}` +
        `&currency=${currency}` +
        `&estateType=${estateType}` +
        `&minyear=${year[0]}` +
        `&maxyear=${year[1]}` +
        `&minprice=${price[0]}` +
        `&maxprice=${price[1]}` +
        `&minfloor=${floor[0]}` +
        `&maxfloor=${floor[1]}` +
        `&minrooms=${rooms[0]}` +
        `&maxrooms=${rooms[1]}` +
        `&minarea=${area[0]}` +
        `&maxarea=${area[1]}` +
        `&sell=${isSell}` +
        `&searchterm=${searchTerm}` +
        `&orderby=${orderBy + " " + desc}`
        , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

    const contentType = res.headers.get('X-Pagination');
    const returnValue = await res.json();
    return { contentType, returnValue }
};

export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/estates/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return await res.json();
};

export const Create = async (data,token) => {
    const res = await fetch(`${baseUrl}/api/estates`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token

        },
        body: JSON.stringify(data)
    });
    return await res.json();
}


export const Update = async (data,token) => {
    const res = await fetch(`${baseUrl}/api/estates/${data.estateId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};


export const deleteEstate = async (estateId,token) => {
    const res = await fetch(`${baseUrl}/api/estates/${estateId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    return await res.json();
}