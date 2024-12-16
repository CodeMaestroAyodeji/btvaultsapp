import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig';   
import { toast, ToastContainer } from 'react-toastify'; 
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
    <div>  
      <h2>Analytics Overview</h2>  
      {analyticsData ? (  
        <div>
          <p><strong>Free Users:</strong> {analyticsData.freeUsers}</p>  
          <p><strong>Premium Users:</strong> {analyticsData.premiumUsers}</p>  
          <p><strong>Total Users:</strong> {analyticsData.totalUsers}</p>  
          <p><strong>Total Storage Used:</strong> {analyticsData.storageUsed} GB</p>  
        </div>  
      ) : (  
        <p>Loading...</p>  
      )}  
      <ToastContainer />  
    </div>  
  );  
};  

export default Analytics;