import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { FaStar, FaTags } from 'react-icons/fa';
import { PiDroneDuotone } from "react-icons/pi";
import './HomePage.css';

const HomePage = () => {
    const featuredProducts = [
        { id: 1, name: 'Drone A', price: '$499', image: 'https://placehold.co/300x300' },
        { id: 2, name: 'Drone B', price: '$799', image: 'https://placehold.co/300x300' },
        { id: 3, name: 'Drone C', price: '$999', image: 'https://placehold.co/300x300' },
    ];

    const bestSellers = [
        { id: 1, name: 'Drone X', price: '$699', image: 'https://placehold.co/300x300' },
        { id: 2, name: 'Drone Y', price: '$599', image: 'https://placehold.co/300x300' },
        { id: 3, name: 'Drone Z', price: '$899', image: 'https://placehold.co/300x300' },
    ];

    return (
        <Container fluid>
            <Row className="my-4">
                <Col>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://placehold.co/600x400"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>Special Offer on Drone A</h3>
                                <p>Get 20% off on your first purchase!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://placehold.co/600x400"
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3>Latest Model - Drone B</h3>
                                <p>Experience the future of flying.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>

            <Row className="my-4">
                <Col>
                    <h2><PiDroneDuotone /> Productos Destacados</h2>
                </Col>
            </Row>
            <Row>
                {featuredProducts.map(product => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price}</Card.Text>
                                <Button variant="primary">Buy Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="my-4">
                <Col>
                    <h2><FaStar /> Drones mas vendidos</h2>
                </Col>
            </Row>
            <Row>
                {bestSellers.map(product => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price}</Card.Text>
                                <Button variant="primary">Buy Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="my-4">
                <Col>
                    <h2><FaTags /> Promociones!!</h2>
                    <p>Chequea las promociones y descuentos en drones seleccionados.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
