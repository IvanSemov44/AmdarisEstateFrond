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
    pageNumber, city, country, currency, estateType, year, price, floor, rooms, area,isSell
) => {
    const res = await fetch(`${baseUrl}/api/estates/page?` +
        `pageNumber=${pageNumber}` +
        `&pageSize=5` +
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
        `&maxrooms=${rooms[1]}`+
        `&minarea=${area[0]}`+
        `&maxarea=${area[1]}`+
        `&sell=${isSell}`
        , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

    const contentType = res.headers.get('X-Pagination');
    // console.log(contentType);
    const returnValue = await res.json();
    // console.log(returnValue);
    const data = {
        contentType: contentType,
        returnValue: returnValue
    }
    return data;
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

export const Create = async (data) => {
    const res = await fetch(`${baseUrl}/api/estates`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}


export const Update = async (data) => {
    const res = await fetch(`${baseUrl}/api/estates/${data.estateId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};


export const deleteEstate = async (estateId) => {
    const res = await fetch(`${baseUrl}/api/estates/${estateId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}