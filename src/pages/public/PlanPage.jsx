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
              <p className="price">Price: <span>{plan.price} {plan.currency}</span></p>  
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

      <div className="payment-options">  
        <h3>Select Payment Method:</h3>  
        <div className="payment-methods">  
          <PaymentMethodCard name="Paystack" icon="/icons/paystack.png" />  
          <PaymentMethodCard name="Flutterwave" icon="/icons/flutterwave.png" />  
          <PaymentMethodCard name="PayPal" icon="/icons/paypal.png" />  
          <PaymentMethodCard name="Stripe" icon="/icons/stripe.png" />  
        </div>  
      </div>  
      
      <ToastContainer />  
    </div>  
  );  
};  

const PaymentMethodCard = ({ name, icon }) => {  
  return (  
    <div className="payment-card">  
      <img src={icon} alt={`${name} logo`} className="payment-icon" />  
      <h4>{name}</h4>  
      <button className="btn">Pay with {name}</button>  
    </div>  
  );  
}  

export default PlanPage;