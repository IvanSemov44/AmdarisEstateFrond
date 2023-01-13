import { useState, useEffect } from 'react';

import * as currencySevice from '../../Services/CurrencyService';

export default function useGetCurrencyById(currencyId) {
    const [currency, setCurrency] = useState({});

    useEffect(() => {
        let ignore = false;
        currencySevice.getById(currencyId)
            .then(result => {
                if (!ignore) {
                    setCurrency(result)
                }
            })
        return () => {
            ignore = true;
        }
    }, [currencyId]);

    return currency;
}