// pages/auth/Signup.jsx

import React, { useState } from 'react';  
import { ToastContainer, toast } from 'react-toastify';  
import { Button, Form, Nav } from 'react-bootstrap';  
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';  
import { useNavigate } from 'react-router-dom';  // Import useNavigate  
import 'react-toastify/dist/ReactToastify.css';  
import '../../assets/css/style.css';  
import apiUrl from '../../config/envConfig';  
import axios from 'axios'; 

const Signup = () => {  
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate(); // Initialize useNavigate  
  
  const handleSignup = async (e) => {  
    e.preventDefault();  
  
    // Call to your API for signup  
    try {  
      const response = await axios.post(`${apiUrl}/api/auth/register`, {  
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
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message || 'Something went wrong!');
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('Something went wrong!');
      }
    }  
  };  

  return (  
    <div className="form-container">  
      <h2>Sign Up</h2>  
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

export default Signup;