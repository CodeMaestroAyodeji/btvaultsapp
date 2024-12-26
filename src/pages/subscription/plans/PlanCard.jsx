// src/pages/subscription/plans/PlanCard.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';  
import PropTypes from 'prop-types';  
import { Card, Button } from 'react-bootstrap';  
import { FaCheck } from 'react-icons/fa';  
import './PlanCard.css';  

const PlanCard = ({ plan, isCurrentPlan, onSelectPlan }) => {  
  // Assuming you want to display the USD price  
  const currency = 'usd'; // You can change this to 'ngn' if needed  
  const amount = plan.prices[currency].amount;  

  return (  
    <Card className="plan-card">  
      <Card.Body>  
        <Card.Title>{plan.name}</Card.Title>  
        <div className="price">  
          {currency.toUpperCase()} 
          <span className='plan-amount'>
            {amount}<span className='plan-duration'>/month</span>
          </span>
            
        </div>  
        <ul className="features-list">  
          {Object.entries(plan.limits).map(([key, value]) => (  
            <li key={key}>  
              <FaCheck className="check-icon" /> {key}: {value}  
            </li>  
          ))}  
        </ul>  
        <Button   
          variant={isCurrentPlan ? "secondary" : "primary"}  
          disabled={isCurrentPlan}  
          onClick={() => onSelectPlan(plan)}  
        >  
          {isCurrentPlan ? 'Current Plan' : 'Upgrade'}  
        </Button>  
      </Card.Body>  
    </Card>  
  );  
};  

PlanCard.propTypes = {  
  plan: PropTypes.shape({  
    _id: PropTypes.string.isRequired,  
    name: PropTypes.string.isRequired,  
    prices: PropTypes.object.isRequired,  
    limits: PropTypes.object.isRequired,  
    duration: PropTypes.number.isRequired  
  }).isRequired,  
  isCurrentPlan: PropTypes.bool.isRequired,  
  onSelectPlan: PropTypes.func.isRequired,  
};  

export default PlanCard;