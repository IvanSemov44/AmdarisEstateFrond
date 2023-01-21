import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

import {
    Box,
    Grid,
    Radio,
    Button,
    Select,
    MenuItem,
    TextField,
    Typography,
    InputLabel,
    RadioGroup,
    FormControl,
    FormHelperText,
    FormControlLabel,
} from "@mui/material"

import { Spinner } from '../../Common/Spinner/Spinner';

import useGetCities from '../../../CustemHooks/CustemCityHooks/useGetCities';
import useGetCurrency from '../../../CustemHooks/CustemCurrencyHooks/useGetCurrency';
import useGetCountries from '../../../CustemHooks/CustemCountryHooks/useGetCountries';
import useGetEstateType from '../../../CustemHooks/CustemEstateTypeHooks/useGetEstateType';

import useGetCityById from "../../../CustemHooks/CustemCityHooks/useGetCityById";
import useGetEstateById from "../../../CustemHooks/CustemEstateHooks/useGetEstateById";
import useGetCountryById from "../../../CustemHooks/CustemCountryHooks/useGetCountryById";
import useGetCurrencyById from "../../../CustemHooks/CustemCurrencyHooks/useGetCurrencyById";
import useGetEstateTypById from "../../../CustemHooks/CustemEstateTypeHooks/useGetEstateTypById";

import * as estateService from '../../../Services/EstateService';

const defaultValues = {
    address: "",
    description: "",
    extras: "",
    neighborhood: "",
    price: 0,
    estateArea: 0,
    floor: 3,
    rooms: 0,
    yearOfCreation: 2023,
    sell: true,
    cityId: "",
    countryId: "",
    estateTypeId: "",
    currencyId: "",
};

