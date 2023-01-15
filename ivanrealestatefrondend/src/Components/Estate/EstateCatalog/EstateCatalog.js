import { useEffect, useState } from 'react';
import { Pagination, Stack, Box, Typography, Grid } from '@mui/material';

import EstateCard from '../EstateCard/EstateCard';
import { Spinner } from '../../Common/Spinner/Spinner';

import * as estatesSevice from '../../../Services/EstateService';

const EstateCatalog = () => {
    const [estates, setEstate] = useState([]);
    const [pagin, setPagin] = useState([]);
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        let ignore = false;
        estatesSevice.getByPage(page)
            .then(result => {
                if (!ignore) {
                    setPagin(JSON.parse(result.contentType));
                    setEstate(result.returnValue);
                }
            });
        return () => {
            ignore = true;
        };
    }, [page]);
    console.log(pagin.CurrentPage);

    return (
        <Stack alignItems="center" spacing={2} >
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {estates.map(x => <EstateCard key={x.estateId} estate={x} />)}
            </Box>
            <Typography>Page: {page}</Typography>
            <Pagination
                sx={{ margin: 3 }}
                size="large"
                count={pagin.TotalPages}
                page={page}
                variant="outlined"
                color="primary"
                onChange={handleChange}
            />
        </Stack >
    )
}

export default EstateCatalog;