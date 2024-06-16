import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { PiDroneDuotone } from "react-icons/pi";

const AppBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <PiDroneDuotone /> AgroDrone
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/Productos">Productos</Nav.Link>
                        <Nav.Link href="/Administracion">Administracion</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/cart">
                            <FaShoppingCart /> Carrito
                        </Nav.Link>
                        <Nav.Link href="/account">
                            <FaUser /> Cuenta
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppBar;
