import { useState, useEffect } from 'react';

import * as estateTypeSevice from '../../Services/EstateTypeService';

export default function useGetEstateTypById(estateTypeId) {
    const [estateType, setEstateType] = useState({});

    useEffect(() => {
        let ignore = false;
        estateTypeSevice.getById(estateTypeId)
            .then(result => {
                if (!ignore) {
                    setEstateType(result)
                }
            })
        return () => {
            ignore = true;
        }
    }, [estateTypeId]);

    return estateType;
}