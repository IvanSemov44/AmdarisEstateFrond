import { Avatar, Box, TextField  } from "@mui/material";
import { Link } from "react-router-dom";

const UserCard = ({
    user
}) => {
    return (
        <Box container display="flex" sx={{ml:23}}>
            <Link to={`/userEstates/${user.id}`}>
                <Avatar sx={{ width: 80, height: 80, m: 10, pt: -10 }} alt="avarat img" src="https://www.w3schools.com/howto/img_avatar.png" />
            </Link>
            <Box sx={{mt:10}}>
                <TextField
                    sx={{ m: 2 }}
                    focused
                    label="USERNAME"
                    value={user.userName}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />

                <TextField
                    sx={{ m: 2 }}
                    focused
                    label="USERNAME"
                    value={user.firstName}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />

                <TextField
                    sx={{ m: 2 }}
                    focused
                    label="USERNAME"
                    value={user.lastName}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
            </Box>
        </Box>
    )
}
export default UserCard;