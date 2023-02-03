import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Stack,
    Typography,
    ListItemText
} from "@mui/material";

import * as companyImageService from '../../../Services/CompanyImagesService';
import useGetCityById from '../../../CustemHooks/CustemCityHooks/useGetCityById';
import useGetCountryById from '../../../CustemHooks/CustemCountryHooks/useGetCountryById';

const CompanyCard = ({
    company
}) => {
    const [companyImages, setCompanyImages] = useState("");

    useEffect(() => {
        companyImageService.getAll(company.id)
            .then(result => {
                result.length === 0
                    ? setCompanyImages("https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg")
                    : setCompanyImages(result[0].imageUrl)
            });
    }, [company.id])

    const city = useGetCityById(company.companyCityId);
    const country = useGetCountryById(company.companyCountryId);

    return (
        <Stack alignItems="center" spacing={2}>
            <Card sx={{ minWidth: 250, maxWidth: 250, m: 1, mt: 4 }}>
                <CardActionArea >
                    <Link to={`/companyCatalog/${company.id}`}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={companyImages}
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