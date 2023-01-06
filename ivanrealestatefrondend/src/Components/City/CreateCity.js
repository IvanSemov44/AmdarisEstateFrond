import { useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateCity = ({
    cityCreateHandler
}) => {
    const [city, setCity] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(city);
        const cityForCreate = { cityName: city }
        cityCreateHandler(cityForCreate)
        setCity('');
    }

    const onChange = (e) => {
        setCity(e.target.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid sx={{ '& button': { m: 1 } }} container alignItems="center" justify="center" direction="row">
                <Grid item>
                    <TextField
                        id="cityName-input"
                        name="cityName"
                        label="Create City"
                        type="text"
                        value={city}
                        onChange={onChange}
                    />
                </Grid>

                <Button variant="contained" color="success" type="submit">
                    Create
                </Button>
            </Grid>
        </form>
    );
}

export default CreateCity;