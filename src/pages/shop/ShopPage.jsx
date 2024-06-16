import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const products = [
    { id: 1, name: 'Drone A', price: 200, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Drone B', price: 350, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Drone C', price: 500, imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Drone D', price: 400, imageUrl: 'https://via.placeholder.com/150' },
];

const ShopPage = () => {
    return (
        <Container>
            <h1 className="my-4">Shop Page</h1>
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.imageUrl} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>${product.price}</Card.Text>
                                <Button variant="primary">Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ShopPage;
