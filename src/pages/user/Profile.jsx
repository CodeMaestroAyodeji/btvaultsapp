// src/pages/user/Profile.jsx

import { useState, useEffect } from 'react';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig';  
import { Form, Button, Alert, Card } from 'react-bootstrap';  
import { toast } from 'react-toastify';  
import PropTypes from 'prop-types';  
import Settings from './Settings';  
import { FaUser, FaEnvelope, FaShieldAlt, FaCalendarAlt, FaRegStar, FaClock, FaUserCheck } from 'react-icons/fa';  
import './Profile.css';  

const Profile = ({ user }) => {  
    const [formData, setFormData] = useState({ ...user });  
    const [error, setError] = useState(null);  

    const handleProfileUpdate = async (e) => {  
        e.preventDefault();  
        try {  
            await axios.put(`${apiUrl}/api/users/profile`, formData, {  
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
            });  
            toast.success('Profile updated successfully!');  
        } catch (err) {  
            setError(err.response?.data?.error || 'Error updating profile');  
        }  
    };  

    return (  
        <Card className="profile-card">  
            <Card.Body>  
                <Card.Title>User Profile</Card.Title>  
                {error && <Alert variant="danger">{error}</Alert>}  
                <div className="profile-details">  
                    <div className="profile-item"><FaUser /> {formData.name}</div>  
                    <div className="profile-item"><FaEnvelope /> {formData.email}</div>  
                    <div className="profile-item"><FaShieldAlt /> {formData.isAdmin ? 'Admin' : 'Non Admin'}</div>  
                    <div className="profile-item"><FaCalendarAlt /> {new Date(formData.createdAt).toLocaleDateString()}</div>  
                    <div className="profile-item"><FaRegStar /> {formData.subscription}</div>  
                    <div className="profile-item"><FaClock /> {new Date(formData.subscriptionExpiry).toLocaleDateString()}</div>  
                    <div className="profile-item"><FaUserCheck /> {formData.isBlocked ? 'Blocked' : 'Active'}</div>  
                </div>  
                <Form onSubmit={handleProfileUpdate}>  
                    <Button variant="primary" type="submit" className="mt-3">Update Profile</Button>  
                </Form>  
                <Settings />  
            </Card.Body>  
        </Card>  
    );  
};  

// Prop Validation  
Profile.propTypes = {  
    user: PropTypes.shape({  
        name: PropTypes.string,  
        email: PropTypes.string,  
        isAdmin: PropTypes.bool,  
        createdAt: PropTypes.string,  
        subscription: PropTypes.string,  
        subscriptionExpiry: PropTypes.string,  
        isBlocked: PropTypes.bool,  
    }).isRequired,  
};  

export default Profile;
