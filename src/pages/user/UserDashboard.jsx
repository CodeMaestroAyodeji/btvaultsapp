import React, { useState, useEffect } from 'react'; 
import { FaUserCircle, FaSignOutAlt, FaChartBar, FaCloudDownloadAlt, FaFolderOpen } from 'react-icons/fa';  
import axios from 'axios';  
import Files from '../torrent/FileList';  
import Analytics from './Analytics';  
import Profile from './Profile';  
import Torrents from '../torrent/Torrents';  
import { toast } from 'react-toastify';  
import { ToastContainer } from 'react-toastify';  
import apiUrl from '../../config/envConfig';  
import 'react-toastify/dist/ReactToastify.css';  
import './UserDashboard.css';

const UserDashboard = () => {  
    const [user, setUser] = useState({});  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [activeTab, setActiveTab] = useState("Torrents"); // Default active tab

    useEffect(() => {  
        fetchUserProfile();  
    }, []); 

    const fetchUserProfile = async () => {  
        setLoading(true);  
        try {  
            const response = await axios.get(`${apiUrl}/api/users/profile`, {  
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
            });  
            setUser(response.data);  
            toast.success('User profile fetched successfully!');  
        } catch (err) {  
            const message = err.response?.data?.error || 'Error fetching user profile';  
            setError(message);  
            toast.error(message);  
        } finally {  
            setLoading(false);  
        }  
    };  

    const handleLogout = () => {  
        localStorage.removeItem('token');  
        window.location.reload(); // Redirect to login or refresh  
    };  

    const renderContent = () => {
        switch (activeTab) {
            case "Torrents":
                return <Torrents />;
            case "Analytics":
                return <Analytics />;
            case "Files":
                return <Files />;
            case "Profile":
                return <Profile user={user} />;
            default:
                return <Torrents />;
        }
    };

    return (
      <div className="dashboardContainer">
        <div className="sidebar">  
            <div className="dashboardTabs">
              <button
                  className={activeTab === "Torrents" ? "active" : ""}
                  onClick={() => setActiveTab("Torrents")}
              >
                  <FaCloudDownloadAlt /> Torrents
              </button>
              <button
                  className={activeTab === "Files" ? "active" : ""}
                  onClick={() => setActiveTab("Files")}
              >
                  <FaFolderOpen /> My Files
              </button>
              <button
                  className={activeTab === "Analytics" ? "active" : ""}
                  onClick={() => setActiveTab("Analytics")}
              >
                  <FaChartBar /> Analytics
              </button>
              <button
                  className={activeTab === "Profile" ? "active" : ""}
                  onClick={() => setActiveTab("Profile")}
              >
                  <FaUserCircle /> Profile
              </button>
              <div className="logoutSection">
                  <button className="logoutBtn" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                  </button>
              </div>
            </div>
        </div>
        <div className="dashboardContent">  
            {loading && <div className="spinner">Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && (
              <div className="contentArea">{renderContent()}</div>
            )}
        </div>
        <ToastContainer />
      </div>
    );  
};  

export default UserDashboard;
