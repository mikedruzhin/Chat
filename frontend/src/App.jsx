import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import LoginPage from './components/LoginPage';
import PageNotFound from './components/PageNotFound';
import Chat from './components/Chat';
import QuitBtn from './components/QuitBtn';
import ProtectedRoute from './components/ProtectedRoute';
import SignUpPage from './components/SignUpPage';
import routes from './utils/routes';
import AuthContext from './contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = (data) => {
    localStorage.setItem('user', data.username);
    localStorage.setItem('token', data.token);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href={routes.chat}>
              {t('chatName')}
            </a>
            <QuitBtn />
          </div>
        </nav>
        <AuthProvider>
          <Routes>
            <Route
              path={routes.chat}
              element={(
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
                )}
            />
            <Route path={`${routes.baseUrl}${routes.login}`} element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path={`${routes.signUp}`} element={<SignUpPage />} />
          </Routes>
        </AuthProvider>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
