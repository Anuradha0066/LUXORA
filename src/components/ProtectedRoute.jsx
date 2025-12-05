import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('staffToken'); // JWT token

  if (!token) {
    // If not logged in, redirect to staff login
    return <Navigate to="/staff-login" replace />;
  }

  // Optionally: verify token expiry if needed

  return children;
};

export default ProtectedRoute;
