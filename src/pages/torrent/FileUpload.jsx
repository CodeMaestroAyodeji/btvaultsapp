// pages/torrent/FileUpload.jsx

import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import apiUrl from '../../config/envConfig';
import './FileUpload.css';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setAlertMessage('');
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!selectedFile) {
            setAlertType('danger');
            setAlertMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('torrentFile', selectedFile);

        setLoading(true);
        try {
            await axios.post(`${apiUrl}/api/torrents/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setAlertType('success');
            setAlertMessage('File uploaded successfully!');
            setSelectedFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            setAlertType('danger');
            setAlertMessage('An error occurred while uploading the file.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="file-upload-container">
            <h2 className="file-upload-title">Upload Torrent File</h2>

            {alertMessage && (
                <div
                    className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-danger'}`}
                    role="alert"
                >
                    {alertMessage}
                </div>
            )}

            <div className="file-upload-input-group">
                <input
                    type="file"
                    onChange={handleFileChange}
                    disabled={loading}
                    className="file-upload-input-file"
                    aria-label="Select file"
                />
                <button
                    onClick={handleUpload}
                    disabled={loading || !selectedFile}
                    className="file-upload-btn btn-upload"
                >
                    <FaUpload className="file-upload-icon" />
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
