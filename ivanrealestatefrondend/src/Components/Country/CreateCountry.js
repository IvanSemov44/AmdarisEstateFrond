import { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateCountry = ({
    countryCreateHandler
}) => {
    const [country, setCountry] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const countryForCreate = {countryName: country};
        countryCreateHandler(countryForCreate);
        setCountry('');
    }

    const onChange = (e) => {
        setCountry(e.target.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid sx={{ '& button': { m: 1 } }} container alignItems="center" justify="center" direction="row">
                <Grid item>
                    <TextField
                        id="cityName-input"
                        name="country"
                        label="Create Country"
                        type="text"
                        value={country}
                        onChange={onChange}
                    />
                </Grid>

                <Button variant="contained" color="success" type="submit">
                    Create
                </Button>
            </Grid>
        </form>
    )
}

export default CreateCountry;