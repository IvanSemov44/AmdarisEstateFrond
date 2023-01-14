import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const CreateImage = ({
    imageCreateHandler
}) => {
    const { register, formState: { errors }, handleSubmit, resetField } = useForm();

    const onSubmit = data => {
        resetField('imageUrl');
        imageCreateHandler({ imageUrl: data.imageUrl })
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                        error={errors.imageUrl}
                        {...register("imageUrl", {
                            required: { value: true, message: "imageUrl is required field!" }
                        })}
                        label="Create Image"
                        helperText={errors.imageUrl && errors.imageUrl?.message}
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
};

export default CreateImage;