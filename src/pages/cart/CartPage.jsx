import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from "react";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || {};
        const items = Object.values(cart);
        setCartItems(items);
    }, []);

    const handleQuantityChange = (id, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        setCartItems(updatedItems);
        updateSessionStorage(updatedItems);
    };

    const handleRemoveItem = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
        updateSessionStorage(updatedItems);
    };

    const updateSessionStorage = (items) => {
        const cart = items.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {});
        sessionStorage.setItem('cart', JSON.stringify(cart));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container>
            <h1 className="my-4">Pagina Carrito</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ListGroup>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.id}>
                            <Row className="align-items-center">
                                <Col md={5}>
                                    <h5>{item.name}</h5>
                                </Col>
                                <Col md={3}>
                                    <span>${item.price}</span>
                                </Col>
                                <Col md={2}>
                                    <Form.Control
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        min="1"
                                    />
                                </Col>
                                <Col md={2}>
                                    <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                                        Borrar
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            <Row className="my-4">
                <Col className="text-right">
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    <Button variant="success" className="mt-3">
                        Proceder al Pago
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
