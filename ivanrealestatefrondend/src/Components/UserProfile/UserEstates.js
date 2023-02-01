import { Pagination } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as estateServices from '../../Services/EstateService';
import { Spinner } from "../Common/Spinner/Spinner";
import EstateCard from "../Estate/EstateCard/EstateCard";

const UserEstates = () => {
    const { userId } = useParams();
    const [page, setPage] = useState(1);
    const [pagin, setPagin] = useState([]);
    const [estates, setEstates] = useState([]);
    const [isEmptyEstates, setIsEmptyEstates] = useState(false);


    useEffect(() => {
        let ignore = false;
        estateServices.getEstateForUser(userId,page)
            .then(result => {
                if (!ignore) {
                    if (result.length === 0)
                        throw new Error();
                    setPagin(JSON.parse(result.contentType));
                    setEstates(result.returnValue);
                    setIsEmptyEstates(false)
                }
            })
            .catch(() => setIsEmptyEstates(true))
        return () => ignore = true;
    }, [userId,page])

    console.log(estates)

    const show = isEmptyEstates ? "none" : "flex"

    return (
        <>

            <Stack alignItems="center" spacing={2} sx={{ml:20,width:1200}} >
            {estates[0]
                ? <Box sx={{ display: `${show}`, flexWrap: 'wrap' }} >
                    {estates.map(x => <EstateCard key={x.estateId} estate={x} />)}
                </Box>
                : isEmptyEstates
                    ? <div></div>
                    : <Spinner></Spinner>
            }
            <Pagination
                sx={{ margin: 3 }}
                size="large"
                count={pagin.TotalPages}
                page={page}
                variant="outlined"
                color="primary"
                onChange={(e, v) => setPage(v)}
            />
        </Stack >
        </>
    )
}
export default UserEstates;