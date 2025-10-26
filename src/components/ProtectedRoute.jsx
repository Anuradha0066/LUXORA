import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('staffToken'); // check JWT token
  if (!token) return <Navigate to="/staff-login" replace />;
  return children;
}
