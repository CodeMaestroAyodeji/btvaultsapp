// src/pages/subscription/payment/PaymentMethods.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { FaCreditCard } from 'react-icons/fa';

const PaymentMethods = ({ selected, onSelect }) => {
  const methods = [
    { id: 'paystack', name: 'Paystack', icon: FaCreditCard },
    { id: 'flutterwave', name: 'Flutterwave', icon: FaCreditCard }
  ];

  return (
    <div className="payment-methods">
      <Form.Group>
        <Form.Label>Select Payment Method</Form.Label>
        {methods.map(method => (
          <div key={method.id} className="payment-method-option">
            <Form.Check
              type="radio"
              id={method.id}
              name="paymentMethod"
              label={
                <span className="d-flex align-items-center">
                  <method.icon className="me-2" />
                  {method.name}
                </span>
              }
              checked={selected === method.id}
              onChange={() => onSelect(method.id)}
            />
          </div>
        ))}
      </Form.Group>
    </div>
  );
};

PaymentMethods.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PaymentMethods;