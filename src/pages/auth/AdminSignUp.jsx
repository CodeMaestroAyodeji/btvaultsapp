// pages/auth/AdminSignUp.jsx


import React, { useState } from 'react';  
import { ToastContainer, toast } from 'react-toastify';  
import { Button, Form, Nav } from 'react-bootstrap';  
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';  
import { useNavigate } from 'react-router-dom';  
import 'react-toastify/dist/ReactToastify.css';  
import '../../assets/css/style.css';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig'; 

const AdminSignUp = () => {  
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();  
  
  const handleSignup = async (e) => {  
    e.preventDefault();  
  
    try {  
      const response = await axios.post(`${apiUrl}/api/auth/create-admin`, {  
        name,
        email,
        password,
      });

      if (response.status === 201) {  // Check for a successful creation status
        toast.success(response.data.message);
        // Reset fields after successful signup
        setName('');
        setEmail('');
        setPassword('');

        // Navigate to login page after successful signup
        navigate('/login');
      } else {  
        toast.error(response.data.message);  
      }  
    } catch (error) {  
      if (error.response) {
        toast.error(error.response.data.message || 'Something went wrong!');
      } else if (error.request) {
        toast.error('No response from server. Please try again later.');
      } else {
        toast.error('Something went wrong!');
      }
    }  
  };  

  return (  
    <div className="form-container">  
      <h2>Admin Sign Up</h2>  
      <Form onSubmit={handleSignup}>  
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
          Sign Up  
        </Button>  
      </Form>  

      <Nav className="mt-3">  
        <Nav.Link href="/login">  
          Already have an account? Log In  
        </Nav.Link>  
      </Nav>  
      <ToastContainer />  
    </div>  
  );  
};  

export default AdminSignUp;