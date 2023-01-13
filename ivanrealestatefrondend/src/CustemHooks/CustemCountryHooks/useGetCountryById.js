import { useState, useEffect } from 'react';

import * as countryService from '../../Services/CountryService';

export default function useGetCountryById(countryId) {
    const [country, setCountry] = useState([]);

    useEffect(() => {
        let ignore = false;
        countryService.getById(countryId)
            .then(result => {
                if (!ignore) {
                    setCountry(result)
                }
            })
        return () => {
            ignore = true;
        }
    }, [countryId]);

    return country;
}