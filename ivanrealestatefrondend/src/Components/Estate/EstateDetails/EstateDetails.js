import { Link, useNavigate, useParams } from "react-router-dom";

import '../EstateDetails/EstateDetails.css';

import {
    Box,
    Fab,
    List,
    Button,
    ListItem
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ImageShow from "../../Image/ImageShow";

import useGetCityById from "../../../CustemHooks/CustemCityHooks/useGetCityById";
import useGetEstateById from "../../../CustemHooks/CustemEstateHooks/useGetEstateById";
import useGetCountryById from "../../../CustemHooks/CustemCountryHooks/useGetCountryById";
import useGetCurrencyById from "../../../CustemHooks/CustemCurrencyHooks/useGetCurrencyById";
import useGetEstateTypById from "../../../CustemHooks/CustemEstateTypeHooks/useGetEstateTypById";

import * as estateService from '../../../Services/EstateService';

const EstateDetails = () => {
    const { estateId } = useParams();
    const navigate = useNavigate();

    const estate = useGetEstateById(estateId);
    console.log(estate);
    const city = useGetCityById(estate.cityId);
    const country = useGetCountryById(estate.countryId);
    const currency = useGetCurrencyById(estate.curencyId);
    const estateType = useGetEstateTypById(estate.estateTypeId);

    let elementSellOrRent;

    if (estate.sell) {
        elementSellOrRent = "Sell";
    }
    else {
        elementSellOrRent = "Rent";
    }
    const deleteEstate = () => {
        estateService.deleteEstate(estate.estateId)
            .then(navigate(`/catalog`));
    };

    return (
        <div className="estateDetails">
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                aria-label="EstateDetails"
            >
                {estate.images !== undefined && estate.images.length !== 0
                    ? <ImageShow images={estate.images} />
                    : <Box
                        component="img"
                        sx={{
                            height: 355,
                            display: 'block',
                            maxWidth: 1000,
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg"
                        alt="No Image"
                    />}
                <Link to={`/editEstate/${estate.estateId}/images`}>
                    <Button variant="outlined" color="primary" >edit images</Button>
                </Link>
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
                <ListItem>Area: {estate.estateArea}</ListItem>
                <ListItem>Year Of Creation: {estate.yearOfCreation}</ListItem>
                <ListItem>Extras: {estate.extras}</ListItem>
                <Box sx={{ '& button': { m: 1 } }}>
                    <Link to={`/editEstate/${estate.estateId}`}>
                        <Fab color="primary" aria-label="edit">
                            <EditIcon />
                        </Fab>
                    </Link>

                    <Fab color="primary" aria-label="delete" type="button" onClick={deleteEstate}>
                        <DeleteIcon />
                    </Fab>
                </Box>
            </List>
        </div>

    );
}

export default EstateDetails;