import React from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../utils/routes';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? (children) : (<Navigate to={`${routes.baseUrl}${routes.login}`} />);
};

export default ProtectedRoute;
