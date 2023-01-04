import {useState,useEffect} from 'react';

import * as countryService from '../Services/CountryService';

export default function useGetCountries(){
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        let ignore = false;
        countryService.getAll()
            .then(result => {
                if (!ignore) {
                    setCountries(result)
                }
            })
        return () => {
            ignore = true;
        }
    }, []);

    return countries;
}