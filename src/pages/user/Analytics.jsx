import { useEffect, useState } from 'react';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig';  
import { Card, Spinner, Alert, Row, Col } from 'react-bootstrap';  
import { FaDownload, FaDatabase, FaUpload, FaCloudUploadAlt, FaTachometerAlt, FaFileAlt } from 'react-icons/fa';  
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
                                        <Card.Title>Upload Speed</Card.Title>  
                                        <Card.Text>{analytics.uploadSpeed}</Card.Text>  
                                    </Card.Body>  
                                </Card>  
                            </Col>  
                            <Col md={6} lg={4}>  
                                <Card className="metric-card">  
                                    <Card.Body>  
                                        <FaFileAlt className="metric-icon" />  
                                        <Card.Title>Total Files</Card.Title>  
                                        <Card.Text>{analytics.totalFiles}</Card.Text>  
                                    </Card.Body>  
                                </Card>  
                            </Col>  
                            <Col md={6} lg={4}>  
                                <Card className="metric-card">  
                                    <Card.Body>  
                                        <FaUpload className="metric-icon" />  
                                        <Card.Title>Total Uploaded Files</Card.Title>  
                                        <Card.Text>{analytics.totalUploadedFiles}</Card.Text>  
                                    </Card.Body>  
                                </Card>  
                            </Col>
                            <Col md={6} lg={4}>  
                                <Card className="metric-card">  
                                    <Card.Body>  
                                        <FaDownload className="metric-icon" />  
                                        <Card.Title>Total Magnet Files</Card.Title>  
                                        <Card.Text>{analytics.totalMagnetFiles}</Card.Text>  
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
                    </>  
                )}  
            </Card.Body>  
        </Card>  
    );  
};  

export default Analytics;