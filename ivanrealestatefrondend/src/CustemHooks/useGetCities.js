import { useEffect, useState } from "react";

import * as cityService from '../Services/CityService';

export default function useGetCities() {
    const [cities, setCities] = useState([]);

    useEffect(()=>{
        let ignore = false;
        cityService.getAll()
        .then(result=>{
            if(!ignore){
                setCities(result);
            }
        })
        return ()=>{
            ignore = true;
        }
    }, [])

    return cities;
}
