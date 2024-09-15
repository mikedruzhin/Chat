import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link} from 'react-router-dom';
import { PageNotFound } from './Components/PageNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { MainPage } from './Components/Chat';
import { Button, Nav, Navbar } from 'react-bootstrap';
import RegistrationPage from './Components/Registration/RegistrationPage';

import { logoutUser } from './Components/slices/authSlice';

function App() {
  //const dispatch = useDispatch()

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    return (
      token ? children : <Navigate to="/login" state={{ from: location }} />
    );
  };

  return (

      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Routes>
            <Route path="/login" element={<RegistrationPage />} />
            <Route path="/" element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )} />
            <Route path="*" element={<PageNotFound />} /> 
          </Routes>
        </div>
      </BrowserRouter>

    
  );
}

export default App;
