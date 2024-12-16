import React, { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import axios from 'axios';
import apiUrl from '../../config/envConfig';
import './MagnetLinkInput.css';

const MagnetLinkInput = () => {
    const [magnetLink, setMagnetLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    const handleAddMagnetLink = async () => {
        if (!magnetLink.trim()) {
            setAlertType('danger');
            setAlertMessage('Please enter a valid magnet link.');
            return;
        }

        setLoading(true);
        setAlertMessage('');
        try {
            await axios.post(
                `${apiUrl}/api/torrents/add-magnet`,
                { magnetLink },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            setAlertType('success');
            setAlertMessage('Magnet link added successfully!');
            setMagnetLink('');
        } catch (error) {
            console.error('Error adding magnet link:', error);
            setAlertType('danger');
            setAlertMessage('An error occurred while adding the magnet link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="magnet-link-container">
            <h2 className="title">Add Magnet Link</h2>

            {alertMessage && (
                <div
                    className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-danger'}`}
                    role="alert"
                >
                    {alertMessage}
                </div>
            )}

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter magnet link"
                    value={magnetLink}
                    onChange={(e) => setMagnetLink(e.target.value)}
                    disabled={loading}
                    className="input-text"
                />
                <button
                    onClick={handleAddMagnetLink}
                    disabled={loading}
                    className="btn btn-add"
                >
                    <FaLink className="icon" />
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </div>
        </div>
    );
};

export default MagnetLinkInput;
