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
    FormHelperText,
    MenuItem,
    Select,
} from '@mui/material';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import * as AuthService from '../../Services/AuthService';
import useGetCities from '../../CustemHooks/CustemCityHooks/useGetCities';
import useGetCountries from '../../CustemHooks/CustemCountryHooks/useGetCountries';

const defaultValues = {
   
    userCityId: "",
    userCountryId: "",
};

const RegisterUser = ({
    setOpen,
    open
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState(defaultValues);

    const { register, formState: { errors }, handleSubmit, resetField, watch } = useForm();

    const handleClose = () => setOpen(false);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const cities = useGetCities();
    const countries = useGetCountries();

    const handlerSubmit = data => {
        console.log(data);
        resetField("userName");
        resetField("password");
        resetField("firstName");
        resetField("lastName");
        resetField("email");
        resetField("passwordRepeat");
        const registerData = {
            username: data.userName,
            firstname: data.firstName,
            lastname: data.lastName,
            password: data.password,
            email: data.email,
            phonenumber: null,
            roles: ["employee"]
        };
        AuthService.register(registerData);
        setOpen(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <Dialog open={open} onClose={handleClose}  >
            <DialogTitle>Register</DialogTitle>
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
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                    label="Email"
                    helperText={errors.email && errors.email.message}
                />

                <FormControl sx={{ m: 1, width: '25ch' }} fullWidth >
                    <InputLabel>Country</InputLabel>
                    <Select
                        error={errors.userCountryId}
                        {...register("userCountryId",
                            { required: { value: true, message: "Country is required field!" } })}
                        name="userCountryId"
                        label="Country"
                        value={formValues.userCountryId}
                        onChange={handleInputChange}

                    >
                        {countries.map(x =>
                            <MenuItem
                                key={x.countryId}
                                value={x.countryId}
                            >
                                {x.countryName}
                            </MenuItem>
                        )}
                    </Select>
                    {errors.userCountryId
                        ? <FormHelperText error>{errors.userCountryId.message}</FormHelperText>
                        : <></>
                    }
                </FormControl>
            {/* </Grid> */}

                <FormControl sx={{ m: 1, width: '25ch' }} fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select
                        error={errors.userCityId}
                        {...register("userCityId",
                            { required: { value: true, message: "City is required field!" } })}
                        name="userCityId"
                        label="City"
                    value={formValues.userCityId}
                        onChange={handleInputChange}
                    >
                        {cities.map(x =>
                            <MenuItem
                                key={x.cityId}
                                value={x.cityId}
                            >
                                {x.cityName}
                            </MenuItem>
                        )}

                    </Select>
                    {errors.userCityId
                        ? <FormHelperText error>{errors.userCityId.message}</FormHelperText>
                        : <></>
                    }
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        error={errors.passwordRepeat}
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
                    {errors.passwordRepeat ?
                        <FormHelperText error>{errors.passwordRepeat.message}</FormHelperText>
                        : <></>}
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password Repeat</InputLabel>
                    <OutlinedInput
                        error={errors.passwordRepeat}
                        {...register("passwordRepeat", {
                            required: true,
                            validate: (value) => {
                                if (watch("password") !== value) {
                                    return "Your passwords do no match";
                                }
                            }
                        })}
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
                        Register
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default RegisterUser;