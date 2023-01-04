import {  useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Slider from "@mui/material/Slider";
// import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";

import useGetCities from '../../../CustemHooks/useGetCities';
import useGetCurrency from '../../../CustemHooks/useGetCurrency';
import useGetCountries from '../../../CustemHooks/useGetCountries';
import useGetEstateType from '../../../CustemHooks/useGetEstateType';

import "./CreateEstate.css";


const defaultValues = {
    name: "",
    age: 0,
    gender: "",
    cityId: "",
    countryId: "",
    estateTypeId: "",
    currencyId: "",
    // favoriteNumber: 0,
};

const CreateEstate = () => {
    const [formValues, setFormValues] = useState(defaultValues);

    const cities = useGetCities();
    const countries = useGetCountries();
    const estateTypes = useGetEstateType();
    const currencies = useGetCurrency([]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    console.log(cities);

    // const handleSliderChange = (name) => (e, value) => {
    //     setFormValues({
    //         ...formValues,
    //         [name]: value,
    //     });
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
    };

    return (
        <div className="create-estate">
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField
                            id="name-input"
                            name="name"
                            label="Name"
                            type="text"
                            value={formValues.name}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="age-input"
                            name="age"
                            label="Age"
                            type="number"
                            value={formValues.age}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* <Grid item> */}
                    {/* <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                name="gender"
                                value={formValues.gender}
                                onChange={handleInputChange}
                                row
                            >
                                <FormControlLabel
                                    key="male"
                                    value="male"
                                    control={<Radio size="small" />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    key="female"
                                    value="female"
                                    control={<Radio size="small" />}
                                    label="Female"
                                />
                                <FormControlLabel
                                    key="other"
                                    value="other"
                                    control={<Radio size="small" />}
                                    label="Other"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid> */}

                    <Grid item>
                        <FormControl>
                            <Select
                                name="cityId"
                                value={formValues.cityId}
                                onChange={handleInputChange}
                            >
                                {cities.map(x =>
                                    <MenuItem key={x.cityId} value={x.cityId}>
                                        {x.cityName}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <Select
                                name="countryId"
                                value={formValues.countryId}
                                onChange={handleInputChange}
                            >
                                {countries.map(x =>
                                    <MenuItem key={x.countryId} value={x.countryId}>
                                        {x.countryName}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <Select
                                name="estateTypeId"
                                value={formValues.estateTypeId}
                                onChange={handleInputChange}
                            >
                                {estateTypes.map(x =>
                                    <MenuItem key={x.estateTypeId} value={x.estateTypeId}>
                                        {x.typeName}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <Select
                                name="currencyId"
                                value={formValues.currencyId}
                                onChange={handleInputChange}
                            >
                                {currencies.map(x =>
                                    <MenuItem key={x.currencyId} value={x.currencyId}>
                                        {x.currencyName}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </form>
        </div>
    );
}

export default CreateEstate;