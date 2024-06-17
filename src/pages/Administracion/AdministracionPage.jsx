import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { GETBESTSELLERS, GETBESTCLIENTS } from "../../utility/query.js";
import { useQuery } from '@apollo/client';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AdministracionPage = () => {
    const { data: sellerData, loading: sellerLoading, error: sellerError } = useQuery(GETBESTSELLERS);
    const { data: clientData, loading: clientLoading, error: clientError } = useQuery(GETBESTCLIENTS);
    const [sellerChartData, setSellerChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Spent by Sellers',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    const [clientChartData, setClientChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Spent by Clients',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        if (sellerData && sellerData.getBestSellers) {
            const sellerLabels = sellerData.getBestSellers.map(seller => `${seller.name} ${seller.lastName}`);
            const sellerDataPoints = sellerData.getBestSellers.map(seller => seller.totalSpent);

            setSellerChartData({
                labels: sellerLabels,
                datasets: [
                    {
                        label: 'Total Spent by Sellers',
                        data: sellerDataPoints,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        }

        if (clientData && clientData.getBestClients) {
            const clientLabels = clientData.getBestClients.map(client => `${client.name} ${client.lastName}`);
            const clientDataPoints = clientData.getBestClients.map(client => client.totalSpent);

            setClientChartData({
                labels: clientLabels,
                datasets: [
                    {
                        label: 'Total Spent by Clients',
                        data: clientDataPoints,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [sellerData, clientData]);

    if (sellerLoading || clientLoading) return <p>Loading...</p>;
    if (sellerError) return <p>Error: {sellerError.message}</p>;
    if (clientError) return <p>Error: {clientError.message}</p>;

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 className="my-4">Panel de Control</h1>
                    <div className="mb-4">
                        <h3>Best Sellers Total Spent Histogram</h3>
                        <Bar data={sellerChartData} />
                    </div>
                    <div className="mb-4">
                        <h3>Best Clients Total Spent Histogram</h3>
                        <Bar data={clientChartData} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AdministracionPage;
