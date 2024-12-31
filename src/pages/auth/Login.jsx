// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Form } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import '../../assets/css/style.css';
import axios from 'axios'; 
import apiUrl from '../../config/envConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form Validation
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email and password are required!',
      });
      return;
    }

    if (!captchaValue) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please verify that you are not a robot!',
      });
      return;
    }

    try {
      // Make API request to login
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });

      // Successful login
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login successful!',
        });
        const { token, user } = response.data;

        // Save token and user role in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', user.isAdmin);

        // Navigate based on user role
        if (user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server-side errors
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message || 'Something went wrong!',
        });
      } else {
        // Network or client-side errors
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to connect to the server!',
        });
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        {/* Email Input */}
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="input-icon" />
        </Form.Group>

        {/* Password Input */}
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="input-icon" />
        </Form.Group>

        {/* Google reCAPTCHA */}
        <div className={'loginGrecaptchaBadge'}>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // Ensure this env variable is set
            onChange={(value) => setCaptchaValue(value)}
          />
        </div>

        {/* Login Button */}
        <Button variant="primary" type="submit" style={{ backgroundColor: '#ee4710' }}>
          Login
        </Button>
      </Form>

      {/* Forgot Password and Signup Links */}
      <div className="auth-links">
        <a href="/forgot-password">Forgot Password?</a>
        <span> | </span>
        <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;