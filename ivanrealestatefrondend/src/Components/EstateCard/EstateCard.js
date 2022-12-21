import { useState,useEffect } from 'react';

import * as  cityService from "../../Services/CityService";
import * as  estateTypeService from "../../Services/EstateTypeService";
import * as  currencyService from "../../Services/CurrencyService";
import * as  countryService from "../../Services/CountryService";

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
    },[estate.estateTypeId] );

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

   console.log(estate.images)
    let resultImage;
    if (estate.images){
        resultImage = estate.images[2].imageUrl;
    }
    else{
        resultImage = null;
    }

    return (
        <div>
            <img alt="EstateImage" src={resultImage} />
            <div className = "card-body">
                <div className="card-body-text">
                    {estate.Description}
                </div>
            </div>
            <div className="list-group">
                <div className="list-item">{estate.address}</div>
                <div className="list-item">{estate.floоr}</div>
                <div className="list-item">{city.cityName}</div>
                <div className="list-item">{estateType.typeName}</div>
                <div className="list-item">{currency.currencyName}</div>
                <div className="list-item">{country.countryName}</div>
            </div>
            <div className = "card-body">
                <div className="card-body-link">Card Link</div>
                <div className = "card-body-link">Another Link</div>
            </div>
        </div>
    );
}

export default EstateCard;