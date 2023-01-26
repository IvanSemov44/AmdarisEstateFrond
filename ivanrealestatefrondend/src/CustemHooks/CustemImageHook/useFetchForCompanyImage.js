import { useState, useEffect } from 'react';

import * as companyImageService from '../../Services/CompanyImagesService';

const useFetchForCompanyImage = (defaultValue, companyId) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        companyImageService.getAll(companyId)
            .then(result => {
                setIsLoading(false);
                setData(Object.values(result))
            });
    }, [companyId]);

    return [data, setData, isLoading];
}

export default useFetchForCompanyImage; 