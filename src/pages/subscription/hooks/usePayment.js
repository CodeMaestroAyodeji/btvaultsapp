// src/pages/subscription/hooks/usePayment.js

import { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../../config/envConfig';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async ({ planId, gateway, currency }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${apiUrl}/api/subscriptions/payment/initiate`,
        { planId, gateway, currency },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.error || 'Payment initiation failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    initiatePayment,
    loading,
    error
  };
};