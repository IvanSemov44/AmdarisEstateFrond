import { useState, useEffect } from 'react';

import * as currencySevice from '../../Services/CurrencyService';

export default function useGetCurrency() {
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        let ignore = false;
        currencySevice.getAll()
            .then(result => {
                if (!ignore) {
                    setCurrencies(result)
                }
            })
        return () => {
            ignore = true;
        }
    }, []);

    return currencies;
}