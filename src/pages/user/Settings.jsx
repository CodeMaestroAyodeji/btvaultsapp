// src/pages/user/Settings.jsx

import { useState } from 'react';  
import axios from 'axios';  
import { Form, Button, Card, Alert } from 'react-bootstrap';  
import { toast } from 'react-toastify';  
import apiUrl from '../../config/envConfig';  
import './Settings.css';  
import { FaLock, FaUserEdit, FaPhone, FaEnvelope } from 'react-icons/fa';  

const Settings = () => {  
    const [newPassword, setNewPassword] = useState('');  
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [name, setName] = useState('');  
    const [email, setEmail] = useState('');  
    const [phone, setPhone] = useState('');  
    const [error, setError] = useState(null);  

    const handleSettingsUpdate = async (e) => {  
        e.preventDefault();  
        setError(null);  
        try {  
            await axios.put(`${apiUrl}/api/user/settings`, { newPassword, name, email, phone }, {  
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
            });  
            toast.success('Settings updated successfully!');  
            setNewPassword('');  
            setConfirmPassword('');  
            setName('');  
            setEmail('');  
            setPhone('');  
        } catch (err) {  
            setError(err.response?.data?.error || 'Error updating settings');  
            toast.error(err.response?.data?.error || 'Error updating settings');  
        }  
    };  

    return (  
        <Card className="settings-card">  
            <Card.Body>  
                {/* <Card.Title>Settings</Card.Title>   */}
                {error && <Alert variant="danger">{error}</Alert>}  
                <Form onSubmit={handleSettingsUpdate}>  
                    <Form.Group controlId="formName">  
                        <Form.Label><FaUserEdit /> Change Name</Form.Label>  
                        <Form.Control  
                            type="text"  
                            placeholder="Enter your new name"  
                            value={name}  
                            onChange={(e) => setName(e.target.value)}  
                        />  
                    </Form.Group>  
                    <Form.Group controlId="formNewPassword">  
                        <Form.Label><FaLock /> New Password</Form.Label>  
                        <Form.Control  
                            type="password"  
                            placeholder="Enter new password"  
                            value={newPassword}  
                            onChange={(e) => setNewPassword(e.target.value)}  
                        />  
                    </Form.Group>  
                    <Form.Group controlId="formConfirmPassword">  
                        <Form.Label><FaLock /> Confirm New Password</Form.Label>  
                        <Form.Control  
                            type="password"  
                            placeholder="Confirm new password"  
                            value={confirmPassword}  
                            onChange={(e) => setConfirmPassword(e.target.value)}  
                        />  
                    </Form.Group>  
                    <Form.Group controlId="formEmail">  
                        <Form.Label><FaEnvelope /> Change Email</Form.Label>  
                        <Form.Control  
                            type="email"  
                            placeholder="Enter your new email"  
                            value={email}  
                            onChange={(e) => setEmail(e.target.value)}  
                        />  
                    </Form.Group>  
                    <Form.Group controlId="formPhone">  
                        <Form.Label><FaPhone /> Add Phone Number</Form.Label>  
                        <Form.Control  
                            type="text"  
                            placeholder="Enter your phone number"  
                            value={phone}  
                            onChange={(e) => setPhone(e.target.value)}  
                        />  
                    </Form.Group>  
                    <Button variant="primary" type="submit" className="mt-3">Update Settings</Button>  
                </Form>  
            </Card.Body>  
        </Card>  
    );  
};  

export default Settings;
