import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import * as cityService from '../../Services/CityService';

export default function useGetCities() {
    const [cities, setCities] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        let ignore = false;
        cityService.getAll(user.token)
            .then(result => {
                if (!ignore) {
                    setCities(result);
                }
            })
        return () => {
            ignore = true;
        }
    }, [user.token])

    return cities;
}
