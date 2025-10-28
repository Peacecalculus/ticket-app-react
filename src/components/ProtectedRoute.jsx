import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/helpers';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
