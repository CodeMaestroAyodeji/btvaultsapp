// src/pages/subscription/payment/PaymentModal.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';  
import PropTypes from 'prop-types';  
import { Modal, Button, Form, Alert } from 'react-bootstrap';  
import PaymentMethods from './PaymentMethods';  
import { usePayment } from '../hooks/usePayment';  

const PaymentModal = ({ show, onHide, plan }) => {  
  const [selectedMethod, setSelectedMethod] = useState('');  
  const [email, setEmail] = useState('');  
  const { initiatePayment, error, loading } = usePayment();  

  // Validate plan data when modal opens  
  useEffect(() => {  
    if (show && (!plan || !plan._id)) { // Change here from plan.id to plan._id  
      console.error('Invalid plan data:', plan);  
      onHide();  
    }  
  }, [show, plan, onHide]);  

  const handlePayment = async (e) => {  
    e.preventDefault();  
    
    // Debug log  
    console.log('Attempting to process payment...');  
  
    // Validate required fields  
    if (!selectedMethod || !email || !plan?._id) {  
      console.error('Missing required fields:', { selectedMethod, email, planId: plan?._id });  
      return;  
    }  
  
    const paymentData = {  
      planId: plan._id,  
      gateway: selectedMethod,  
      currency: plan.prices.usd ? 'usd' : 'ngn', // Assuming you have to choose one  
      amount: Number(plan.prices.usd.amount), // Reference the correct price  
      email,  
      metadata: {  
        planName: plan.name,  
        duration: plan.duration  
      },  
      callbackUrl: `${window.location.origin}/payment/callback`  
    };  
  
    console.log('Initiating payment with data:', paymentData); // Log the payment data  
  
    const success = await initiatePayment(paymentData);  
    
    if (success) {  
      onHide(); // Close the modal if payment is successful  
    } else {  
      console.error('Payment initiation failed');  
    }  
  };  

  if (!plan?._id) { // Change here from plan.id to plan._id  
    return null;  
  }  

  return (  
    <Modal show={show} onHide={onHide}>  
      <Modal.Header closeButton>  
        <Modal.Title>Upgrade to {plan.name}</Modal.Title>  
      </Modal.Header>  
      <Modal.Body>  
        <Form onSubmit={handlePayment}>  
          {error && <Alert variant="danger">{error}</Alert>}  
          
          <Form.Group className="mb-3">  
            <Form.Label>Email Address</Form.Label>  
            <Form.Control  
              type="email"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
              placeholder="Enter your email"  
              required  
            />  
          </Form.Group>  

          <PaymentMethods  
            selected={selectedMethod}  
            onSelect={setSelectedMethod}  
          />  
          
          <div className="payment-summary mt-4 mb-3 p-3 rounded">  
            <h6>Payment Summary</h6>  
            <div className="d-flex justify-content-between">  
              <span>Plan:</span>  
              <span>{plan.name}</span>  
            </div>  
            <div className="d-flex justify-content-between">  
              <span>Amount:</span>  
              <span>{plan.prices.usd ? `USD ${plan.prices.usd.amount}` : `NGN ${plan.prices.ngn.amount}`}</span> {/* Changed this line to pick the correct currency */}  
            </div>  
          </div>  

          <Button   
            type="submit"   
            variant="primary"   
            className="w-100 mt-3"  
            disabled={loading || !selectedMethod || !email}  
          >  
            {loading ? 'Processing...' : `Pay ${plan.prices.usd ? `USD ${plan.prices.usd.amount}` : `NGN ${plan.prices.ngn.amount}`}`} {/* Changed this line for consistency */}  
          </Button>  
        </Form>  
      </Modal.Body>  
    </Modal>  
  );  
};  

PaymentModal.propTypes = {  
  show: PropTypes.bool.isRequired,  
  onHide: PropTypes.func.isRequired,  
  plan: PropTypes.shape({  
    _id: PropTypes.string.isRequired, // Change here from id to _id  
    name: PropTypes.string.isRequired,  
    prices: PropTypes.object.isRequired, // Updated prices structure  
    limits: PropTypes.object.isRequired,  
    duration: PropTypes.number.isRequired // Updated to number for uniformity  
  }).isRequired,  
};  

export default PaymentModal;