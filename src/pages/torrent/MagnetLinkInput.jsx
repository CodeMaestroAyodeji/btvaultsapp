import React, { useState } from 'react';  
import { FaLink } from 'react-icons/fa';  
import axios from 'axios';  
import apiUrl from '../../config/envConfig';  
import { toast } from 'react-toastify';  
import './MagnetLinkInput.css';  

const MagnetLinkInput = () => {  
    const [magnetLink, setMagnetLink] = useState('');  
    const [loading, setLoading] = useState(false);  

    const handleAddMagnetLink = async () => {  
        if (!magnetLink.trim()) {  
            toast.error('Please enter a valid magnet link.');  
            return;  
        }  

        setLoading(true);  
        try {  
            await axios.post(  
                `${apiUrl}/api/torrents/add-magnet`,  
                { magnetLink },  
                {  
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
                }  
            );  
            toast.success('Magnet link added successfully!');  
            setMagnetLink('');  
        } catch (error) {  
            console.error('Error adding magnet link:', error);  
            toast.error('An error occurred while adding the magnet link.');  
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