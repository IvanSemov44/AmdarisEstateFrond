import { useEffect, useState } from "react";

import * as estateTypeService from '../Services/EstateTypeService';

const useFetchForEstateType = (defaultValue) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        estateTypeService.getAll()
            .then(result => {
                setIsLoading(false);
                setData(Object.values(result));
            });
    }, []);
    return [data, setData, isLoading];
};

export default useFetchForEstateType;