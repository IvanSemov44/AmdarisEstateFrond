import { Link, useNavigate, useParams } from "react-router-dom";

import '../EstateDetails/EstateDetails.css';

import {
    Box,
    Fab,
    Button,
    ListItem,
    TextField
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
        <Box sx={{ m: 2, mx: 8 }}>

            {estate.images !== undefined && estate.images.length !== 0
                ? <ImageShow images={estate.images} />
                : <Box
                    component="img"
                    sx={{
                        height: 355,
                        display: 'block',
                        overflow: 'hidden',
                        width: 500,
                    }}
                    src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg"
                    alt="No Image"
                />}
            <Link to={`/editEstate/${estate.estateId}/images`}>
                <Button variant="outlined" color="primary" >edit images</Button>
            </Link>

            <TextField
                sx={{ m: 2 }}
                defaultValue={elementSellOrRent}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Country"
                value={country.countryName}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="City"
                defaultValue={city.cityName}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            
            <TextField
                sx={{ m: 2 }}
                label="Neighborhood"
                defaultValue={estate.neighborhood}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Address"
                defaultValue={estate.address}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Price"
                defaultValue={estate.price}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Currency"
                defaultValue={currency.currencyName}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Type"
                defaultValue={estateType.typeName}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Rooms"
                defaultValue={estate.rooms}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Floor"
                defaultValue={estate.floor}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Area"
                defaultValue={estate.estateArea}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Year Of Creation"
                defaultValue={estate.yearOfCreation}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <TextField
                sx={{ m: 2 }}
                label="Extras"
                defaultValue={estate.extras}
                multiline
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField
            sx={{m:2}}
                label="Description"
                defaultValue={estate.description}
                multiline
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <ListItem>{elementSellOrRent}</ListItem>
            
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
        </Box>
    );
}

export default EstateDetails;