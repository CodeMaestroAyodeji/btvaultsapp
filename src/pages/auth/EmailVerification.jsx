import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

const EmailVerification = () => {
  const handleVerifyEmail = async () => {
    // Call to your API for email verification
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: new URLSearchParams(window.location.search).get('token') }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <h2>Email Verification</h2>
      <p>Please verify your email address.</p>
      <Button variant="primary" onClick={handleVerifyEmail} style={{ backgroundColor: '#ee4710' }}>
        Verify Email
      </Button>
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;