const EditEstate = () => {
    const { estateId } = useParams();

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(defaultValues);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const estate = useGetEstateById(estateId);

    const cities = useGetCities();
    const countries = useGetCountries();
    const currencies = useGetCurrency();
    const estateTypes = useGetEstateType();

    const city = useGetCityById(estate.cityId);
    const country = useGetCountryById(estate.countryId);
    const currency = useGetCurrencyById(estate.curencyId);
    const estateType = useGetEstateTypById(estate.estateTypeId);

    const ready =
        city !== undefined &&
        country !== undefined &&
        currency !== undefined &&
        estateType !== undefined &&
        cities.length !== 0 &&
        countries.length !== 0 &&
        currencies.length !== 0 &&
        estateTypes.length !== 0 &&
        estate !== undefined;


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handlerSubmit = data => {
        console.log({ ...data });
        estateService.Update({
            ...data,
            sell: data.sell === "true",
            curencyId:data.curencyId,
            estateId: estateId,
            images: estate.images
        });
        navigate(`/catalog/${estateId}`)
    };

    return (
        <>
            {ready ?
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, m: 3 }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(handlerSubmit)}
                >
                    <Box container textAlign='center' >
                        <Typography variant="h3" >
                            Edit Real Estate
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                row
                                defaultValue={estate.sell}
                            >
                                <FormControlLabel
                                    {...register("sell")}

                                    value={true}
                                    control={<Radio />}
                                    label="Sell"
                                />
                                <FormControlLabel
                                    {...register("sell")}

                                    value={false}
                                    control={<Radio />}
                                    label="Rent"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        direction="row"
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={2} />
                        <Grid item xs={3} >
                            <FormControl sx={{ m: 1 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                    error={errors.countryId}
                                    {...register("countryId",
                                        { required: { value: true, message: "Country is required field!" } })}
                                    name="countryId"
                                    label="Country"
                                    value={country.countryId}
                                    defaultValue={estate.countryId}
                                    onChange={handleInputChange}
                                >
                                    {countries.map(x =>
                                        <MenuItem
                                            key={x.countryId}
                                            value={x.countryId}
                                        >
                                            {x.countryName}
                                        </MenuItem>
                                    )}
                                </Select>
                                {errors.countryId
                                    ? <FormHelperText error>{errors.countryId.message}</FormHelperText>
                                    : <></>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={3}>
                            <FormControl sx={{ m: 1 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">{city.cityName}</InputLabel>
                                <Select
                                    error={errors.cityId}
                                    {...register("cityId",
                                        { required: { value: true, message: "City is required field!" } })}
                                    name="cityId"
                                    label="City"
                                    value={city.cityId}
                                    defaultValue={estate.cityId}
                                    onChange={handleInputChange}
                                >
                                    {cities.map(x =>
                                        <MenuItem
                                            key={x.cityId}
                                            value={x.cityId}
                                        >
                                            {x.cityName}
                                        </MenuItem>
                                    )}

                                </Select>
                                {errors.cityId
                                    ? <FormHelperText error>{errors.cityId.message}</FormHelperText>
                                    : <></>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} />

                        {/* New Line */}

                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <TextField
                                error={errors.neighborhood}
                                {...register("neighborhood", {
                                    required: { value: true, message: "Neighborhood is required field!" },
                                    maxLength: { value: 20, message: "Neighborhood can't be more from 20 symbols" }
                                })}
                                label="Neighborhood"
                                defaultValue={estate.neighborhood}
                                helperText={errors.neighborhood && errors.neighborhood.message}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                error={errors.address}
                                {...register("address", {
                                    required: { value: true, message: "Address is required field!" },
                                    maxLength: { value: 50, message: "Address can't be more from 50 symbols" }
                                })}
                                label="Address"
                                defaultValue={estate.address}
                                helperText={errors.address && errors.address.message}
                            />
                        </Grid>
                        <Grid item xs={3} />

                        {/* New Line */}

                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <TextField
                                error={errors.description}
                                {...register("description", {
                                    required: { value: true, message: "Description is required field!" },
                                    maxLength: { value: 100, message: "Description can't be more from 100 symbols" }
                                })}
                                label="Description"
                                multiline
                                defaultValue={estate.description}
                                helperText={errors.description && errors.description.message}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                error={errors.extras}
                                {...register("extras", {
                                    required: { value: true, message: "Extras is required field!" },
                                    maxLength: { value: 100, message: "Extras can't be more from 100 symbols" }
                                })}
                                label="Extras"
                                multiline
                                defaultValue={estate.extras}
                                helperText={errors.extras && errors.extras.message}
                            />
                        </Grid>
                        <Grid item xs={3} />

                        {/* New Line */}

                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <TextField
                                error={errors.price}
                                {...register("price", {
                                    min: { value: 0, message: "Price can't be negative" }
                                })}
                                name="price"
                                label="Price"
                                type="number"
                                defaultValue={estate.price}
                                helperText={errors.price && errors.price.message}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl sx={{ m: 1 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    error={errors.curencyId}
                                    {...register("curencyId",
                                        { required: { value: true, message: "Currency Type is required field!" } })}
                                    name="curencyId"
                                    label="Currency"
                                    value={currency.curencyId}
                                    defaultValue={estate.curencyId}
                                    onChange={handleInputChange}
                                >
                                    {currencies.map(x =>
                                        <MenuItem
                                            key={x.currencyId}
                                            value={x.currencyId}
                                        >
                                            {x.currencyName}
                                        </MenuItem>
                                    )}
                                </Select>
                                {errors.curencyId
                                    ? <FormHelperText error>{errors.curencyId.message}</FormHelperText>
                                    : <></>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} />

                        {/* New Line */}

                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <TextField
                                error={errors.floor}
                                {...register("floor", {
                                    min: { value: 0, message: "Floor can't be negative" }
                                })}
                                name="floor"
                                label="Floor"
                                type="number"
                                defaultValue={estate.floor}
                                helperText={errors.floor && errors.floor.message}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                error={errors.estateArea}
                                {...register("estateArea", {
                                    min: { value: 0, message: "Area can't be negative" }
                                })}
                                name="estateArea"
                                type="number"
                                label="Area"
                                defaultValue={estate.estateArea}
                                helperText={errors.estateArea && errors.estateArea.message}
                            />
                        </Grid>
                        <Grid item xs={3} />

                        {/* New Line */}

                        <Grid item xs={2} />
                        <Grid item xs={4} >
                            <TextField
                                error={errors.rooms}
                                {...register("rooms", {
                                    min: { value: 0, message: "Rooms can't be negative" },
                                    setValueAs: v => parseInt(v)
                                })}
                                name="rooms"
                                label="Rooms"
                                type="number"
                                defaultValue={estate.rooms}
                                helperText={errors.rooms && errors.rooms.message}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                error={errors.yearOfCreation}
                                {...register("yearOfCreation", {
                                    min: { value: 0, message: "Year Of Creation can't be negative" }
                                })}
                                name="yearOfCreation"
                                label="Year Of Creation"
                                type="number"
                                defaultValue={estate.yearOfCreation}
                                helperText={errors.yearOfCreation && errors.yearOfCreation.message}
                            />
                        </Grid>
                        <Grid item xs={3} />


                        {/* New Line */}

                        <Grid item xs={2} />
                        <Grid item xs={3}>
                            <FormControl sx={{ m: 1 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Estate Type</InputLabel>

                                <Select
                                    error={errors.estateTypeId}
                                    {...register("estateTypeId",
                                        { required: { value: true, message: "Estate Type is required field!" } })}
                                    name="estateTypeId"
                                    label="Estate Type"
                                    value={estateType.estateTypeId}
                                    defaultValue={estate.estateTypeId}
                                    onChange={handleInputChange}
                                >
                                    {estateTypes.map(x =>
                                        <MenuItem
                                            key={x.estateTypeId}
                                            value={x.estateTypeId}
                                        >
                                            {x.typeName}
                                        </MenuItem>
                                    )}
                                </Select>
                                {errors.estateTypeId
                                    ? <FormHelperText error>{errors.estateTypeId.message}</FormHelperText>
                                    : <></>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={3} >
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </ Box >
                : <Spinner />
            }
        </>
    )
}

export default EditEstate;