import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CreateEstateType = ({
    estateTypeCreateHandler
}) => {
    const { register, handleSubmit, formState: { errors }, resetField } = useForm();

    const onSubmit = data => {
        resetField("typeName");
        estateTypeCreateHandler({ typeName: data.typeName });
    }

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
                        error={errors.typeName}
                        {...register("typeName", {
                            required: { value: true, message: "Estate Type is required field!" },
                            maxLength: { value: 15, message: "Estate Type can't be more from 15 symbols" }
                        })}
                        label="Create Estate Type"
                        helperText={errors.typeName && errors.typeName?.message}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="success" type="submit">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CreateEstateType;