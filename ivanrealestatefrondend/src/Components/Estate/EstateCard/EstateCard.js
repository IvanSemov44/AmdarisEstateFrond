import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

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
        estateTypeService.getById(estate.estateTypeId)
            .then(result => {
                setEstateType(result);
            });
    }, [estate.estateTypeId]);

    useEffect(() => {
        cityService.getById(estate.cityId)
            .then(result => {
                setCity(result);
            });
    }, [estate.cityId]);

    useEffect(() => {
        currencyService.getById(estate.curencyId)
            .then(result => {
                setCurrency(result);
            });
    }, [estate.curencyId]);

    useEffect(() => {
        countryService.getById(estate.countryId)
            .then(result => {
                setCountry(result);
            });
    }, [estate.countryId]);

    let elementSellOrRent;

    if (estate.sell) {
        elementSellOrRent = "Sell";
    }
    else {
        elementSellOrRent = "Rent";
    }

    return (
        <div className='estate-card'>
            {/* <img className='card-image' alt="EstateImage" src={resultImage} /> */}
            <img className='card-image' alt="EstateImage" src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg" />
            <div className="card-body">
                <div className="card-body-text">
                    {estate.Description}
                </div>
            </div>
            <div className="first group">
                <list className="list-group">
                    <li className="list-item">{elementSellOrRent}</li>
                    <li className="list-item">Country: {country.countryName}</li>
                    <li className="list-item">City: {city.cityName}</li>
                    <li className="list-item">Address: {estate.address}</li>
                    <li className="list-item">Floor: {estate.floоr}</li>
                </list>
            </div>
            <div className="second group">
                <list className="list-group">
                    <li className="list-item">Price: {estate.price}</li>
                    <li className="list-item">Currency: {currency.currencyName}</li>
                    <li className="list-item">Type: {estateType.typeName}</li>
                </list>
            </div>
            <div className="card-body-button">
                {/* <button className="card-body-link">Card Link</button> */}

                <Button variant="outlined">
                    <Link to={`/catalog/${estate.estateId}`}>
                        Details
                    </Link>
                </Button>
                {/* <button className="card-body-link">Another Link</button> */}
            </div>
        </div>
    );
}

export default EstateCard;