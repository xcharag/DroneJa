import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { FaStar, FaTags } from 'react-icons/fa';
import { PiDroneDuotone } from "react-icons/pi";
import { GETLASTADDEDPRODUCTS } from "../../utility/query.js";
import { useLazyQuery } from "@apollo/client";
import './HomePage.css';
import {useEffect, useState} from "react";

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);

    // Fetch the last added products
    const [getLastAddedProducts, { data: lastAddedProducts }] = useLazyQuery(GETLASTADDEDPRODUCTS);

    useEffect(() => {
        if (!lastAddedProducts) {
            getLastAddedProducts().then(r => r);
        } else {
            setFeaturedProducts(lastAddedProducts.getLastAddedProducts);
        }
    }, [lastAddedProducts, getLastAddedProducts]);

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
                    <h2><PiDroneDuotone /> Ultimos Lanzamientos</h2>
                </Col>
            </Row>
            <Row>
                {featuredProducts.map(product => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>{product.price} $</Card.Text>
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
                                <Card.Text>{product.price} $</Card.Text>
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
