import React, { useState } from 'react';  
import { ToastContainer, toast } from 'react-toastify';  
import { Button, Form } from 'react-bootstrap';  
import { FaEnvelope, FaLock } from 'react-icons/fa';  
import 'react-toastify/dist/ReactToastify.css';  
import { useNavigate } from 'react-router-dom';  
import ReCAPTCHA from 'react-google-recaptcha';  
import '../../assets/css/style.css';  

const Login = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [captchaValue, setCaptchaValue] = useState(null);  
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error('Email and password are required!');
      return;
    }
  
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot!');
      return;
    }
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', data.user.isAdmin);
  
        if (data.user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };
    

  return (  
    <div className="form-container">  
      <h2>Login</h2>  
      <Form onSubmit={handleLogin}>  
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
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}  
            onChange={(value) => setCaptchaValue(value)}  
          />  
        </div>  

        <Button variant="primary" type="submit" style={{ backgroundColor: '#ee4710' }}>  
          Login  
        </Button>  
      </Form>  

      {/* Links for Forgot Password and Sign Up */}  
      <div className="auth-links">  
        <a href="/forgot-password">Forgot Password?</a>  
        <span> | </span>  
        <a href="/signup">Sign Up</a>  
      </div>  
      
      <ToastContainer />  
    </div>  
  );  
};  

export default Login;