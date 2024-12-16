import React, { useEffect, useState } from 'react';  
import axios from 'axios';   
import apiUrl from '../../config/envConfig';   
import { toast, ToastContainer } from 'react-toastify';  
import './SubscriptionManagement.css';

const SubscriptionManagement = () => {  
  const [plans, setPlans] = useState([]);  
  const [newPlan, setNewPlan] = useState({ name: '', price: '', limits: { downloads: 0, speed: 0, storage: 0 } });

  useEffect(() => {  
    fetchPlans();  
  }, []);  
  
  const fetchPlans = async () => {  
    try {  
      const token = localStorage.getItem('token');  
      const response = await axios.get(`${apiUrl}/api/admin/plans`, {  
        headers: { Authorization: `Bearer ${token}` },  
      });  
      setPlans(response.data);  
    } catch (error) {  
      toast.error('Failed to fetch plans');  
    }  
  };  
  
  const createPlan = async (e) => {  
    e.preventDefault();  
    try {  
      const token = localStorage.getItem('token');  
      await axios.post(`${apiUrl}/api/admin/plans/create`, newPlan, {  
        headers: { Authorization: `Bearer ${token}` },  
      });  
      toast.success('Plan created successfully');  
      setNewPlan({ name: '', price: '', limits: { downloads: 0, speed: 0, storage: 0 } }); // Reset form
      fetchPlans();  
    } catch (error) {  
      toast.error('Error creating plan');  
    }  
  };  

  const deletePlan = async (id) => {  
    try {  
      const token = localStorage.getItem('token');  
      await axios.delete(`${apiUrl}/api/admin/plans/delete`, {   
        data: { planId: id },  
        headers: { Authorization: `Bearer ${token}` },  
      });  
      setPlans(plans.filter(plan => plan._id !== id));  
      toast.success('Plan deleted successfully');  
    } catch (error) {  
      toast.error('Error deleting plan');  
    }  
  };  

  return (  
    <div className="subscription-management">  
      <h2>Subscription Management</h2>  
      <div className="plan-cards">  
        {plans.map(plan => (  
          <div key={plan._id} className="plan-card">  
            <h3>{plan.name}</h3>  
            <p>Price: ${plan.price}</p>  
            <p>Downloads: {plan.limits.downloads}</p>  
            <p>Speed: {plan.limits.speed} Mbps</p>  
            <p>Storage: {plan.limits.storage} GB</p>  
            <button onClick={() => deletePlan(plan._id)} className="btn btn-danger">Delete</button>  
          </div>  
        ))}  
      </div>  
      <div className='create-plan'>  
        <h3>Create a New Plan</h3>  
        <form onSubmit={createPlan}>  
          <input 
            type="text" 
            value={newPlan.name} 
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })} 
            required 
            placeholder="Enter plan name" 
          />  
          <input 
            type="number" 
            value={newPlan.price} 
            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })} 
            required 
            placeholder="Enter plan price" 
          />  
          <input 
            type="number" 
            value={newPlan.limits.downloads} 
            onChange={(e) => setNewPlan({ ...newPlan, limits: { ...newPlan.limits, downloads: e.target.value } })} 
            required 
            placeholder="Max Downloads" 
          />  
          <input 
            type="number" 
            value={newPlan.limits.speed} 
            onChange={(e) => setNewPlan({ ...newPlan, limits: { ...newPlan.limits, speed: e.target.value } })} 
            required 
            placeholder="Download Speed (Mbps)" 
          />  
          <input 
            type="number" 
            value={newPlan.limits.storage} 
            onChange={(e) => setNewPlan({ ...newPlan, limits: { ...newPlan.limits, storage: e.target.value } })} 
            required 
            placeholder="Storage (GB)" 
          />  
          <button type="submit" className="btn btn-primary">Create Plan</button>  
        </form>  
      </div>  
      <ToastContainer />  
    </div>  
  );  
};  

export default SubscriptionManagement;
