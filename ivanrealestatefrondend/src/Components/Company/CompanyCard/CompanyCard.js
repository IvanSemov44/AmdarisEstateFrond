import { Card, CardActionArea, CardContent, CardMedia, ListItemText, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useGetCityById from '../../../CustemHooks/CustemCityHooks/useGetCityById';
import useGetCountryById from '../../../CustemHooks/CustemCountryHooks/useGetCountryById';
import useFetchForCompanyImage from "../../../CustemHooks/CustemImageHook/useFetchForCompanyImage";
import * as companyImageService from '../../../Services/CompanyImagesService';

const CompanyCard = ({
    company
}) => {
    const [companyImages, setCompanyImages] = useState([]);

    useEffect(() => {
        companyImageService.getAll(company.Id)
            .then(result => setCompanyImages(result));
    }, [company.Id])

    const city = useGetCityById(company.companyCityId);
    const country = useGetCountryById(company.companyCountryId);

    let companyImage;

    companyImages.length === 0
        ? companyImage = "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg"
        : companyImage = companyImages[0].imageUrl;

    const ready =
        city === undefined &&
        country === undefined &&
        companyImages === undefined

    return (
        <Stack alignItems="center" spacing={2}>
            <Card sx={{ minWidth: 250, maxWidth: 250, m: 1, mt: 4 }}>
                <CardActionArea >
                    <Link to={`/companyCatalog/${company.id}`}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={companyImage}
                            alt="Estate"
                        />
                    </Link>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <ListItemText>Name: {company.name}</ListItemText>
                            <ListItemText>Address: {company.address}</ListItemText>
                            <ListItemText>City: {city.cityName}</ListItemText>
                            <ListItemText>Country: {country.countryName}</ListItemText>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Stack>
    )
}

export default CompanyCard;