import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import './OrderPage.css'; // Custom CSS for styling
import {useMutation, useQuery} from "@apollo/client";
import { GETORDERSBYSELLER } from "../../utility/query.js";
import { UPDATESTATUS} from "../../utility/mutation.js";

const OrderPage = () => {
    const { data, loading, error } = useQuery(GETORDERSBYSELLER, {
        context: {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }
    });

    const [updateStatusOrder] = useMutation(UPDATESTATUS);
    const [orders, setOrders] = useState([]);
    const [showChangeStateModal, setShowChangeStateModal] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (data && data.getOrdersBySeller) {
            setOrders(data.getOrdersBySeller);
            console.log(data.getOrdersBySeller);
        }
    }, [data]);

    const handleCloseChangeStateModal = () => setShowChangeStateModal(false);
    const handleCloseSummaryModal = () => setShowSummaryModal(false);

    const handleShowChangeStateModal = (order) => {
        setSelectedOrder(order);
        setShowChangeStateModal(true);
    };

    const handleShowSummaryModal = (order) => {
        if (order && order.order && order.order.length > 0) {
            setSelectedOrder(order);
            setShowSummaryModal(true);
        }
    };

    const handleChangeStatus = async (orderId, newStatus) => {
        const resp = await updateStatusOrder({
            variables: {
                updateOrderId: orderId,
                input: {
                    status: newStatus
                }
            }
        });
        console.log(resp);
        setShowChangeStateModal(false);
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error loading orders: {error.message}</p>;

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
                                        <Button onClick={() => handleShowSummaryModal(order)}>
                                            Ver resumen
                                        </Button>
                                    </td>
                                    <td>${order.total.toFixed(2)}</td>
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
                            {selectedOrder && selectedOrder.order && selectedOrder.order.length > 0 ? (
                                <>
                                    <h5>ID: {selectedOrder.id}</h5>
                                    <p>Resumen de la Compra</p>
                                    <p>Costo Total: ${selectedOrder.total.toFixed(2)}</p>
                                    <p>Estado: {selectedOrder.status}</p>
                                    <p>Drones Comprados:</p>
                                    <ul>
                                        {selectedOrder.order.map((item, index) => (
                                            <li key={index}>{item.id}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <p>No items found in the order.</p>
                            )}
                        </Modal.Body>
                    </Modal>

                    <Modal show={showChangeStateModal} onHide={handleCloseChangeStateModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cambiar estado de la Orden</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedOrder && (
                                <>
                                    <p>Selecccionar un nuevo estado de orden ID: {selectedOrder.id}</p>
                                    <Button variant="secondary" className="mx-1" onClick={() => handleChangeStatus(selectedOrder.id, 'PENDIENTE')}>
                                        PENDIENTE
                                    </Button>
                                    <Button variant="success" className="mx-1" onClick={() => handleChangeStatus(selectedOrder.id, 'COMPLETADO')}>
                                        COMPLETADO
                                    </Button>
                                    <Button variant="danger" className="mx-1" onClick={() => handleChangeStatus(selectedOrder.id, 'CANCELADO')}>
                                        CANCELADO
                                    </Button>
                                </>
                            )}
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderPage;
