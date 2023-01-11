import { useForm } from 'react-hook-form';

import Box from '@mui/material/Grid'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CreateCurrency = ({
    currencyCreateHandler
}) => {
    const { register, handleSubmit, formState: { errors }, resetField } = useForm();

    const onSubmit = data => {
        resetField('currencyName');
        currencyCreateHandler({ currencyName: data.currencyName });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid
                sx={{ '& button': { m: 1 } }}
                container
                alignItems="center"
                justify="center"
                direction="row"
            >
                <Grid item>
                    <TextField
                        error={errors.currencyName}
                        {...register("currencyName", {
                            required: { value: true, message: "Currency is required field!" },
                            maxLength: { value: 10, message: "Currency can't be more from 10 symbols" }
                        })}
                        label="Create Country"
                        helperText={errors.currencyName && errors.currencyName?.message}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="success" type="submit">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Box>)
}

export default CreateCurrency;