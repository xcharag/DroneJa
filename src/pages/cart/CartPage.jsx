import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import {useState} from "react";

const initialCartItems = [
    { id: 1, name: 'Drone A', price: 200, quantity: 1 },
    { id: 2, name: 'Drone B', price: 350, quantity: 1 },
    { id: 3, name: 'Drone C', price: 500, quantity: 1 },
];

const CartPage = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleQuantityChange = (id, quantity) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
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
                                        Remove
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
                        Proceed to Checkout
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
