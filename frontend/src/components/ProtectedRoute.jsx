import React from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../utils/routes';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={`${routes.baseUrl}${routes.login}`} />;
  }

  return children;
};

export default ProtectedRoute;
