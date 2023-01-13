import { useState, useEffect } from 'react';

import * as cityService from '../../Services/CityService'

export default function useGetCountryById(cityId) {
    const [country, setCountry] = useState([]);

    useEffect(() => {
        let ignore = false;
        cityService.getById(cityId)
            .then(result => {
                if (!ignore) {
                    setCountry(result)
                }
            })
        return () => {
            ignore = true;
        }
    }, [cityId]);

    return country;
}