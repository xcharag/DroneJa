import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Nombre, setNombre] = useState('');
    const [NombreEmpresa , setNombreEmpresa] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();

        // Example sign-up logic (replace with actual sign-up logic)
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setSuccess('');
        } else {
            setSuccess('¡Cuenta creada con éxito!');
            setError('');
            // Redirect or perform any other action on successful sign-up
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="my-4">Crear Cuenta</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSignUp}>
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
                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirmar Contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group><Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                value={Nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>Nombre de la Empresa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la Empresa"
                                value={NombreEmpresa}
                                onChange={(e) => setNombreEmpresa(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Crear Cuenta
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpPage;
