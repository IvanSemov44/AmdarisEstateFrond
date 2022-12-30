import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as estateService from '../../../Services/EstateService';
import * as  cityService from "../../../Services/CityService";
import * as  estateTypeService from "../../../Services/EstateTypeService";
import * as  currencyService from "../../../Services/CurrencyService";
import * as  countryService from "../../../Services/CountryService";

import '../EstateDetails/EstateDetails.css';

const EstateDetails = () => {
    const { estateId } = useParams();

    const [estate, setEstate] = useState({});
    const [city, setCity] = useState({});
    const [estateType, setEstateType] = useState({});
    const [currency, setCurrency] = useState({});
    const [country, setCountry] = useState({});


    useEffect(() =>
        estateService.getById(estateId)
            .then(result => {
                setEstate(result);
            }),
        []);

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


    console.log(estate);
    console.log(city);

    let elementSellOrRent;

    if (estate.sell) {
        elementSellOrRent = "Sell";
    }
    else {
        elementSellOrRent = "Rent";
    }

    // address: "Bl.407"
    // changed: "2022-11-29T12:16:19.5468204"
    // cityId: "25db1981-7501-45bd-e3bd-08dacfa02b27"
    // countryId: "f8c5ce88-54ee-4feb-9605-08dad0620656"
    // created: "2022-11-29T12:16:19.5468059"
    // curencyId: "4bb67d01-13cb-47d5-d499-08dad1453af0"
    // description: "Golqm e"
    // estateId: "387f6683-f763-4e0d-b35c-08dad2038670"
    // estateTypeId: "f9fec971-f109-4679-0c67-08dad1555662"
    // extras: "asansior i parking magazin"
    // "floоr": 7
    // images: Array(3)[{… }, {… }, {… }]
    // neighborhood: "Vladislavovo"
    // price: 199000
    // rooms: 5
    // sell: true
    // yearOfCreation: 1970

    return (
        <div className = "estateDetails"> 
            <h2>{elementSellOrRent}</h2>
            <p>Country: {country.countryName}</p>
            <p>City: {city.cityName}</p>
            <p>neighborhood: {estate.neighborhood}</p>
            <p>Address: {estate.address}</p>
            <p>Price: {estate.price}</p>
            <p>Currency: {currency.currencyName}</p>
            <p>Type: {estateType.typeName}</p> 
            <p>Rooms: {estate.rooms}</p>
            <p>Floor: {estate.floоr}</p>
            <p>Year Of Creation: {estate.yearOfCreation}</p>
            <p>Extras: {estate.extras}</p>
        </div>
    );
}

export default EstateDetails;