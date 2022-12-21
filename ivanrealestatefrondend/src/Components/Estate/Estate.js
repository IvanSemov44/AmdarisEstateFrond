import { useState,useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import * as  cityService from "../../Services/CityService";
import * as  estateTypeService from "../../Services/EstateTypeService";
import * as  currencyService from "../../Services/CurrencyService";
import * as  countryService from "../../Services/CountryService";


const Estate = ({
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
    }, []);

    useEffect(() => {
        cityService.getById(estate.cityId)
            .then(result => {
                setCity(result);
            });
    }, []);

    useEffect(() => {
        currencyService.getById(estate.curencyId)
            .then(result => {
                setCurrency(result);
            });
    }, []);

    useEffect(() => {
        countryService.getById(estate.countryId)
            .then(result => {
                setCountry(result);
            });
    }, []);

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
                <Card.Text>
                    {estate.Description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{estate.address}</ListGroup.Item>
                <ListGroup.Item>{estate.floоr}</ListGroup.Item>
                <ListGroup.Item>{city.cityName}</ListGroup.Item>
                <ListGroup.Item>{estateType.typeName}</ListGroup.Item>
                <ListGroup.Item>{currency.currencyName}</ListGroup.Item>
                <ListGroup.Item>{country.countryName}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default Estate;