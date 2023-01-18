import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    Typography
} from '@mui/material';

import LoginUser from '../User/LoginUser';
import RegisterUser from '../User/RegisterUser';

const HeaderMenu = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const { user, userLogout } = useContext(AuthContext);

    const handleClickOpenLogin = () => setOpenLogin(true);
    const handleClickOpenRegister = () => setOpenRegister(true);


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
                        sx={{mr:2}}
                            display="flex"
                            alignItems={"center"}
                            justifyContent="flex-end"
                        >
                            {user.token
                                ? <>
                                    <Typography h3 color="white">Hello, {user.username}!</Typography>
                                    <Avatar alt="avarat img" src="https://www.w3schools.com/howto/img_avatar.png" />
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                        onClick={userLogout}
                                    >
                                        Logout
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