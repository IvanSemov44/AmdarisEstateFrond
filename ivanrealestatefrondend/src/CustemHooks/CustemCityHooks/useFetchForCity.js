import { useState, useEffect } from 'react';

import * as cityService from '../../Services/CityService';

const useFetchForCity = (defaultValue) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        cityService.getAll()
            .then(result => {
                setIsLoading(false);
                setData(Object.values(result))
            });
    }, []);

    return [data, setData, isLoading];
}

export default useFetchForCity;