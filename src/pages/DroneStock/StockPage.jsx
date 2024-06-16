import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import './StockPage.css'; // Custom CSS for styling

const StockPage = () => {
    const [drones, setDrones] = useState([
        { id: 1, name: 'Drone A', description: 'This is Drone A', stock: 10, sold: 5, price: 599, imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Drone B', description: 'This is Drone B', stock: 5, sold: 15, price: 399, imageUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Drone C', description: 'This is Drone C', stock: 8, sold: 8, price: 799, imageUrl: 'https://via.placeholder.com/150' }
    ]);

    const [showBestSellingModal, setShowBestSellingModal] = useState(false);
    const [showLeastSoldModal, setShowLeastSoldModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleCloseBestSelling = () => setShowBestSellingModal(false);
    const handleCloseLeastSold = () => setShowLeastSoldModal(false);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleShowBestSelling = () => setShowBestSellingModal(true);
    const handleShowLeastSold = () => setShowLeastSoldModal(true);
    const handleShowAdd = () => setShowAddModal(true);

    const getTop10BestSelling = () => {
        return [...drones].sort((a, b) => b.sold - a.sold).slice(0, 10);
    };

    const getTop10LeastSold = () => {
        return [...drones].sort((a, b) => a.sold - b.sold).slice(0, 10);
    };

    const handleAdd = (newDrone) => {
        const updatedDrones = [...drones, { id: drones.length + 1, ...newDrone }];
        setDrones(updatedDrones);
        setShowAddModal(false);
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={10}>
                    <h1 className="my-4 text-center">Drone Stock</h1>
                    <div className="table-container">
                        <Table striped bordered hover responsive className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Stock</th>
                                <th>Vendidos</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {drones.map(drone => (
                                <tr key={drone.id}>
                                    <td>{drone.id}</td>
                                    <td>{drone.name}</td>
                                    <td>{drone.description}</td>
                                    <td>{drone.stock}</td>
                                    <td>{drone.sold}</td>
                                    <td>${drone.price}</td>
                                    <td className="table-actions">
                                        <Button variant="warning" size="sm">
                                            Editar
                                        </Button>
                                        <Button variant="danger" size="sm">
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className="buttons-container">
                        <Button variant="success" className="my-2" onClick={handleShowBestSelling}>
                            Mejor Vendido
                        </Button>
                        <Button variant="secondary" className="my-2" onClick={handleShowLeastSold}>
                            Menos Vendido
                        </Button>
                        <Button variant="primary" className="my-2" onClick={handleShowAdd}>
                            Agregar Drone
                        </Button>
                    </div>

                    <Modal show={showBestSellingModal} onHide={handleCloseBestSelling}>
                        <Modal.Header closeButton>
                            <Modal.Title>Top 10 Mejor Vendidos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table striped bordered hover responsive className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Stock</th>
                                    <th>Vendidos</th>
                                    <th>Precio</th>
                                </tr>
                                </thead>
                                <tbody>
                                {getTop10BestSelling().map(drone => (
                                    <tr key={drone.id}>
                                        <td>{drone.id}</td>
                                        <td>{drone.name}</td>
                                        <td>{drone.description}</td>
                                        <td>{drone.stock}</td>
                                        <td>{drone.sold}</td>
                                        <td>${drone.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showLeastSoldModal} onHide={handleCloseLeastSold}>
                        <Modal.Header closeButton>
                            <Modal.Title>Top 10 Menos Vendidos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table striped bordered hover responsive className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Stock</th>
                                    <th>Vendidos</th>
                                    <th>Precio</th>
                                </tr>
                                </thead>
                                <tbody>
                                {getTop10LeastSold().map(drone => (
                                    <tr key={drone.id}>
                                        <td>{drone.id}</td>
                                        <td>{drone.name}</td>
                                        <td>{drone.description}</td>
                                        <td>{drone.stock}</td>
                                        <td>{drone.sold}</td>
                                        <td>${drone.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showAddModal} onHide={handleCloseAdd}>
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar Drone</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleAdd}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese nombre"
                                        name="name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription" className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Ingrese descripción"
                                        name="description"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formStock" className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ingrese stock"
                                        name="stock"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPrice" className="mb-3">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ingrese precio"
                                        name="price"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formImageUrl" className="mb-3">
                                    <Form.Label>URL de la Imagen</Form.Label>
                                    <Form.Control
                                        type="url"
                                        placeholder="Ingrese URL de la imagen"
                                        name="imageUrl"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Agregar
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

export default StockPage;
