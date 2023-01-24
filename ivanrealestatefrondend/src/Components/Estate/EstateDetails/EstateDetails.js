import { useContext, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Fab,
    Button,
    TextField,
    Grid,
    Dialog,
    DialogTitle,
    DialogActions
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
import { Spinner } from "../../Common/Spinner/Spinner";
import CreateMessage from "../../Message/CreateMessage/CreateMessage";
import { AuthContext } from "../../../contexts/AuthContext";

const EstateDetails = () => {
    const { user } = useContext(AuthContext);

    const { estateId } = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const estate = useGetEstateById(estateId);

    const city = useGetCityById(estate.cityId);
    const country = useGetCountryById(estate.countryId);
    const currency = useGetCurrencyById(estate.curencyId);
    const estateType = useGetEstateTypById(estate.estateTypeId);

    const ready =
        city !== undefined &&
        country !== undefined &&
        currency !== undefined &&
        estateType !== undefined &&
        estate !== undefined;

    const elementSellOrRent = estate.sell ? "Sell" : "Rent";

    const deleteEstate = () => estateService.deleteEstate(estate.estateId, user.token)
        .then(navigate(`/catalog`));


    const owner = user.id === estate.ownerId ? true : false;

    return (
        <>
            {ready ?

                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    direction="row"
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item sx={{ ml: 4 }} xs={4}>
                        {estate.images !== undefined && estate.images.length !== 0
                            ? <ImageShow images={estate.images} />
                            : <Box
                                component="img"
                                sx={{
                                    height: 355,
                                    display: 'block',
                                    overflow: 'hidden',
                                    width: 500,
                                    borderRadius: 5
                                }}
                                src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg"
                                alt="No Image"
                            />}
                        {owner
                            ? <Link to={`/editEstate/${estate.estateId}/images`}>
                                <Button sx={{ m: 3 }} variant="outlined" color="primary" >edit images</Button>
                            </Link>
                            : <></>}

                    </Grid>

                    <Grid item sx={{ mr: -4 }} xs={8}>

                        <Box sx={{ m: 2, mx: 8 }}>

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                value={elementSellOrRent}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Country"
                                value={country.countryName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="City"
                                value={city.cityName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Neighborhood"
                                value={estate.neighborhood}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Address"
                                value={estate.address}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Type"
                                value={estateType.typeName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Price"
                                value={estate.price}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Currency"
                                value={currency.currencyName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Rooms"
                                value={estate.rooms}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Floor"
                                value={estate.floor}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Area"
                                value={estate.estateArea}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Year Of Creation"
                                value={estate.yearOfCreation}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            <TextField
                                sx={{ m: 2 }}
                                focused
                                label="Extras"
                                defaultValue={estate.extras}
                                multiline
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                            <TextField
                                focused
                                sx={{ m: 2 }}
                                label="Description"
                                value={estate.description}
                                multiline
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />

                            {owner
                                ? <Box sx={{ '& button': { m: 1 } }}>
                                    <Link to={`/editEstate/${estate.estateId}`}>
                                        <Fab color="primary" aria-label="edit">
                                            <EditIcon />
                                        </Fab>
                                    </Link>

                                    <Fab color="primary" aria-label="delete" type="button" onClick={() => setOpen(true)}>
                                        <DeleteIcon />
                                    </Fab>

                                    <Dialog
                                        open={open}
                                        onClose={() => setOpen(false)}
                                    >
                                        <DialogTitle >
                                            {"Are you sure?"}
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button onClick={() => setOpen(false)}>No</Button>
                                            <Button onClick={deleteEstate} autoFocus>
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                                : <></>}
                        </Box>
                    </Grid>
                    <CreateMessage owner={estate.ownerId} />
                </Grid>
                : <Spinner />}
        </>
    );
}

export default EstateDetails;