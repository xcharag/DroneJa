import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaBackspace, FaUser } from 'react-icons/fa';
import { PiDroneDuotone } from "react-icons/pi";

const AdminAppBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <PiDroneDuotone /> AgroDrone
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Administracion">Panel de Control</Nav.Link>
                        <Nav.Link href="/Clientes">Clientes</Nav.Link>
                        <Nav.Link href="/order">Ordenes</Nav.Link>
                        <Nav.Link href="/Stock">Stock</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/">
                            <FaBackspace /> Volver
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

export default AdminAppBar;
