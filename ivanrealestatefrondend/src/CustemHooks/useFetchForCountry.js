import { useEffect, useState } from "react";

import * as countryService from '../Services/CountryService';

const useFetchForCountry = (defaultValue) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        countryService.getAll()
            .then(result => {
                setIsLoading(false);
                setData(Object.values(result));
            });
    }, [])
    
    return [data, setData, isLoading];
}

export default useFetchForCountry;