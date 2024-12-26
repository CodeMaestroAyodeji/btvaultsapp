// src/pages/subscription/plans/PlanComparison.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useSubscription } from '../hooks/useSubscription';
import PlanCard from './PlanCard';
import CurrentPlan from './CurrentPlan';
import PaymentModal from '../payment/PaymentModal';

const PlanComparison = () => {
  const { plans, currentPlan, loading, error } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading plans...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // Ensure plans is an array before mapping
  const availablePlans = Array.isArray(plans) ? plans : [];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  return (
    <div className="plan-comparison">
      <CurrentPlan plan={currentPlan} />
      {availablePlans.length === 0 ? (
        <Alert variant="info" className="mt-4">
          No subscription plans available at the moment.
        </Alert>
      ) : (
        <Row className="mt-4">
          {availablePlans.map(plan => (
            <Col key={plan._id} md={4}>
              <PlanCard
                plan={plan}
                isCurrentPlan={currentPlan?._id === plan._id}
                onSelectPlan={handleSelectPlan}
              />
            </Col>
          ))}
        </Row>
      )}
      {selectedPlan && (
        <PaymentModal
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default PlanComparison;