import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'

const HeaderMenu = () => {
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

                        <LinkContainer to="/create">
                            <Nav.Link>
                                Create Estate
                            </Nav.Link>
                        </LinkContainer>
                    
                        <LinkContainer to="/register">
                            <Nav.Link>
                                Register
                            </Nav.Link>
                        </LinkContainer>
                    
                        <LinkContainer to="/login">
                            <Nav.Link>
                                Login
                            </Nav.Link>
                        </LinkContainer>

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

                        <LinkContainer to="/createEstate">
                            <Nav.Link>
                                Create Estate
                            </Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default HeaderMenu;