import React from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../utils/routes';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  return auth.loggedIn ? (children) : (<Navigate to={`${routes.baseUrl}${routes.login}`} />);
};

export default ProtectedRoute;
