import { useEffect, useState } from 'react';  
import { Bar } from 'react-chartjs-2';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig';  
import { Card, Spinner, Alert, Row, Col, ListGroup } from 'react-bootstrap';  
import { FaDownload, FaDatabase, FaCloudUploadAlt, FaTachometerAlt, FaFileAlt } from 'react-icons/fa';  
import './Analytics.css';  

const Analytics = () => {  
    const [analytics, setAnalytics] = useState({});  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
        const fetchAnalytics = async () => {  
            try {  
                const response = await axios.get(`${apiUrl}/api/users/analytics`, {  
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
                });  
                setAnalytics(response.data);  
            } catch (err) {  
                console.error('Error fetching analytics:', err);  
                setError('Error fetching analytics data');  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchAnalytics();  
    }, []);  

    const chartData = {  
        labels: ['Total Downloads'],  
        datasets: [  
            {  
                label: 'Downloads',  
                data: [analytics.totalDownloadedFiles || 0],  
                backgroundColor: 'rgba(75, 192, 192, 0.6)',  
            },  
        ],  
    };  

    return (  
        <Card className="analytics-card">  
            <Card.Body>  
                <Card.Title>User Analytics</Card.Title>  
                {loading ? (  
                    <div className="loading-container">  
                        <Spinner animation="border" variant="primary" />  
                        <span className="loading-text">Loading analytics...</span>  
                    </div>  
                ) : error ? (  
                    <Alert variant="danger">{error}</Alert>  
                ) : (  
                    <>  
                        <Row className="mt-4">
                            <Col md={6} lg={4}>
                                <Card className="metric-card">
                                    <Card.Body>
                                        <FaDatabase className="metric-icon" />
                                        <Card.Title>Total Storage</Card.Title>
                                        <Card.Text>{analytics.totalStorage} GB</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} lg={4}>
                                <Card className="metric-card">
                                    <Card.Body>
                                        <FaTachometerAlt className="metric-icon" />
                                        <Card.Title>Total Used</Card.Title>
                                        <Card.Text>{analytics.totalUsed} GB</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} lg={4}>
                                <Card className="metric-card">
                                    <Card.Body>
                                        <FaCloudUploadAlt className="metric-icon" />
                                        <Card.Title>Download Speed</Card.Title>
                                        <Card.Text>{analytics.downloadSpeed}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} lg={4}>
                                <Card className="metric-card">
                                    <Card.Body>
                                        <FaFileAlt className="metric-icon" />
                                        <Card.Title>Total Magnet Files</Card.Title>
                                        <Card.Text>{analytics.totalMagnetFiles}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} lg={4}>
                                <Card className="metric-card">
                                    <Card.Body>
                                        <FaDownload className="metric-icon" />
                                        <Card.Title>Total Uploaded Files</Card.Title>
                                        <Card.Text>{analytics.totalUploadedFiles}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} lg={4}>
                                <Card className="metric-card">
                                    <Card.Body>
                                        <FaDownload className="metric-icon" />
                                        <Card.Title>Total Downloaded Files</Card.Title>
                                        <Card.Text>{analytics.totalDownloadedFiles}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Bar data={chartData} />  
                    </>  
                )}  
            </Card.Body>  
        </Card>  
    );  
};  

export default Analytics;
