import { Box, Button, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ImageContext } from "../../contexts/ImageContext";

const ImageItem = ({
    image
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { imageDeleteHandler, imageEditHandler } = useContext(ImageContext);

    const onEdit = data => {
        const imageUrl = data.imageUrl;
        imageEditHandler(image.imageId, image, imageUrl)
        setIsEdit(false);
    }

    const taskEditClickHandler = () => {
        setIsEdit(true);
    }
    return (
        <li>
            {isEdit
                ? <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onEdit)}
                >
                    <TextField
                        error={errors.imageUrl}
                        {...register("imageUrl", {
                            required: { value: true, message: "Image is required field!" },
                        })}
                        label="Edit Country"
                        defaultValue={image.imageUrl}
                        helperText={errors.imageUrl && errors.imageUrl?.message}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        value="edit"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setIsEdit(false)}
                    >
                        cancel
                    </Button>
                </Box>
                : <>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Box
                            component="img"
                            sx={{
                                borderRadius: '16px',
                                height: 355,
                                display: 'block',
                                maxWidth: 400,
                                overflow: 'hidden',
                                width: '100%',
                            }}
                            src={image.imageUrl}
                            alt="No Image"
                        />
                        <Grid item direction="row" >
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={taskEditClickHandler}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => imageDeleteHandler(image.imageId)}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </>
            }
        </li>
    )
};

export default ImageItem;