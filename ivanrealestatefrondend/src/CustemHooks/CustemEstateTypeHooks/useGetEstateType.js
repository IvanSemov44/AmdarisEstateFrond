import { useState, useEffect } from 'react';

import * as estateTypeSevice from '../../Services/EstateTypeService';

export default function useGetEstateType() {
    const [estateTypes, setEstateTypes] = useState([]);

    useEffect(() => {
        let ignore = false;
        estateTypeSevice.getAll()
            .then(result => {
                if (!ignore) {
                    setEstateTypes(result)
                }
            })
        return () => {
            ignore = true;
        }
    }, []);

    return estateTypes;
}