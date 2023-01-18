import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import * as cityService from '../../Services/CityService';

const useFetchForCity = (defaultValue) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(true);
        cityService.getAll(user.token)
            .then(result => {
                setIsLoading(false);
                setData(Object.values(result))
            });
    }, []);

    return [data, setData, isLoading];
}

export default useFetchForCity;