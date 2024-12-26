// src/pages/subscription/plans/CurrentPlan.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { FaClock, FaCheckCircle } from 'react-icons/fa';

const CurrentPlan = ({ plan }) => {
  if (!plan) return null;

  return (
    <Card className="current-plan-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">
              <FaCheckCircle className="text-success me-2" />
              Current Plan: {plan.name}
            </h5>
            <p className="text-muted mb-0">
              <FaClock className="me-2" />
              Expires: {new Date(plan.expiryDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-end">
            <h6 className="mb-0">{plan.currency} {plan.price}/month</h6>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

CurrentPlan.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.shape({  // Make price optional
      amount: PropTypes.number,
      currency: PropTypes.string
    }),
    features: PropTypes.arrayOf(PropTypes.string),
    limits: PropTypes.shape({
      downloads: PropTypes.number,
      speed: PropTypes.number,
      storage: PropTypes.number
    })
  }).isRequired
};

export default CurrentPlan;