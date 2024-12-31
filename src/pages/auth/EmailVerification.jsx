import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../config/envConfig';

const EmailVerification = () => {
  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    try {
      const token = new URLSearchParams(window.location.search).get('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Token not found in URL!',
        });
        return;
      }

      const response = await axios.post(`${apiUrl}/api/auth/verify-email`, { token });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        }).then(() => {
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

  // Automatically verify email when the component mounts
  useEffect(() => {
    handleVerifyEmail();
  }, []);

  return (
    <div className="form-container">
      <h2>Email Verification</h2>
      <p style={{ color: '#ee4710' }}>Verifying your email address...</p>
    </div>
  );
};

export default EmailVerification;