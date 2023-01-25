import { Box, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';

import * as estatesSevice from '../../Services/EstateService';
import { Spinner } from '../Common/Spinner/Spinner';
import EstateCard from '../Estate/EstateCard/EstateCard';

const Home = () => {
    const [estates, setEstates] = useState([]);


    useEffect(() => {
        let ignore = false;
        estatesSevice.getByPage(
            "", "", "", "", "", "", "", "", "", "", "", "", "created", "desc", 4
        )
            .then(result => {
                if (!ignore) {
                    if (result.returnValue.length === 0)
                        throw new Error();

                    setEstates(result.returnValue);
                }
            });
        return () => {
            ignore = true;
        };
    }, []);

    console.log(estates);


    const image = "https://wallpaperaccess.com/full/1899348.jpg"
    return (
        <Box sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: 1000
        }}
        // display="flex"
        // alignItems="center"
        // justifyContent="center"
        >
            <Grid container
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Grid item sx={{ m: 10 }}>
                    <Typography sx={{
                        fontSize: 50,
                        backgroundColor: "#0a1828",
                        opacity: 0.7,
                        color: "0A1828",
                        width: 700,
                        borderRadius: 4,
                        p: 2,
                    }}
                    >
                        Welcome to Ivan Real Estate
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={{
                        fontSize: 20,
                        backgroundColor: "#0a1828",
                        color: "#8505c499",
                        fontWeight: "bold",
                        width: 250,
                        borderRadius: 4,
                        p: 2,
                        ml:28
                    }}
                    >
                        Last Add Real Estates
                    </Typography>
                </Grid>
                <Grid item>
                    <Stack alignItems="center" spacing={2} >
                        {estates[0]
                            ? <Box sx={{ display: "flex", flexWrap: 'wrap' }} >
                                {estates.map(x => <EstateCard key={x.estateId} estate={x} />)}
                            </Box>
                            : <Spinner />
                        }
                    </Stack >
                </Grid>
            </Grid>
        </Box >
    );
}

export default Home;