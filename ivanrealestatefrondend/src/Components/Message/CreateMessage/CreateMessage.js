import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Box,
    Grid,
    Alert,  
    Button,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";

import * as messageService from '../../../Services/MessageService';

const CreateMessage = ({
    owner
}) => {
    const [open, setOpen] = useState(false);
    const { register, formState: { errors }, handleSubmit, resetField } = useForm();

    const handlerSubmit = data => {
        messageService.create(owner, { ...data, isRead: false });
        resetField("text");
        resetField("email");
        resetField("name");
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;

        setOpen(false);
    };

    return (
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(handlerSubmit)}
            >
                <Typography textAlign="center" variant="h3" >
                    Do you have a Question?
                </Typography>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    direction="row"
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item xs={4} />
                    <Grid item xs={2}>
                        <TextField
                            sx={{ m: 2 }}
                            error={errors.name}
                            {...register("name", {
                                required: { value: true, message: "Name is required field!" },
                                maxLength: { value: 30, message: "Name can't be more from 30 symbols" }
                            })}
                            label="Name"
                            maxRows={4}
                            helperText={errors.name && errors.name.message}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            error={errors.email}
                            {...register("email", {
                                required: { value: true, message: "Email is required field!" },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}
                            label="Email"
                            helperText={errors.email && errors.email.message}
                        />
                    </Grid>

                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <TextField
                            sx={{ width: 500 }}
                            error={errors.text}
                            {...register("text", {
                                required: { value: true, message: "Quest is required field!" },
                                maxLength: { value: 100, message: "Quest can't be more from 100 symbols" }
                            })}
                            label="Quest"
                            multiline
                            rows={4}
                            helperText={errors.text && errors.text.message}
                        />
                    </Grid>
                    <Grid item xs={2} />

                    <Grid item xs={5} />

                    <Grid item xs={4} >
                        <Button sx={{ width: 300, m: 4 }} variant="contained" color="primary" type="submit">
                            send
                        </Button>
                    </Grid>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert
                            sx={{ width: 600, height: 60 }}
                            elevation={6}
                            variant="filled"
                            onClose={handleClose}
                            severity="success"
                        >
                            <Typography textAlign="center" variant="h5" >
                                Send message success !
                            </Typography>
                        </Alert>
                    </Snackbar>
                </Grid>
            </Box>
        </>
    )
}

export default CreateMessage;