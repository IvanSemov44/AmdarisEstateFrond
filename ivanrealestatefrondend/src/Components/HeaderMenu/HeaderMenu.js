import { Button } from '@mui/material';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import LoginUser from '../User/LoginUser';
import RegisterUser from '../User/RegisterUser';

const HeaderMenu = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleClickOpenRegister = () => {
        setOpenRegister(true);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Ivan Real Estate</Navbar.Brand>
                    <Nav className="me-auto">

                        <LinkContainer to="/">
                            <Nav.Link>
                                Home
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/catalog">
                            <Nav.Link>
                                Catalog Estate
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/createEstate">
                            <Nav.Link>
                                Create Estate
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/cities">
                            <Nav.Link>
                                City Catalog
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/countries">
                            <Nav.Link>
                                Country Catalog
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/currencies">
                            <Nav.Link>
                                Currency Catalog
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/estatetypes">
                            <Nav.Link>
                                Estate Type Catalog
                            </Nav.Link>
                        </LinkContainer>
                    
                        <Button variant="outlined" onClick={handleClickOpenLogin}>
                            Login
                        </Button>

                        <Button variant="outlined" onClick={handleClickOpenRegister}>
                            Register
                        </Button>

                        <LinkContainer to="/logout">
                            <Nav.Link>
                                Logout
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/giphy">
                            <Nav.Link>
                                Giphy
                            </Nav.Link>
                        </LinkContainer>

                        <LoginUser setOpen={setOpenLogin} open={openLogin}/>
                        <RegisterUser setOpen={setOpenRegister} open={openRegister}/>

                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default HeaderMenu;