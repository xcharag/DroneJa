import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import './StockPage.css'; // Custom CSS for styling
import { useMutation, useQuery } from "@apollo/client";
import { GETPRODUCTS } from "../../utility/query.js"; // Import the query
import { NEWPRODUCT, UPDATEPRODUCT, DELETEPRODUCT } from "../../utility/mutation.js";

const StockPage = () => {
    const { data, loading, error } = useQuery(GETPRODUCTS, {
        context: {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }
    });

    const [drones, setDrones] = useState([]);
    const [selectedDrone, setSelectedDrone] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [addDrone, { loading: mutationLoading, error: mutationError }] = useMutation(NEWPRODUCT, {
        context: {
            headers: {
                authorization: localStorage.getItem('token')
            }
        },
        onCompleted: (data) => {
            // Update the state with the new product after mutation completion
            setDrones((prevDrones) => [
                ...prevDrones,
                data.newProduct
            ]);
            setShowAddModal(false);
        },
        onError: (error) => {
            console.error("Error adding drone:", error);
        }
    });

    const [updateProduct] = useMutation(UPDATEPRODUCT);
    const [deleteProduct] = useMutation(DELETEPRODUCT);

    useEffect(() => {
        if (data && data.getProducts) {
            setDrones(data.getProducts);
        }
    }, [data]);

    const handleShowEditModal = (drone) => {
        setSelectedDrone(drone);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        console.log(selectedDrone);
        try {
            const updated = await updateProduct({
                variables: {
                    updateProductId: selectedDrone.id,
                    input: {
                        name: selectedDrone.name,
                        description: selectedDrone.description,
                        stock: parseInt(selectedDrone.stock),
                        price: selectedDrone.price
                    }
                }
            });
            console.log(updated);
            console.log(selectedDrone);
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating drone:", error);
        }
    };

    const handleAdd = async (event) => {
        event.preventDefault();

        const { name, description, stock, price } = event.target;

        const droneInput = {
            name: name.value.trim(),
            description: description.value.trim(),
            stock: parseInt(stock.value, 10),
            price: parseFloat(price.value)
        };

        try {
            const { data } = await addDrone({
                variables: {
                    input: droneInput
                }
            });

            console.log(data);

            // Close the modal after adding the drone
            setShowAddModal(false);
        } catch (error) {
            console.error("Error adding drone:", error);
        }
    };

    const handleDelete = async (droneId) => {
        try {
            // Call the delete mutation
            const resp = await deleteProduct({
                variables: {
                    deleteProductId: droneId
                }
            });
            console.log(resp);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting drone:", error);
        }
    }

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
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {drones.map((drone) => (
                                <tr key={drone.id}>
                                    <td>{drone.id}</td>
                                    <td>{drone.name}</td>
                                    <td>{drone.description}</td>
                                    <td>{drone.stock}</td>
                                    <td>${drone.price}</td>
                                    <td className="table-actions">
                                        <Button variant="warning" size="sm" onClick={() => handleShowEditModal(drone)}>
                                            Editar
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={()=> handleDelete(drone.id)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className="buttons-container">
                        <Button variant="success" className="my-2">
                            Mejor Vendido
                        </Button>
                        <Button variant="secondary" className="my-2">
                            Menos Vendido
                        </Button>
                        <Button variant="primary" className="my-2" onClick={handleShowAddModal}>
                            Agregar Drone
                        </Button>
                    </div>

                    {/* Edit Modal */}
                    <Modal show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Drone</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleEdit}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={selectedDrone?.name}
                                        onChange={(e) => setSelectedDrone({ ...selectedDrone, name: e.target.value })}
                                        name="name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription" className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        defaultValue={selectedDrone?.description}
                                        onChange={(e) => setSelectedDrone({ ...selectedDrone, description: e.target.value })}
                                        name="description"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formStock" className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue={selectedDrone?.stock}
                                        onChange={(e) => setSelectedDrone({ ...selectedDrone, stock: e.target.value })}
                                        name="stock"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPrice" className="mb-3">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue={selectedDrone?.price}
                                        onChange={(e) => setSelectedDrone({ ...selectedDrone, price: e.target.value })}
                                        name="price"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Guardar cambios
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showAddModal} onHide={handleCloseAddModal}>
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
