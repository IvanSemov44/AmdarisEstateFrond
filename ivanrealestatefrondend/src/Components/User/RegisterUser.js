import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    TextField,
    IconButton,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    DialogActions,
} from '@mui/material';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const RegisterUser = ({
    setOpen,
    open
})=>{
    const [showPassword, setShowPassword] = useState(false);
    const { register, formState: { errors }, handleSubmit, resetField } = useForm();

    const handleClose = () => setOpen(false);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handlerSubmit = data => {
        resetField("userName");
        resetField("password");
        resetField("firstName");
        resetField("lastName");
        resetField("email");
        resetField("passwordRepeat");
        console.log(data);
    }

    return(
        <Dialog open={open} onClose={handleClose}  >
            <DialogTitle >Login</DialogTitle>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(handlerSubmit)}
            >
                <TextField
                    error={errors.firstName}
                    {...register("firstName", {
                        required: { value: true, message: "First Name is required field!" },
                        maxLength: { value: 20, message: "First Name can't be more from 20 symbols" }
                    })}
                    label="First Name"
                    helperText={errors.firstName && errors.firstName.message}
                /> 
                <TextField
                    error={errors.lastName}
                    {...register("lastName", {
                        required: { value: true, message: "Last Name is required field!" },
                        maxLength: { value: 20, message: "Last Name can't be more from 20 symbols" }
                    })}
                    label="Last Name"
                    helperText={errors.lastName && errors.lastName.message}
                />
                <TextField
                    error={errors.userName}
                    {...register("userName", {
                        required: { value: true, message: "UserName is required field!" },
                        maxLength: { value: 20, message: "Neighborhood can't be more from 20 symbols" }
                    })}
                    label="Username"
                    helperText={errors.userName && errors.userName.message}
                />
                <TextField
                    error={errors.email}
                    {...register("email", {
                        required: { value: true, message: "Email is required field!" },
                        maxLength: { value: 50, message: "Email can't be more from 20 symbols" }
                    })}
                    label="Email"
                    helperText={errors.email && errors.email.message}
                />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        {...register("password")}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password Repeat</InputLabel>
                    <OutlinedInput
                        {...register("passwordRepeat")}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password Repeat"
                    />
                </FormControl>
                <DialogActions>
                    <Button sx={{ width: 100 }} variant="contained" color="primary" type="submit">
                        login
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default RegisterUser;