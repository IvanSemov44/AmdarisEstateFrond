import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import useGetCities from "../../../CustemHooks/CustemCityHooks/useGetCities";
import useGetCountries from "../../../CustemHooks/CustemCountryHooks/useGetCountries";

import * as companyService from '../../../Services/CompanyService';

const defaultValues = {
    name: "",
    address: "",
    description: "",
    companyCityId: "",
    companyCountryId: "",
};

const CreateComapny = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(defaultValues);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const cities = useGetCities();
    const countries = useGetCountries();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handlerSubmit = data => {
        companyService.create(data)
            .then(result => navigate(`/companyCatalog/${result.id}`));
    };

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 5, width: '25ch' }, }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handlerSubmit)}>
            <Grid
                container
                alignItems="center"
                justify="center"
                direction="row"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item xs={2.5} />

                <Grid item xs={2}>
                    <TextField
                        error={errors.name}
                        {...register("name", {
                            required: { value: true, message: "Name is required field!" },
                            maxLength: { value: 100, message: "Name can't be more from 100 symbols" }
                        })}
                        label="Name"
                        defaultValue={formValues.name}
                        helperText={errors.name && errors.name.message}
                    />
                </Grid>

                <Grid item xs={2}>
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

                <Grid item xs={2}>
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
                <Grid item xs={3.5} />

                {/* New Line */}


                <Grid item xs={2} />
                <Grid item xs={3}>
                    <FormControl sx={{ m: 1 }} fullWidth >
                        <InputLabel>Country</InputLabel>
                        <Select
                            error={errors.companyCountryId}
                            {...register("companyCountryId",
                                { required: { value: true, message: "Country is required field!" } })}
                            name="companyCountryId"
                            label="Country"
                            value={formValues.companyCountryId}
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
                        {errors.companyCountryId
                            ? <FormHelperText error>{errors.companyCountryId.message}</FormHelperText>
                            : <></>
                        }
                    </FormControl>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={3}>
                    <FormControl sx={{ m: 1 }} fullWidth>
                        <InputLabel>City</InputLabel>
                        <Select
                            error={errors.companyCityId}
                            {...register("companyCityId",
                                { required: { value: true, message: "City is required field!" } })}
                            name="companyCityId"
                            label="City"
                            value={formValues.companyCityId}
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
                        {errors.companyCityId
                            ? <FormHelperText error>{errors.companyCityId.message}</FormHelperText>
                            : <></>
                        }
                    </FormControl>
                </Grid>
                <Grid item xs={2} />

                {/* New Line */}

                <Grid item xs={3.9} />

                <Grid item xs={3} sx={{ m: 3 }}>
                    <Button fullWidth variant="contained" color="success" type="submit">
                        create
                    </Button>
                </Grid>
                <Grid item xs={3} />


            </Grid>
        </Box>
    )
}

export default CreateComapny;