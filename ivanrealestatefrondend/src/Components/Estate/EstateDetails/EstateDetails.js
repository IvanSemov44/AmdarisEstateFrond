import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

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


    useEffect(() => {
        let ignore = false;
        estateService.getById(estateId)
            .then(result => {
                if (!ignore) {
                    setEstate(result);
                }
            })
        return () => {
            ignore = true;
        }
    }, [estateId]);

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
       <div className="estateDetails">
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                aria-label="EstateDetails"
            >
                <ListItem>{elementSellOrRent}</ListItem>
                <ListItem>Country: {country.countryName}</ListItem>
                <ListItem>City: {city.cityName}</ListItem>
                <ListItem>neighborhood: {estate.neighborhood}</ListItem>
                <ListItem>Address: {estate.address}</ListItem>
                <ListItem>Price: {estate.price}</ListItem>
                <ListItem>Currency: {currency.currencyName}</ListItem>
                <ListItem>Type: {estateType.typeName}</ListItem>
                <ListItem>Rooms: {estate.rooms}</ListItem>
                <ListItem>Floor: {estate.floоr}</ListItem>
                <ListItem>Year Of Creation: {estate.yearOfCreation}</ListItem>
                <ListItem   >Extras: {estate.extras}</ListItem>
            </List>
        </div>

    );
}

export default EstateDetails;