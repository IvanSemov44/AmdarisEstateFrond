import { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateCurrency = ({
    currencyCreateHandler
}) => {
    const [currency, setCurrency] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const currencyForCreate = { currencyName: currency };
        currencyCreateHandler(currencyForCreate);
        setCurrency('');
    };

    const onChange = (e) => {
        setCurrency(e.target.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid sx={{ '& button': { m: 1 } }} container alignItems="center" justify="center" direction="row">
                <Grid item>
                    <TextField
                        id="cityName-input"
                        name="currency"
                        label="Create currency"
                        type="text"
                        value={currency}
                        onChange={onChange}
                    />
                </Grid>

                <Button variant="contained" color="success" type="submit">
                    Create
                </Button>
            </Grid>
        </form>)
}

export default CreateCurrency;