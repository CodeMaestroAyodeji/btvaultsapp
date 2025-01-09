// pages/torrent/FileUpload.jsx

import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import apiUrl from '../../config/envConfig';
import Swal from 'sweetalert2';
import './FileUpload.css';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle file upload
    const handleUpload = async () => {  
        if (!selectedFile) {  
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a file to upload.',
            });
            return;  
        }  
    
        const formData = new FormData();  
        formData.append('torrentFile', selectedFile); // Ensure this matches backend  
    
        setLoading(true);  
        try {  
            await axios.post(`${apiUrl}/api/torrents/upload`, formData, {  
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
            });  
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'File uploaded successfully!',
            });
            setSelectedFile(null);  
        } catch (error) {  
            console.error('Error uploading file:', error.response.data); // Log error response  
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while uploading the file.',
            });
        } finally {  
            setLoading(false);  
        }  
    };

    return (
        <div className="file-upload-container">
            <h2 className="file-upload-title">Upload Torrent File</h2>

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