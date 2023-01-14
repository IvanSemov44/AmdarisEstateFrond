import { useState, useEffect } from 'react';

import * as estateService from '../../Services/EstateService';

export default function useGetEstateById(estateId) {
    const [estate, setEstate] = useState({});

    useEffect(() => {
        let ignore = false;
        estateService.getById(estateId)
            .then(result => {
                if (!ignore) {
                    setEstate(result);
                }
            })
        return () => {
            ignore = true;
        }
    }, [estateId]);

    return estate;
}