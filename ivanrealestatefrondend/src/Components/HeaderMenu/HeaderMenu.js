import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';

import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    Grid,
    Typography
} from '@mui/material';

import LoginUser from '../User/LoginUser';
import RegisterUser from '../User/RegisterUser';

import * as messageService from '../../Services/MessageService';

const HeaderMenu = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [count, setCount] = useState(1);

    const { user, userLogout } = useContext(AuthContext);

    const handleClickOpenLogin = () => setOpenLogin(true);
    const handleClickOpenRegister = () => setOpenRegister(true);

    messageService.getAll(user.id).then(
        result => {
            let count = 0;
            result.forEach(x => {
                for (const [key, value] of Object.entries(x))
                    if (key === "isRead")
                        if (value === false)
                            count++
            })
            setCount(count);
        }
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="transparent" position="static" >

                <Grid container
                    alignItems="center"
                    justify="center"
                    direction="row"
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item xs={1} />
                    <Grid
                        item xs={8}
                        direction="row"
                    >
                        <Box display="flex" >

                            <NavLink to="/" style={{ textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                                    home
                                </Button>
                            </NavLink>

                            <Divider orientation="vertical" variant="middle" flexItem />

                            <NavLink to="/catalog" style={{ textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                                    Catalog
                                </Button>
                            </NavLink>

                            <Divider orientation="vertical" variant="middle" flexItem />

                            <NavLink to="/createEstate" style={{ textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Create
                                </Button>
                            </NavLink>

                            <Divider orientation="vertical" variant="middle" flexItem />

                            <NavLink to="/cities" style={{ textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                                    Cities
                                </Button>
                            </NavLink>

                            <Divider orientation="vertical" variant="middle" flexItem />

                            <NavLink to="/countries" style={{ textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                                    Countries
                                </Button>
                            </NavLink>

                            <Divider orientation="vertical" variant="middle" flexItem />

                            <NavLink to="/currencies" style={{ textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    currencies
                                </Button>
                            </NavLink>

                            <Divider orientation="vertical" variant="middle" flexItem />

                            <NavLink to="/estatetypes" style={{ textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                                    Estate Types
                                </Button>
                            </NavLink>

                            <Divider orientation="vertical" variant="middle" flexItem />

                            <NavLink to="/giphy" style={{ textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    giphy
                                </Button>
                            </NavLink>
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <Box
                            sx={{ mr: 2 }}
                            display="flex"
                            alignItems={"center"}
                            justifyContent="flex-end"
                        >
                            {user.token
                                ? <>
                                    <NavLink to="/messages" style={{ textDecoration: "none" }}>
                                        <Badge sx={{ m: 2 }} badgeContent={count} color="primary">
                                            <MailIcon color="action" />
                                        </Badge>
                                    </NavLink>
                                    <Typography h3 color="white">Hello, {user.username}!</Typography>
                                    <Avatar sx={{ m: 2 }} alt="avarat img" src="https://www.w3schools.com/howto/img_avatar.png" />
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                        onClick={userLogout}
                                    >
                                        <LogoutIcon />
                                    </Button>
                                </>
                                :
                                <>
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                        onClick={handleClickOpenLogin}
                                    >
                                        Login
                                    </Button>

                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                        onClick={handleClickOpenRegister}
                                    >
                                        Register
                                    </Button>

                                    <LoginUser setOpen={setOpenLogin} open={openLogin} />
                                    <RegisterUser setOpen={setOpenRegister} open={openRegister} />
                                </>
                            }

                        </Box>
                    </Grid>
                </Grid>

            </AppBar>
        </Box >
    );
}

export default HeaderMenu;