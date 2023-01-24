import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Grid,
    Radio,
    Button,
    Select,
    MenuItem,
    TextField,
    InputLabel,
    RadioGroup,
    Typography,
    FormControl,
    FormHelperText,
    FormControlLabel
} from "@mui/material";

import useGetCities from '../../../CustemHooks/CustemCityHooks/useGetCities';
import useGetCurrency from '../../../CustemHooks/CustemCurrencyHooks/useGetCurrency';
import useGetCountries from '../../../CustemHooks/CustemCountryHooks/useGetCountries';
import useGetEstateType from '../../../CustemHooks/CustemEstateTypeHooks/useGetEstateType';

import * as estateService from '../../../Services/EstateService'
import { AuthContext } from "../../../contexts/AuthContext";

const defaultValues = {
    address: "",
    description: "",
    extras: "",
    neighborhood: "",
    price: 0,
    estateArea: 0,
    floor: 0,
    rooms: 0,
    yearOfCreation: 2023,
    sell: true,
    cityId: "",
    countryId: "",
    estateTypeId: "",
    curencyId: "",
};

const CreateEstate = () => {

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(defaultValues);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { user } = useContext(AuthContext);

    const cities = useGetCities();
    const countries = useGetCountries();
    const currencies = useGetCurrency();
    const estateTypes = useGetEstateType();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handlerSubmit = data => {
        console.log({ ...data });
        estateService.Create({ ...data, sell: data.sell === "true", ownerId: user.id },user.token)
            .then(result =>
                navigate(`/catalog/${result.estateId}`)
            );
    };

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handlerSubmit)}
        >
            <Box container textAlign='center' >
                <Typography variant="h3" >
                    Create Real Estate
                </Typography>
                <FormControl>
                    <RadioGroup
                        row
                        defaultValue="true"
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
                <Grid item xs={3}>
                    <FormControl sx={{ m: 1 }} fullWidth >
                        <InputLabel>Country</InputLabel>
                        <Select
                            error={errors.countryId}
                            {...register("countryId",
                                { required: { value: true, message: "Country is required field!" } })}
                            name="countryId"
                            label="Country"
                            value={formValues.countryId}
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
                        <InputLabel>City</InputLabel>
                        <Select
                            error={errors.cityId}
                            {...register("cityId",
                                { required: { value: true, message: "City is required field!" } })}
                            name="cityId"
                            label="City"
                            value={formValues.cityId}
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
                        defaultValue={formValues.neighborhood}
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
                        defaultValue={formValues.address}
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
                        maxRows={4}
                        defaultValue={formValues.description}
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
                        maxRows={4}
                        defaultValue={formValues.extras}
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
                        defaultValue={formValues.price}
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
                            value={formValues.curencyId}
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
                        defaultValue={formValues.floor}
                        helperText={errors.floor && errors.floor.message}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        error={errors.estateArea}
                        {...register("estateArea", {
                            min: { value: 0, message: "Area can't be negative" }
                        })}
                        type="number"
                        label="Area"
                        defaultValue={formValues.estateArea}
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
                        defaultValue={formValues.rooms}
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
                        defaultValue={formValues.yearOfCreation}
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
                            value={formValues.estateTypeId}
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
                    <Button fullWidth variant="contained" color="primary" type="submit">
                        create
                    </Button>
                </Grid>
                <Grid item xs={3} />
            </Grid>
        </Box >
    );
}

export default CreateEstate;

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