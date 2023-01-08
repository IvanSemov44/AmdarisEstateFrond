import { useEffect, useState } from "react";

import * as currencyService from '../Services/CurrencyService';

const useFetchForCurrency = (defaultValue) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        currencyService.getAll()
            .then(result => {
                setIsLoading(false);
                setData(Object.values(result));
            });
    }, []);
    return [data, setData, isLoading];
};

export default useFetchForCurrency;