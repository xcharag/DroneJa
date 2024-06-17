import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { useMutation, useLazyQuery } from "@apollo/client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AUTHUSER } from "../../utility/mutation.js";
import { GETUSERINFO } from "../../utility/query.js";

const AccountPage = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [authUser] = useMutation(AUTHUSER);
    const [getUserInfo] = useLazyQuery(GETUSERINFO);
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es requerido'),
            password: Yup.string().required('La contraseña es requerida'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await authUser({
                    variables: {
                        input: {
                            email: values.email,
                            password: values.password
                        }
                    }
                });
                const { token } = response.data.authenticateUser;
                if (token) {
                    localStorage.setItem('token', token);
                    const userData = await getUserInfo({ variables: { token } });
                    localStorage.setItem('user', JSON.stringify(userData.data.getUser));
                    setSuccess('Inicio de sesión exitoso');
                    setError('');

                    setTimeout(() => {
                        navigate('/');
                    }, 5000);
                } else {
                    setError('Credenciales incorrectas');
                    setSuccess('');
                }
            } catch (e) {
                setError('Error en el inicio de sesión');
                setSuccess('');
            }
        }
    });

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="my-4">Iniciar Sesión</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese Correo"
                                {...formik.getFieldProps('email')}
                                isInvalid={formik.touched.email && formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                {...formik.getFieldProps('password')}
                                isInvalid={formik.touched.password && formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
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
