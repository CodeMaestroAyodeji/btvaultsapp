import React, { useState, useEffect } from 'react';   
import { FaUserCircle, FaUsers, FaSignOutAlt, FaChartBar, FaClipboardList } from 'react-icons/fa';  
import axios from 'axios';  
import { toast, ToastContainer } from 'react-toastify';  
import apiUrl from '../../config/envConfig';  
import 'react-toastify/dist/ReactToastify.css';  
import '../user/UserDashboard.css';
import './AdminDashboard.css';  
import Analytics from './Analytics';  
import SubscriptionManagement from './SubscriptionManagement';  
import UserManagement from './UserManagement';  
import Profile from '../user/Profile';  
import Torrents from '../torrent/Torrents';  

const UserDashboard = () => {  
    const [user, setUser] = useState({});  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [activeTab, setActiveTab] = useState("Torrents");   

    useEffect(() => {  
        const fetchUserProfile = async () => {  
            setLoading(true);  
            try {  
                const token = localStorage.getItem('token'); // Fetch token here  
                if (!token) {  
                  throw new Error('No authentication token found. Please log in again.');  
                }  

                const response = await axios.get(`${apiUrl}/api/users/profile`, {  
                    headers: { Authorization: `Bearer ${token}` },  
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

        fetchUserProfile();  
    }, []);   

    const handleLogout = () => {  
        localStorage.removeItem('token');  // Clear the token  
        setUser({}); // Clear user state  
        setActiveTab("Profile"); // Reset active tab or redirect to the login page  
        window.location.href = '/login'; // Redirect to login page  
        toast.success('Logged out successfully!'); // Optional: Notify logout success  
    };  

    const renderContent = () => {  
        switch (activeTab) {  
            case "Torrents": return <Torrents />; 
            case "Profile": return <Profile user={user} />;  
            case "Users": return <UserManagement />;  
            case "Analytics": return <Analytics />;  
            case "Subscription": return <SubscriptionManagement />;  
            default: return <Profile user={user} />; // Fallback to Profile  
        }  
    };  

    return (  
      <div className="dashboardContainer">  
        <div className="sidebar">  
            <div className="dashboardTabs">  
              {["Torrents", "Profile", "Users", "Subscription", "Analytics"].map(tab => (  
                <button  
                  key={tab}  
                  className={activeTab === tab ? "active" : ""}  
                  onClick={() => setActiveTab(tab)}  
                >  
                  {tab === "Torrents" && <FaUserCircle className='dashboardTabs-icon'/>}
                  {tab === "Profile" && <FaUserCircle className='dashboardTabs-icon'/>}  
                  {tab === "Users" && <FaUsers className='dashboardTabs-icon'/>}  
                  {tab === "Subscription" && <FaClipboardList className='dashboardTabs-icon'/>}  
                  {tab === "Analytics" && <FaChartBar className='dashboardTabs-icon'/>}  
                  {tab}  
                </button>  
              ))}  
              <div className="logoutSection">  
                  <button className="logoutBtn" onClick={handleLogout}>  
                      <FaSignOutAlt className='dashboardTabs-icon'/> Logout  
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