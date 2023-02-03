import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import useGetCityById from "../../CustemHooks/CustemCityHooks/useGetCityById";
import useGetCountryById from "../../CustemHooks/CustemCountryHooks/useGetCountryById";

import * as userService from '../../Services/UserService';

const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});

    const city = useGetCityById(user.userCityId);
    const country = useGetCountryById(user.userCountryId);
    
    useEffect(() => {
        userService.getById(userId)
        .then(result=>setUser(result));
    },[userId])

    return (
        <>

            <Box sx={{ m: 2, mx: 8 }}>

                <TextField
                    sx={{ m: 2 }}
                    focused
                    label="Username"
                    value={user.userName}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />

                <TextField
                    sx={{ m: 2 }}
                    focused
                    label="First Name"
                    value={user.firstName}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />

                <TextField
                    sx={{ m: 2 }}
                    focused
                    label="Last Name"
                    value={user.lastName}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />

                 <TextField
                    sx={{ m: 2 }}
                    focused
                    label="Country"
                    value={country.countryName}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                /> 
                <TextField
                    sx={{ m: 2 }}
                    focused
                    label="City"
                    value={city.cityName}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                /> 
                </Box>
        </>
    )
}

export default UserDetails;