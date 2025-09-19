
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedOTPRoute = ({ children }) => {
  const location = useLocation();
  const otpAllowed = sessionStorage.getItem('otpAllowed');
  const cameFromSignup = location.state?.fromSignup;
  
  if (!otpAllowed || !cameFromSignup) {
    return <Navigate to="/signup" replace />;
  }
  
  return children;
};

export default ProtectedOTPRoute;