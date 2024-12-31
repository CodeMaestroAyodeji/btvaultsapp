import React from 'react';  
import { ToastContainer, toast } from 'react-toastify';  
import { Button } from 'react-bootstrap';  
import { useNavigate } from 'react-router-dom'; // Import useNavigate 
import axios from 'axios'; 
import apiUrl from '../../config/envConfig';  

const EmailVerification = () => {  
  const navigate = useNavigate(); // Initialize useNavigate  

  const handleVerifyEmail = async () => {  
    // Call to your API for email verification  
    try {  
      const response = await axios.post(`${apiUrl}/api/auth/verify-email`, {  
        token: new URLSearchParams(window.location.search).get('token')  
      });  

      if (response.status === 200) {  
        toast.success(response.data.message);  
        
        // Navigate to login page upon successful verification  
        navigate('/login');  
      } else {  
        toast.error(response.data.message);  
      }  
      
    } catch (error) {  
      if (error.response) {
        toast.error(error.response.data.message || 'Something went wrong!');
      } else {
        toast.error('Something went wrong!');
      }  
    }  
  };  

  return (  
    <div className="form-container">  
      <h2>Email Verification</h2>  
      <p style={{ color: '#ee4710' }}>Please verify your email address.</p>  
      <Button variant="primary" onClick={handleVerifyEmail} style={{ backgroundColor: '#ee4710' }}>  
        Verify Email  
      </Button>  
      <ToastContainer />  
    </div>  
  );  
};  

export default EmailVerification;