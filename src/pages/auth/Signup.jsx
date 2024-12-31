import React, { useState } from 'react';  
import Swal from 'sweetalert2';  
import { Button, Form, Nav } from 'react-bootstrap';  
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';  
import { useNavigate } from 'react-router-dom';  
import 'sweetalert2/src/sweetalert2.scss';  
import '../../assets/css/style.css';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig'; 

const Signup = () => {  
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();  
  
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
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message || 'User registered successfully. Please verify your email.',
        });
        // Reset fields after successful signup  
        setName('');  
        setEmail('');  
        setPassword('');  
  
        // Navigate to login page after successful signup  
        navigate('/login');  
      } else {  
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Registration failed.',
        });
      }  
    } catch (error) {  
      if (error.response) {
        // Server responded with a status outside the 2xx range
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message || 'Something went wrong!',
        });
      } else if (error.request) {
        // No response was received
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No response from server. Please try again later.',
        });
      } else {
        // Something happened while setting up the request
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
    </div>  
  );  
};  

export default Signup;