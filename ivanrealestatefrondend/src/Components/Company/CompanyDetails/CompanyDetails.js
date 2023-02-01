import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

import {
    Box,
    Tab,
    Tabs,
    Grid,
    AppBar,
    Button,
    useTheme,
    TextField
} from "@mui/material";

import ImageShow from "../../Image/ImageShow";

import useGetCityById from "../../../CustemHooks/CustemCityHooks/useGetCityById";
import useGetCountryById from "../../../CustemHooks/CustemCountryHooks/useGetCountryById";
import useGetCompanyById from "../../../CustemHooks/CustemCompanyHooks/useGetCompanyById";

import * as companyImageService from '../../../Services/CompanyImagesService';
import * as estateServivce from '../../../Services/EstateService'
import { Spinner } from "../../Common/Spinner/Spinner";
import EstateCard from "../../Estate/EstateCard/EstateCard";
import UserCard from "../../UserProfile/UserCard";


const CompanyDetails = () => {
    const theme = useTheme();
    const { companyId } = useParams();
    const [value, setValue] = useState(0);
    const [companyImages, setCompanyImages] = useState([]);
    const [estates, setEstates] = useState([]);
    const [isEmptyEstate, setIsEmptyEstate] = useState(false);

    const company = useGetCompanyById(companyId);

    useEffect(() => {
        companyImageService.getAll(companyId)
            .then(result => setCompanyImages(result));
    }, [companyId])
    console.log(company);

    useEffect(() => {
        if (company.employees !== undefined) {
            let ids;
            company.employees.forEach(element => {
                ids = ids + `,${element.id}`
            })
            estateServivce.getEstateForUser(ids)
                .then(result => {
                    setEstates(result.returnValue)
                    setIsEmptyEstate(true);
                })

        };
    }, [company.employees, company, companyImages]);
    console.log("estate", estates);

    const city = useGetCityById(company.companyCityId);
    const country = useGetCountryById(company.companyCountryId);

    const ready =
        city !== undefined &&
        country !== undefined &&
        company !== undefined;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };

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
                        {companyImages !== undefined && companyImages.length !== 0
                            ? <ImageShow images={companyImages} />
                            : <Box
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
                            />}
                        <Link to={`/editcompany/${companyId}/images`}>
                            <Button sx={{ m: 3 }} variant="outlined" color="primary" >edit images</Button>
                        </Link>

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
                    <Grid
                        conteinter
                        alignItems="center"
                        justify="center">
                        <Grid item>

                            <AppBar
                                sx={{ m: 10, width: 800, ml: 45, borderRadius: 2 }}
                                alignItems="center"
                                justify="center"
                                justifyContent="center"
                                direction="row"
                                position="static"
                                color="default">
                                <Tabs
                                    sx={{ width: 800 }}
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="action tabs example"
                                >
                                    <Tab label="Employees" />
                                    <Tab label="Real Estates" />
                                </Tabs>
                            </AppBar>
                        </Grid>

                        <Grid item>
                            <SwipeableViews
                                sx={{ m: 10 }}
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <Box
                                    conteiner
                                    alignItems="center"
                                    justify="center"
                                    direction="row"
                                    sx={{ m: 10 }}
                                    value={value}
                                    index={0}
                                    dir={theme.direction}
                                >{company.employees !== undefined
                                    ? company.employees.map(x =>
                                        <UserCard
                                            key={x.id}
                                            user={x} />)
                                    : <></>}
                                </Box>
                                <Box
                                    sx={{ m: 10,ml:25 }}
                                    value={value}
                                    index={1}
                                    dir={theme.direction}
                                >
                                    {estates[0]
                                        ? <Box sx={{ display: `flex`, flexWrap: 'wrap' }} >
                                            {estates.map(x => <EstateCard key={x.estateId} estate={x} />)}
                                        </Box>
                                        : isEmptyEstate
                                            ? <div></div>
                                            : <Spinner></Spinner>
                                    }
                                </Box>
                            </SwipeableViews>
                        </Grid>
                    </Grid>
                </Grid>
                : <Spinner></Spinner>}
        </>
    )
}

export default CompanyDetails;