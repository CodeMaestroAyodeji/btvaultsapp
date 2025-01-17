import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig';   
import { toast, ToastContainer } from 'react-toastify';   
import { Card, Row, Col } from 'react-bootstrap';  
import { FaUsers, FaDatabase, FaCloudUploadAlt, FaCheckCircle, FaDownload, FaClipboardList } from 'react-icons/fa'; // Importing relevant icons  
import './Analytics.css';  

const Analytics = () => {  
  const [analyticsData, setAnalyticsData] = useState(null);  

  useEffect(() => {  
    const fetchAnalytics = async () => {  
      try {  
        const token = localStorage.getItem('token');  
        const response = await axios.get(`${apiUrl}/api/admin/analytics`, {  
          headers: { Authorization: `Bearer ${token}` },  
        });  
        setAnalyticsData(response.data);  
      } catch (error) {  
        toast.error('Failed to fetch analytics data');  
      }  
    };  
    fetchAnalytics();  
  }, []);  

  return (  
    <div className="analytics-container">  
      <h2>Analytics Overview</h2>  
      {analyticsData ? (  
        <Row className="mt-4">  
          <Col md={6} lg={3}>  
            <Card className="metric-card">  
              <Card.Body>  
                <FaUsers className="metric-icon" />   
                <Card.Title>Free Users</Card.Title>  
                <Card.Text>{analyticsData.freeUsers}</Card.Text>  
              </Card.Body>  
            </Card>  
          </Col>  
          <Col md={6} lg={3}>  
            <Card className="metric-card">  
              <Card.Body>  
                <FaCheckCircle className="metric-icon" />  
                <Card.Title>Premium Users</Card.Title>  
                <Card.Text>{analyticsData.premiumUsers}</Card.Text>  
              </Card.Body>  
            </Card>  
          </Col>  
          <Col md={6} lg={3}>  
            <Card className="metric-card">  
              <Card.Body>  
                <FaUsers className="metric-icon" />  
                <Card.Title>Total Users</Card.Title>  
                <Card.Text>{analyticsData.totalUsers}</Card.Text>  
              </Card.Body>  
            </Card>  
          </Col>  
          <Col md={6} lg={3}>  
            <Card className="metric-card">  
              <Card.Body>  
                <FaUsers className="metric-icon" />  
                <Card.Title>Admin Users</Card.Title>  {/* Add admin users card */}
                <Card.Text>{analyticsData.totalAdminUsers}</Card.Text>  
              </Card.Body>  
            </Card>  
          </Col>  
          <Col md={6} lg={3}>  
            <Card className="metric-card">  
              <Card.Body>  
                <FaDatabase className="metric-icon" />  
                <Card.Title>Total Storage Used</Card.Title>  
                <Card.Text>{analyticsData.storageUsed} GB</Card.Text> {/* Display rounded storage */}  
              </Card.Body>  
            </Card>  
          </Col>  
          <Col md={6} lg={3}>  
            <Card className="metric-card">  
              <Card.Body>  
                <FaCloudUploadAlt className="metric-icon" />  
                <Card.Title>Total Torrents</Card.Title>  
                <Card.Text>{analyticsData.totalTorrents}</Card.Text>  
              </Card.Body>  
            </Card>  
          </Col>  
          <Col md={6} lg={3}>  
            <Card className="metric-card">  
              <Card.Body>  
                <FaDownload className="metric-icon" />  
                <Card.Title>Total Downloads</Card.Title>  
                <Card.Text>{analyticsData.totalDownloads}</Card.Text>  
              </Card.Body>  
            </Card>  
          </Col>  
          <Col md={6} lg={3}>  
            <Card className="metric-card">  
              <Card.Body>  
                <FaClipboardList className="metric-icon" />  
                <Card.Title>Active Subscriptions</Card.Title>  
                <Card.Text>{analyticsData.totalActiveSubscriptions}</Card.Text>  
              </Card.Body>  
            </Card>  
          </Col>  
        </Row>  
      ) : (  
        <p>Loading...</p>  
      )}  
      <ToastContainer />  
    </div>  
  );  
};  

export default Analytics;