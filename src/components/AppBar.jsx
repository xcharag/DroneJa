import { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { PiDroneDuotone } from 'react-icons/pi';

const AppBar = () => {
    const [role, setRole] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setRole(parsedUser.role);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setRole('');
    };

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
                        {role === 'SELLER' && <Nav.Link href="/Administracion">Administracion</Nav.Link>}
                    </Nav>
                    <Nav>
                        <Nav.Link href="/cart">
                            <FaShoppingCart /> Carrito
                        </Nav.Link>
                        <Dropdown alignRight>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                <FaUser /> Cuenta
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {user ? (
                                    <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                                ) : (
                                    <Dropdown.Item href="/account">Iniciar Sesión</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppBar;
