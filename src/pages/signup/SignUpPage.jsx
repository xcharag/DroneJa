import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NEWUSER } from '../../utility/mutation.js';

const SignUpPage = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newUser] = useMutation(NEWUSER);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            lastName: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es requerido'),
            password: Yup.string().required('La contraseña es requerida'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
                .required('Confirmar contraseña es requerido'),
            name: Yup.string().required('El nombre es requerido'),
            lastName: Yup.string().required('El apellido es requerido'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await newUser({
                    variables: {
                        input: {
                            email: values.email,
                            password: values.password,
                            name: values.name,
                            lastName: values.lastName,
                            role: 'SELLER',
                        },
                    },
                });
                const { token } = response.data.newUser;
                if (token) {
                    sessionStorage.setItem('token', token);
                    setSuccess('¡Cuenta creada con éxito!');
                    setError('');
                }
            } catch (e) {
                console.error(e);
                setError('Error al crear la cuenta');
                setSuccess('');
            }
        },
    });

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="my-4">Crear Cuenta</h1>
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
                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirmar Contraseña"
                                {...formik.getFieldProps('confirmPassword')}
                                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicName" className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                {...formik.getFieldProps('name')}
                                isInvalid={formik.touched.name && formik.errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicLastName" className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apellido"
                                {...formik.getFieldProps('lastName')}
                                isInvalid={formik.touched.lastName && formik.errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.lastName}
                            </Form.Control.Feedback>
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
