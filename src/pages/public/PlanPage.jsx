import React, { useEffect, useState } from 'react';  
import axios from 'axios';   
import apiUrl from '../../config/envConfig';   
import { toast, ToastContainer } from 'react-toastify';  
import './PlanPage.css'; // Import your CSS file for styling

const PlanPage = () => {  
  const [plans, setPlans] = useState([]);  

  useEffect(() => {  
    fetchPlans();  
  }, []);  
  
  const fetchPlans = async () => {  
    try {  
      const response = await axios.get(`${apiUrl}/api/plan-list`); // Adjust the endpoint as needed
      setPlans(response.data);  
    } catch (error) {  
      toast.error('Failed to fetch plans');  
    }  
  };  

  return (  
    <div className="public-plan-page">  
      <h2>Available Subscription Plans</h2>  
      <div className="plan-cards">  
        {plans.length > 0 ? (
          plans.map(plan => (  
            <div key={plan._id} className="plan-card">  
              <h3>{plan.name}</h3>  
              <p className="price">Price: <span>${plan.price}</span></p>  
              <p>Downloads: {plan.limits.downloads}</p>  
              <p>Speed: {plan.limits.speed} Mbps</p>  
              <p>Storage: {plan.limits.storage} GB</p>  
              <button className="btn">Choose Plan</button>  
            </div>  
          ))
        ) : (
          <p>No plans available at the moment.</p>
        )}  
      </div>  
      <ToastContainer />  
    </div>  
  );  
};  

export default PlanPage;
