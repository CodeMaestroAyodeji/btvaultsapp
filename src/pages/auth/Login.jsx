import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
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
      toast.error('Email and password are required!');
      return;
    }

    if (!captchaValue) {
      toast.error('Please verify that you are not a robot!');
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
        toast.success('Login successful!');
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
        toast.error(error.response.data.message || 'Something went wrong!');
      } else {
        // Network or client-side errors
        toast.error('Unable to connect to the server!');
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

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
