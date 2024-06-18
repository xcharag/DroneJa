import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import './ClientsPage.css';
import { GETUSERSBYSELLER, EXAM } from "../../utility/query.js";
import { NEWUSER, UPDATEUSER } from "../../utility/mutation.js"; // Import the mutation
import { useLazyQuery, useMutation } from "@apollo/client";

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [getAllClients] = useLazyQuery(GETUSERSBYSELLER);
    const [clientesBySeller] = useLazyQuery(EXAM);
    const [addUser] = useMutation(NEWUSER); // Use the mutation
    const [updateUser] = useMutation(UPDATEUSER); // Use the update mutation

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showExam, setShowExam] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [totalClients, setTotalClients] = useState(0);
    const [clientesporseller, setclientesporseller] = useState([]);
    const [newClient, setNewClient] = useState({ name: '', lastname: '', email: '', password: '' });

    useEffect(() => {
        getClients();
    }, []);

    const getClients = async () => {
        try {
            const { data } = await getAllClients({
                context: {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                }
            });
            if (data) {
                setClients(data.getUsersBySeller);
            } else {
                console.error('No clients found');
            }
        } catch (e) {
            throw new Error(e.message);
        }
    }

    const handleCloseEdit = () => setShowEditModal(false);
    const handleCloseAdd = () => setShowAddModal(false);
    const handleShowEdit = (client) => {
        setSelectedClient(client);
        setShowEditModal(true);
    };
    const handleShowAdd = () => setShowAddModal(true);

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            console.log(selectedClient);
            const { data } = await updateUser({
                variables: {
                    updateUserId: selectedClient.id,
                    input: {
                        name: selectedClient.name,
                        lastName: selectedClient.lastName,
                        email: selectedClient.email,
                    }
                },
                context: {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                }
            });
            console.log(data);

            handleCloseEdit();
        } catch (error) {
            console.error("Error updating client:", error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            const sellerid = JSON.parse(localStorage.getItem('user')).id;
            const { data } = await addUser({
                variables: {
                    input: {
                        email: newClient.email,
                        lastName: newClient.lastname,
                        name: newClient.name,
                        password: newClient.password,
                        associatedSeller: sellerid,
                        role: 'CLIENT'
                    }
                },
                context: {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                }
            });

            console.log(data);
            // Fetch updated list of clients after the add submission
            getClients();
            handleCloseAdd();
        } catch (error) {
            console.error("Error adding client:", error);
        }
    };

    const handleRemove = async (id) => {
        try {
            // Assuming a mutation for deleting user is defined
            // await deleteUser({ variables: { id }, context: { headers: { authorization: localStorage.getItem('token') } } });

            // Fetch updated list of clients after the delete submission
            getClients();
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    };

    const getClientsBySeller = async () => {
        try {
            const { data } = await clientesBySeller();
                let counter = 0;
            data.clientesporseller.map(exams => {
                counter += exams.count;
                setTotalClients(counter);
            });
            setclientesporseller(data.clientesporseller);
            setShowExam(true);
        } catch (error) {
            console.error("Error getting clients by seller:", error);
        }
    }

    const handleCloseExam = () => setShowExam(false);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 className="my-4 text-center">Clientes</h1>
                    <div className="table-container">
                        <Table striped bordered hover responsive className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.id}</td>
                                    <td>{client.name}</td>
                                    <td>{client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td className="table-actions">
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handleShowEdit(client)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemove(client.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                    <Button variant="success" className="my-4" onClick={handleShowAdd}>
                        Agregar Cliente
                    </Button>

                    <Button variant="success" onClick={getClientsBySeller}>
                        Ejercicio de Examen
                    </Button>

                    <Modal show={showEditModal} onHide={handleCloseEdit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleEdit}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese nombre"
                                        value={selectedClient?.name || ''}
                                        onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLastname" className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese apellido"
                                        value={selectedClient?.lastName || ''}
                                        onChange={(e) => setSelectedClient({ ...selectedClient, lastName: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingrese email"
                                        value={selectedClient?.email || ''}
                                        onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Guardar Cambios
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showAddModal} onHide={handleCloseAdd}>
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar Cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleAdd}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese nombre"
                                        value={newClient.name}
                                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLastname" className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese apellido"
                                        value={newClient.lastname}
                                        onChange={(e) => setNewClient({ ...newClient, lastname: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingrese email"
                                        value={newClient.email}
                                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingrese contraseña"
                                        value={newClient.password}
                                        onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Agregar Cliente
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showExam} onHide={handleCloseExam}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ejercicio</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {clientesporseller.map(exams => (
                                <div key={exams.id} style={{ marginBottom: '10px' }}>
                                    <strong>Nombre:</strong> {exams.name}<br />
                                    <strong>Cantidad:</strong> {exams.count}
                                </div>
                            ))}
                            <p>Total de Clientes es: {totalClients}</p>
                        </Modal.Body>
                    </Modal>

                </Col>
            </Row>
        </Container>
    );
};

export default ClientsPage;
