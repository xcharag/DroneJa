import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

const AdministracionPage = () => {
    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [30, 20, 40, 50, 60, 70],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Revenue',
                data: [100, 200, 300, 400, 500, 600],
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
            },
        ],
    };

    const pieData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: 'Traffic Sources',
                data: [300, 50, 100],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 className="my-4">Panel de Control</h1>
                    <div className="mb-4">
                        <h3>Sales Bar Chart</h3>
                        <Bar data={barData} />
                    </div>
                    <div className="mb-4">
                        <h3>Revenue Line Chart</h3>
                        <Line data={lineData} />
                    </div>
                    <div className="mb-4">
                        <h3>Traffic Sources Pie Chart</h3>
                        <Pie data={pieData} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AdministracionPage;
