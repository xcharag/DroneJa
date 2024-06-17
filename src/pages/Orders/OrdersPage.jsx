import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import './OrderPage.css'; // Custom CSS for styling

const OrderPage = () => {
    const [orders, setOrders] = useState([
        { id: 1, summary: 'Order 1 summary', totalCost: 120.5, status: 'pendiente', items: ['Item A', 'Item B'] },
        { id: 2, summary: 'Order 2 summary', totalCost: 200.75, status: 'completado', items: ['Item C', 'Item D'] },
        { id: 3, summary: 'Order 3 summary', totalCost: 85.0, status: 'cancelado', items: ['Item E'] }
    ]);

    const [showChangeStateModal, setShowChangeStateModal] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleCloseChangeStateModal = () => setShowChangeStateModal(false);
    const handleCloseSummaryModal = () => setShowSummaryModal(false);

    const handleShowChangeStateModal = (order) => {
        setSelectedOrder(order);
        setShowChangeStateModal(true);
    };

    const handleShowSummaryModal = (order) => {
        setSelectedOrder(order);
        setShowSummaryModal(true);
    };

    const handleChangeStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        setShowChangeStateModal(false); // Close the modal after status change
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={10}>
                    <h1 className="my-4 text-center">Ordenes Detalladas</h1>
                    <div className="table-container">
                        <Table striped bordered hover responsive className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Resumen</th>
                                <th>Costo total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>
                                        <Button  onClick={() => handleShowSummaryModal(order)}>
                                            Ver resumen
                                        </Button>
                                    </td>
                                    <td>${order.totalCost.toFixed(2)}</td>
                                    <td>{order.status}</td>
                                    <td className="table-actions">
                                        <Button variant="primary" size="sm" onClick={() => handleShowChangeStateModal(order)}>
                                            Cambiar estado
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                    <Modal show={showSummaryModal} onHide={handleCloseSummaryModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Resumen de la Orden</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>ID: {selectedOrder && selectedOrder.id}</h5>
                            <p>Resumen: {selectedOrder && selectedOrder.summary}</p>
                            <p>Costo Total: ${selectedOrder && selectedOrder.totalCost.toFixed(2)}</p>
                            <p>Estado: {selectedOrder && selectedOrder.status}</p>
                            <p>Drones Comprados:</p>
                            <ul>
                                {selectedOrder && selectedOrder.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showChangeStateModal} onHide={handleCloseChangeStateModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cambiar estado de la Orden</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Selecccionar un nuevo estado de orden ID: {selectedOrder && selectedOrder.id}</p>
                            <Button variant="secondary" className="mx-1" onClick={() => handleChangeStatus(selectedOrder.id, 'pendiente')}>
                                Pendiente
                            </Button>
                            <Button variant="success" className="mx-1" onClick={() => handleChangeStatus(selectedOrder.id, 'completado')}>
                                Completado
                            </Button>
                            <Button variant="danger" className="mx-1" onClick={() => handleChangeStatus(selectedOrder.id, 'cancelado')}>
                                Cancelado
                            </Button>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderPage;
