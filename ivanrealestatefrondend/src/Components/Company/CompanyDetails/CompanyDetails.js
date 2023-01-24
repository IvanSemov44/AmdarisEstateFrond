import {  useParams } from "react-router-dom";

import useGetCityById from "../../../CustemHooks/CustemCityHooks/useGetCityById";
import useGetCountryById from "../../../CustemHooks/CustemCountryHooks/useGetCountryById";
import useGetCompanyById from "../../../CustemHooks/CustemCompanyHooks/useGetCompanyById";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";

const CompanyDetails = () => {
    const { companyId } = useParams();

    const company = useGetCompanyById(companyId);


    const city = useGetCityById(company.companyCityId);
    const country = useGetCountryById(company.companyCountryId);

    const ready =
        city !== undefined &&
        country !== undefined &&
        company !== undefined;
    console.log(company);

    return (
        <>
            {ready
                ?
                <Grid
                    sx={{ m: 5 }}
                    container
                    alignItems="center"
                    justify="center"
                    direction="row"
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item sx={{ ml: 4 }} xs={4}>
                        {/* {company.images !== undefined && company.images.length !== 0
                            ? <ImageShow images={company.images} />
                            : */}
                             <Box
                                component="img"
                                sx={{
                                    height: 355,
                                    display: 'block',
                                    overflow: 'hidden',
                                    width: 500,
                                    borderRadius: 5
                                }}
                                src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg"
                                alt="No Image"
                            />
                            {/* // } */}
                        {/* <Link to={`/companyCatalog/${company.id}/images`}>
                            <Button sx={{ m: 3 }} variant="outlined" color="primary" >edit images</Button>
                        </Link> */}
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={5}>
                        <Box sx={{ m: 2, mx: 0 }}>
                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Name"
                                value={company.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Address"
                                value={company.address}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Description"
                                value={company.description}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="City"
                                value={city.cityName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Country"
                                value={country.countryName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </Box>
                    </Grid>
                </Grid>



                : <></>}
        </>
    )
}

export default CompanyDetails;