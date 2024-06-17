import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { GETPRODUCTS } from "../../utility/query.js";
import { useLazyQuery } from "@apollo/client";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [getProducts, { data: allProducts }] = useLazyQuery(GETPRODUCTS);

    useEffect(() => {
        if (!allProducts) {
            getProducts().then(r => r);
        } else {
            setProducts(allProducts.getProducts);
        }
    }, [allProducts, getProducts]);

    const addToCart = (product) => {
        let cart = JSON.parse(sessionStorage.getItem('cart')) || {};
        if (cart[product.id]) {
            cart[product.id].quantity += 1;
        } else {
            cart[product.id] = {
                ...product,
                quantity: 1
            };
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        setProducts(products.map(p =>
            p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        ));
    };

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
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>${product.price}</Card.Text>
                                <Card.Text>Stock: {product.stock}</Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock === 0}
                                >
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ShopPage;
