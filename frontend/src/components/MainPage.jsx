import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Form from './LoginPage';
import Navigation from './Navigation';
import routes from '../utils/routes';

const Login = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.users.token);

  useEffect(() => {
    if (!token) {
      navigate(`${routes.baseUrl}${routes.login}`);
    }
  }, [navigate, token]);
  return (
    <>
      <Navigation />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <Form />
        </div>
      </div>
    </>
  );
};

export default Login;
