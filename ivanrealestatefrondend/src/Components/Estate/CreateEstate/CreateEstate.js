import { useState } from "react";

import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import useGetCities from '../../../CustemHooks/useGetCities';
import useGetCurrency from '../../../CustemHooks/useGetCurrency';
import useGetCountries from '../../../CustemHooks/useGetCountries';
import useGetEstateType from '../../../CustemHooks/useGetEstateType';

import * as estateService from '../../../Services/EstateService'

import "./CreateEstate.css";
import { useNavigate } from "react-router-dom";

const defaultValues = {
    address: "",
    description: "",
    extras: "",
    neighborhood: "",
    price: "",
    floоr: 0,
    rooms: 0,
    yearOfCreation: 0,
    sell: true,
    cityId: "",
    countryId: "",
    estateTypeId: "",
    currencyId: "",
};

const CreateEstate = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const navigate = useNavigate();

    const cities = useGetCities();
    const countries = useGetCountries();
    const estateTypes = useGetEstateType();
    const currencies = useGetCurrency();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const radioHandleInputChange = (e) => {
        const { name, value } = e.target;
        if (value === false) {
            setFormValues({
                ...formValues,
                [name]: false,
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: true,
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        estateService.Create({ ...formValues })
        .then(result=>{
            navigate(`/catalog/${result.estateId}`);
        });
        console.log(formValues);
    };

    return (
        <div className="create-estate">
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">

                    <Grid item>
                        <TextField
                            id="neighborhood-input"
                            name="neighborhood"
                            label="Neighborhood"
                            type="text"
                            value={formValues.neighborhood}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="address-input"
                            name="address"
                            label="Address"
                            type="text"
                            value={formValues.address}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="description-input"
                            name="description"
                            label="Description"
                            type="text"
                            value={formValues.description}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="extras-input"
                            name="extras"
                            label="Extras"
                            type="text"
                            value={formValues.extras}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="floоr-input"
                            name="floоr"
                            label="Floоr"
                            type="number"
                            value={formValues.floоr}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="price-input"
                            name="price"
                            label="Price"
                            type="number"
                            value={formValues.price}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="rooms-input"
                            name="rooms"
                            label="Рooms"
                            type="number"
                            value={formValues.rooms}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="yearOfCreation-input"
                            name="yearOfCreation"
                            label="Year Of Creation"
                            type="number"
                            value={formValues.yearOfCreation}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <FormLabel>Sell or Rent</FormLabel>
                            <RadioGroup
                                name="sell"
                                value={formValues.sell}
                                onChange={radioHandleInputChange}
                                row
                            >
                                <FormControlLabel
                                    key="sell"
                                    value="true"
                                    control={<Radio size="small" />}
                                    label="Sell"
                                />

                                <FormControlLabel
                                    key="rent"
                                    value="false"
                                    control={<Radio size="small" />}
                                    label="Rent"
                                />

                            </RadioGroup>
                        </FormControl>
                    </Grid>

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