// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Call to your API for forgot password
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <Form onSubmit={handleForgotPassword}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <FaEnvelope />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ backgroundColor: '#ee4710' }}>
          Send Reset Link
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
