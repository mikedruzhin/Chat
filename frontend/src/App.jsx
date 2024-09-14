import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link} from 'react-router-dom';
import { PageNotFound } from './Components/PageNotFound';
import { MainPage } from './Components/MainPage';
import { Button, Nav, Navbar } from 'react-bootstrap';
import RegistrationPage from './Components/Registration/RegistrationPage';
import AuthContext from './contexts';
import useAuth from './hooks/index';

function App() {
  const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
  
    const logIn = () => setLoggedIn(true);
    const logOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('isLogged');
      setLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
        {children}
      </AuthContext.Provider>
    );
  };

  const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    const token = localStorage.getItem('token');
    const location = useLocation();
    return (
      token ? children : <Navigate to="/login" state={{ from: location }} />
    );
  };

  const AuthButton = () => {
    const auth = useAuth();
    const location = useLocation();
    const isLogged = localStorage.getItem('isLogged');
    return (
      isLogged
        && <Button onClick={auth.logOut}>Log out</Button>
    );
  };

  return (
    <AuthProvider>
      <BrowserRouter>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Hexlet Chat</a>
          <AuthButton />
        </div>
      </nav>
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
    </AuthProvider>
    
  );
}

export default App;
