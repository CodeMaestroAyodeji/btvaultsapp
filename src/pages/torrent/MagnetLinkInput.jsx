import React, { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import axios from 'axios';
import apiUrl from '../../config/envConfig';
import Swal from 'sweetalert2';
import './MagnetLinkInput.css';

const MagnetLinkInput = () => {
    const [magnetLink, setMagnetLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddMagnetLink = async () => {
        if (!magnetLink.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid magnet link.',
            });
            return;
        }

        setLoading(true);
        try {
            // Debugging: Log the request data
            console.log('Request Data:', { magnetLink });
            console.log('Request Headers:', { Authorization: `Bearer ${localStorage.getItem('token')}` });

            await axios.post(
                `${apiUrl}/api/torrents/add-magnet`,
                { magnetLink },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Magnet link added successfully!',
            });
            setMagnetLink('');
        } catch (error) {
            console.error('Error adding magnet link:', error.response.data); // Log error response
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the magnet link.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="magnet-link-container">
            <h2 className="magnet_title">Add Magnet Link</h2>

            <div className="magnet_input-group">
                <input
                    type="text"
                    placeholder="Enter magnet link"
                    value={magnetLink}
                    onChange={(e) => setMagnetLink(e.target.value)}
                    disabled={loading}
                    className="magnet_input-text"
                />
                <button
                    onClick={handleAddMagnetLink}
                    disabled={loading}
                    className="magnet_btn magnet_btn-add"
                >
                    <FaLink className="magnet_icon" />
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </div>
        </div>
    );
};

export default MagnetLinkInput;