import { useState, useEffect } from 'react';

import * as companyService from '../../Services/CompanyService';

export default function useGetCompanyById(companyId) {
    const [company, setCompany] = useState({});

    useEffect(() => {
        let ignore = false;
        companyService.getById(companyId)
            .then(result => {
                if (!ignore) {
                    setCompany(result);
                }
            })
        return () => {
            ignore = true;
        }
    }, [companyId]);

    return company;
}