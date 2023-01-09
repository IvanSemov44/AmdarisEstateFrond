import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

import * as  cityService from "../../../Services/CityService";
import * as  estateTypeService from "../../../Services/EstateTypeService";
import * as  currencyService from "../../../Services/CurrencyService";
import * as  countryService from "../../../Services/CountryService";

import './EstateCard.css';
import { Link } from 'react-router-dom';


const EstateCard = ({
    estate
}) => {
    const [city, setCity] = useState({});
    const [estateType, setEstateType] = useState({});
    const [currency, setCurrency] = useState({});
    const [country, setCountry] = useState({});
    useEffect(() => {
        let ignore = false;
        estateTypeService.getById(estate.estateTypeId)
            .then(result => {
                if (!ignore) {
                    setEstateType(result);
                }
            });
        return () => {
            ignore = true;
        }
    }, [estate.estateTypeId]);

    useEffect(() => {
        let ignore = false;

        cityService.getById(estate.cityId)
            .then(result => {
                if (!ignore) {
                    setCity(result);
                }
            });
        return () => {
            ignore = true;
        }
    }, [estate.cityId]);

    useEffect(() => {
        let ignore = false;
        currencyService.getById(estate.curencyId)
            .then(result => {
                if (!ignore) {
                    setCurrency(result);
                }
            });
        return () => {
            ignore = true;
        }
    }, [estate.curencyId]);

    useEffect(() => {
        let ignore = false;
        countryService.getById(estate.countryId)
            .then(result => {
                if (!ignore) {
                    setCountry(result);
                }
            });
        return () => {
            ignore = true;
        }
    }, [estate.countryId]);

    let elementSellOrRent;

    if (estate.sell) {
        elementSellOrRent = "Sell";
    }
    else {
        elementSellOrRent = "Rent";
    }

    return (
        <Card sx={{ maxWidth: 345, margin: 1 }}>
            <CardActionArea >
                <Link to={`/catalog/${estate.estateId}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg"
                        alt="Estate"
                    />

                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <li className="list-item">Price: {estate.price}</li>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div className="first group">
                            <ol className="list-group">
                                <li className="list-item">{elementSellOrRent}</li>
                                <li className="list-item">Country: {country.countryName}</li>
                                <li className="list-item">City: {city.cityName}</li>
                                <li className="list-item">Address: {estate.address}</li>
                                <li className="list-item">Floor: {estate.floоr}</li>
                            </ol>
                        </div>
                        <div className="second group">
                            <ol className="list-group">
                                <li className="list-item">Currency: {currency.currencyName}</li>
                                <li className="list-item">Type: {estateType.typeName}</li>
                            </ol>
                        </div>
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    );
}

export default EstateCard;