import { useForm } from 'react-hook-form';

import Box from '@mui/material/Grid'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CreateCountry = ({
    countryCreateHandler
}) => {
    const { register, handleSubmit, formState: { errors }, resetField } = useForm();

    const onSubmit = data => {
        resetField('countryName');
        countryCreateHandler({ countryName: data.countryName });
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                m:2
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}>

            <Grid
                sx={{ '& button': { m: 1 } }}
                container
                alignItems="center"
                justify="center"
                direction="row">

                <Grid item>
                    <TextField
                        error={errors.countryName}
                        {...register("countryName", {
                            required: { value: true, message: "Country is required field!" },
                            maxLength: { value: 20, message: "Country can't be more from 20 symbols" }
                        })}
                        label="Create Country"
                        helperText={errors.countryName && errors.countryName?.message}
                    />
                </Grid>

                <Grid item>
                    <Button variant="contained" color="success" type="submit">
                        Create
                    </Button>
                </Grid>

            </Grid>
        </Box >
    )
}

export default CreateCountry;