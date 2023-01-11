import { useForm } from "react-hook-form";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CreateCity = ({
    cityCreateHandler
}) => {
    const { register, formState: { errors }, handleSubmit, resetField } = useForm();

    const onSubmit = data => {
        resetField('cityName');
        cityCreateHandler({ cityName: data.cityName })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid sx={{ '& button': { m: 1 } }} container alignItems="center" justify="center" direction="row">
                <Grid item>
                    <TextField
                        error={errors.cityName}
                        {...register("cityName", {
                            required: { value: true, message: "City is required field!" },
                            maxLength: { value: 20, message: "City can't be more from 20 symbols" }
                        })}
                        label="Create City"
                        helperText={errors.cityName && errors.cityName.message}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="success" type="submit">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default CreateCity;