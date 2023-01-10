import { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

const CreateCountry = ({
    countryCreateHandler
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [more, setMore] = useState(false);
    const [country, setCountry] = useState('');

    const onSubmit = (data) => {
        countryCreateHandler({ countryName: data.countryName });
        setCountry('');
    }

    const onChange = (e) => {
        setCountry(e.target.value);

        if (e.target.value) {
            errors.cityName = false;
        } else {
            errors.cityName = true;
        }

        if (e.target.value.length > 15) {
            setMore(true);
        }
        else {
            setMore(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid sx={{ '& button': { m: 1 } }} container alignItems="center" justify="center" direction="row">
                <Grid item>
                    <TextField
                        error={errors.cityName || more}
                        {...register("cityName", { required: true })}
                        id="countryName-input"
                        label="Create Country"
                        type="text"
                        value={country}
                        onChange={onChange}
                        helperText={(errors.cityName && "Country field is required") || (more && "Country can't be more from 15 symbols")}

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