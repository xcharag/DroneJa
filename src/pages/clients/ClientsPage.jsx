import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import './ClientsPage.css'; // Make sure to import your custom CSS

const ClientsPage = () => {
    const [clients, setClients] = useState([
        { id: 1, name: 'John', lastname: 'Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com' },
        { id: 3, name: 'Michael', lastname: 'Johnson', email: 'michael.johnson@example.com' }
    ]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editClient, setEditClient] = useState(null);
    const [newClient, setNewClient] = useState({ name: '', lastname: '', email: '', password: '' });

    const handleCloseEdit = () => setShowEditModal(false);
    const handleCloseAdd = () => setShowAddModal(false);
    const handleShowEdit = (client) => {
        setEditClient(client);
        setShowEditModal(true);
    };
    const handleShowAdd = () => setShowAddModal(true);

    const handleEdit = (e) => {
        e.preventDefault();
        const updatedClients = clients.map(client =>
            client.id === editClient.id ? editClient : client
        );
        setClients(updatedClients);
        handleCloseEdit();
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const newClientWithId = { ...newClient, id: clients.length + 1 };
        setClients([...clients, newClientWithId]);
        setNewClient({ name: '', lastname: '', email: '', password: '' });
        handleCloseAdd();
    };

    const handleRemove = (id) => {
        setClients(clients.filter(client => client.id !== id));
    };

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
                                    <td>{client.lastname}</td>
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
                                        value={editClient?.name || ''}
                                        onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLastname" className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese apellido"
                                        value={editClient?.lastname || ''}
                                        onChange={(e) => setEditClient({ ...editClient, lastname: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingrese email"
                                        value={editClient?.email || ''}
                                        onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
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
                </Col>
            </Row>
        </Container>
    );
};

export default ClientsPage;
