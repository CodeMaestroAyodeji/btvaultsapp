// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import apiUrl from '../../config/envConfig'; // Import your API URL

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [token] = useState(new URLSearchParams(window.location.search).get('token'));

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Call to your API for password reset
    try {
      const response = await axios.post(`${apiUrl}/api/auth/reset-password`, {
        token,
        newPassword
      });
      
      if (response.status === 200) {
        toast.success(response.data.message);
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
      <h2>Reset Password</h2>
      <Form onSubmit={handleResetPassword}>
        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter new password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
          <FaLock />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ backgroundColor: '#ee4710' }}>
          Reset Password
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;