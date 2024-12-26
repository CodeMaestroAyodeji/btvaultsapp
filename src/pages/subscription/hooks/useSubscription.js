// src/pages/subscription/hooks/useSubscription.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../../config/envConfig';

export const useSubscription = () => {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlans = async () => {
    try {
      // First, get all plans
      const plansResponse = await axios.get(`${apiUrl}/api/subscriptions/plans`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPlans(plansResponse.data || []);

      // Then, get current user's subscription
      const currentSubResponse = await axios.get(`${apiUrl}/api/subscriptions/current`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (currentSubResponse.data) {
        setCurrentPlan(currentSubResponse.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch subscription plans');
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    currentPlan,
    loading,
    error,
    refetch: fetchPlans
  };
};