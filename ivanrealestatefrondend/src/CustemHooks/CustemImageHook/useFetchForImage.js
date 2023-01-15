import { useState, useEffect } from 'react';

import * as imageService from '../../Services/ImageService';

const useFetchForImage = (defaultValue, estateId) => {
    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        imageService.getAll(estateId)
            .then(result => {
                setIsLoading(false);
                setData(Object.values(result))
            });
    }, [estateId]);

    return [data, setData, isLoading];
}

export default useFetchForImage; 