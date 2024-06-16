// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Example login logic (replace with actual authentication logic)
        if (email === 'user@example.com' && password === 'password') {
            setSuccess('Inicio de sesión exitoso!');
            setError('');
            // Redirect or perform any other action on successful login
        } else {
            setError('Correo electrónico o contraseña inválidos');
            setSuccess('');
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="my-4">Iniciar Sesión</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center gap-3">
                            <Button variant="primary" type="submit">
                                Iniciar Sesión
                            </Button>
                            <Link to="/signup">
                                <Button variant="secondary">
                                    Crear Cuenta
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountPage;
