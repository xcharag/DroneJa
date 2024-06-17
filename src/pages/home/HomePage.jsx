import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { FaStar, FaTags } from 'react-icons/fa';
import { PiDroneDuotone } from "react-icons/pi";
import { GETLASTADDEDPRODUCTS, GETMOSTSOLDPRODUCTS } from "../../utility/query.js";
import { useLazyQuery } from "@apollo/client";
import './HomePage.css';
import { useEffect, useState } from "react";

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);

    // Fetch the last added products
    const [getLastAddedProducts, { data: lastAddedProducts }] = useLazyQuery(GETLASTADDEDPRODUCTS);

    // Fetch the most sold products
    const [getMostSoldProducts, { data: mostSoldProducts }] = useLazyQuery(GETMOSTSOLDPRODUCTS);

    useEffect(() => {
        if (!lastAddedProducts) {
            getLastAddedProducts().then(r => r);
        } else {
            setFeaturedProducts(lastAddedProducts.getLastAddedProducts);
        }
    }, [lastAddedProducts, getLastAddedProducts]);

    useEffect(() => {
        if (!mostSoldProducts) {
            getMostSoldProducts().then(r => r);
        } else {
            setBestProducts(mostSoldProducts.getMostSoldProducts);
        }
    }, [mostSoldProducts, getMostSoldProducts]);

    return (
        <Container fluid>
            <Row className="my-4">
                <Col>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://res.cloudinary.com/dkr7q42ww/image/upload/s0whi9fxttnvbtkuhp29.jpg"
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
                                src="https://images.unsplash.com/photo-1525066087596-5249b898143c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTl8fHxlbnwwfHx8fHw%3D"
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
                {bestProducts.map(product => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.totalQuantity} Drones Vendidos</Card.Text>
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
