import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { Spinner } from "../../Common/Spinner/Spinner";
import CompanyCard from "../CompanyCard/CompanyCard";
import * as companyService from '../../../Services/CompanyService';

const CompanyCatalog = () => {
    const [companies, setCompanies] = useState([]);
    const [isEmptyCompanies, setIsEmptyCompanies] = useState(false);


    useEffect(() => {
        let ignore = false;
        companyService.getAll()
            .then(result => {
                if (!ignore) {
                    if (result.length === 0)
                        throw new Error();

                    setCompanies(result);
                    setIsEmptyCompanies(false)
                }
            })
            .catch(() => setIsEmptyCompanies(true))
        return () => ignore = true;
    },[])


    const show = isEmptyCompanies ? "none" : "flex"

    return (
        <>
            {companies[0]
                ? <Box sx={{ display: `${show}`, flexWrap: 'wrap',m:10 }} >
                    {companies.map(x => <CompanyCard key={x.id} company={x} />)}
                </Box>
                : isEmptyCompanies
                    ? <div></div>
                    : <Spinner></Spinner>
            }
        </>
    )
}

export default CompanyCatalog;