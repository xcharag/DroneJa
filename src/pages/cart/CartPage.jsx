import { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button, Form, Dropdown } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { NEWORDER } from "../../utility/mutation.js";
import jsPDF from "jspdf";
import QRCode from "qrcode.react"; // Import the QR code library

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(""); // State for selected payment method
    const [cardDetails, setCardDetails] = useState({ number: "", expDate: "", ccv: "" }); // State for card details
    const [newOrder] = useMutation(NEWORDER);

    useEffect(() => {
        const cart = JSON.parse(sessionStorage.getItem("cart")) || {};
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
        sessionStorage.setItem("cart", JSON.stringify(cart));
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleNewOrder = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method before proceeding.");
            return;
        }

        const orderItems = cartItems.map(item => ({ id: item.id, quantity: item.quantity, name: item.name }));
        try {
            const resp = await newOrder({
                variables: {
                    input: {
                        client: JSON.parse(localStorage.getItem("user")).id,
                        seller: JSON.parse(localStorage.getItem("user")).associatedSeller,
                        order: orderItems,
                        status: "PENDIENTE",
                        total: totalPrice,
                        methodPayment: paymentMethod
                    }
                }
            });
            console.log(resp);
            alert("Order placed successfully!");
            generatePDF();
            sessionStorage.removeItem("cart");
            setCartItems([]);
        } catch (error) {
            console.error(error);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Factura", 10, 10);
        doc.text("Productos", 10, 20);
        cartItems.forEach((item, index) => {
            doc.text(`${item.name} - ${item.quantity} x $${item.price}`, 10, 30 + index * 10);
        });
        doc.text(`Total: $${totalPrice.toFixed(2)}`, 10, 30 + cartItems.length * 10);
        doc.save("factura.pdf");
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
                <Col md={6}>
                    <Form.Group controlId="paymentMethod">
                        <Form.Label>Metodo de Pago</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {paymentMethod ? paymentMethod : "Seleccione una opción"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handlePaymentMethodChange("QR")}>
                                    Pagar con QR
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePaymentMethodChange("TARJETA")}>
                                    Pagar con tarjeta
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    {paymentMethod === "QR" && (
                        <QRCode value="https://cataas.com/cat" size={128} />
                    )}
                    {paymentMethod === "TARJETA" && (
                        <Form>
                            <Form.Group controlId="cardNumber">
                                <Form.Label>Numero de tarjeta</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={cardDetails.number}
                                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="expDate">
                                <Form.Label>Fecha de Expiracion</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={cardDetails.expDate}
                                    onChange={(e) => setCardDetails({ ...cardDetails, expDate: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="ccv">
                                <Form.Label>CCV</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={cardDetails.ccv}
                                    onChange={(e) => setCardDetails({ ...cardDetails, ccv: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Col>
                <Col className="text-right">
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    <Button variant="success" className="mt-3" onClick={handleNewOrder}>
                        Proceder al Pago
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
