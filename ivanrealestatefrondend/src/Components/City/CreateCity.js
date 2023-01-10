import { useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

const CreateCity = ({
    cityCreateHandler
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [city, setCity] = useState('');
    const [more, setMore] = useState(false);

    const onSubmit = data => {
        cityCreateHandler({ cityName: data.cityName })
        setCity('');
    }

    const onChange = (e) => {
        setCity(e.target.value);

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
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid sx={{ '& button': { m: 1 } }} container alignItems="center" justify="center" direction="row">
                    <Grid item>
                        <TextField
                            error={errors.cityName || more}
                            {...register("cityName", { required: true })}
                            id="cityName-input"
                            label="Create City"
                            type="text"
                            value={city}
                            onChange={onChange}
                            helperText={(errors.cityName && "City field is required") || (more && "City can't be more from 15 symbols")}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success" type="submit">
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default CreateCity;