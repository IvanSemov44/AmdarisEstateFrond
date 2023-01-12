import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputLabel } from "@mui/material";


import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";

import useGetCities from '../../../CustemHooks/useGetCities';
import useGetCurrency from '../../../CustemHooks/useGetCurrency';
import useGetCountries from '../../../CustemHooks/useGetCountries';
import useGetEstateType from '../../../CustemHooks/useGetEstateType';

import * as estateService from '../../../Services/EstateService';
import * as  cityService from "../../../Services/CityService";
import * as  estateTypeService from "../../../Services/EstateTypeService";
import * as  currencyService from "../../../Services/CurrencyService";
import * as  countryService from "../../../Services/CountryService";

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

const EditEstate=()=>{
    const { estateId } = useParams();

    const [estate, setEstate] = useState({});
    const [city, setCity] = useState({});
    const [estateType, setEstateType] = useState({});
    const [currency, setCurrency] = useState({});
    const [country, setCountry] = useState({});

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(defaultValues);
    const { register, formState: { errors }, handleSubmit, setValue } = useForm(
        {
            defaultValues: {
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
                currencyId: "",
            }
        }
    );

    const cities = useGetCities();
    const countries = useGetCountries();
    const estateTypes = useGetEstateType();
    const currencies = useGetCurrency();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handlerSubmit = data => {
        console.log({ ...data });
        estateService.Create({ ...data, sell: data.sell === "true" })
            .then(result => {
                console.log(result);
                navigate(`/catalog/${result.estateId}`);
            });
    };
    console.log(estate);

    return(
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handlerSubmit)}
        >
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item>
                    <TextField
                        error
                        id="outlined-error"
                        label="Error"
                        defaultValue="Hello World"
                    />
                    <TextField

                        error={errors.neighborhood}
                        {...register("neighborhood", {
                            required: { value: true, message: "Neighborhood is required field!" },
                            maxLength: { value: 20, message: "Neighborhood can't be more from 20 symbols" }
                        })}
                        label="Neighborhood"
                        // defaultValue={estate.neighborhood}
                        // defaultValue="center"
                        helperText={errors.neighborhood && errors.neighborhood.message}
                    />

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

                <Grid item>
                    <TextField
                        error={errors.description}
                        {...register("description", {
                            required: { value: true, message: "Description is required field!" },
                            maxLength: { value: 100, message: "Description can't be more from 100 symbols" }
                        })}
                        label="Description"
                        defaultValue={formValues.description}
                        helperText={errors.description && errors.description.message}
                    />
                    <TextField
                        error={errors.extras}
                        {...register("extras", {
                            required: { value: true, message: "Extras is required field!" },
                            maxLength: { value: 100, message: "Extras can't be more from 100 symbols" }
                        })}
                        label="Extras"
                        defaultValue={formValues.extras}
                        helperText={errors.extras && errors.extras.message}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        error={errors.floor}
                        {...register("floor", {
                            min: { value: 0, message: "Floor can't be negative" }
                        })}
                        name="floor"
                        label="Floor"
                        type="number"
                        defaultValu={formValues.floor}
                        helperText={errors.floor && errors.floor.message}
                    />
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

                <Grid item>
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

                <Grid item>
                    <FormControl>
                        <FormLabel>Sell or Rent</FormLabel>
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
                </Grid>

                <Box sx={{ minWidth: 150 }}>
                    <Grid container alignItems="center" justify="center" direction="row"></Grid>
                    <Grid item>
                        {/* <FormControl sx={{ m: 1 }} fullWidth> */}
                            {/* <InputLabel id="demo-simple-select-label">{city.cityName}</InputLabel> */}
                            {/* <Select
                                  error={errors.cityId}
                                {...register("cityId",
                                    { required: { value: true, message: "City is required field!" } })}
                                name="cityId"
                                label="City"
                                value="cityId"
                                onChange={handleInputChange}
                            >
                                <MenuItem
                                    key={city.cityId}
                                    value={city.cityId}
                                >
                                    {city.cityName}
                                </MenuItem>
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
                        </FormControl> */}

                        {/* <FormControl sx={{ m: 1 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                error={errors.countryId}
                                {...register("countryId",
                                    { required: { value: true, message: "Country is required field!" } })}
                                name="countryId"
                                label="Country"
                                // value={formValues.countryId}
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
                        </FormControl> */}
                    </Grid>

                    <Grid item>
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

                        <FormControl sx={{ m: 1 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                            <Select
                                error={errors.currencyId}
                                {...register("currencyId",
                                    { required: { value: true, message: "Currency Type is required field!" } })}
                                name="currencyId"
                                label="Currency"
                                value={formValues.currencyId}
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
                            {errors.currencyId
                                ? <FormHelperText error>{errors.currencyId.message}</FormHelperText>
                                : <></>
                            }
                        </FormControl>
                    </Grid>
                </Box>

                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Grid>
        </Box>
    )
}

export default EditEstate;