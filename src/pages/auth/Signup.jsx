// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Nav } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/style.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Call to your API for signup
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        // Reset fields after successful signup
        setName('');
        setEmail('');
        setPassword('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Call to your API for login
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        // Handle successful login (e.g., redirect or set user state)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      <Form onSubmit={isLogin ? handleLogin : handleSignup}>
        {!isLogin && (
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <FaUser className='form-icon'/>
          </Form.Group>
        )}
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <FaEnvelope className='form-icon' />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <FaLock className='form-icon' />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ backgroundColor: '#ee4710' }}>
          {isLogin ? 'Log In' : 'Sign Up'}
        </Button>
      </Form>
      <Nav className="mt-3">
        <Nav.Link onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Log In'}
        </Nav.Link>
      </Nav>
      <ToastContainer />
    </div>
  );
};

export default Auth;
