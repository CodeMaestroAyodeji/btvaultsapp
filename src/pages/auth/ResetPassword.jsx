// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Form } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../config/envConfig'; // Import your API URL

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [token] = useState(new URLSearchParams(window.location.search).get('token'));
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Call to your API for password reset
    try {
      const response = await axios.post(`${apiUrl}/api/auth/reset-password`, {
        token,
        newPassword
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        }).then(() => {
          // Navigate to the login page after successful password reset
          navigate('/login');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message || 'Something went wrong!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!',
        });
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
    </div>
  );
};

export default ResetPassword;