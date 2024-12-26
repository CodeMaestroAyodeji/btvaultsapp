// src/pages/subscription/payment/PaymentModal.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import PaymentMethods from './PaymentMethods';
import { usePayment } from '../hooks/usePayment';

const PaymentModal = ({ show, onHide, plan }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const { initiatePayment, error, loading } = usePayment();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!selectedMethod) return;
    
    const success = await initiatePayment({
      planId: plan.id,
      gateway: selectedMethod,
      currency: plan.currency
    });

    if (success) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Upgrade to {plan.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlePayment}>
          {error && <Alert variant="danger">{error}</Alert>}
          <PaymentMethods
            selected={selectedMethod}
            onSelect={setSelectedMethod}
          />
          <Button 
            type="submit" 
            variant="primary" 
            className="w-100 mt-3"
            disabled={loading || !selectedMethod}
          >
            {loading ? 'Processing...' : `Pay ${plan.currency} ${plan.price}`}
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default PaymentModal;