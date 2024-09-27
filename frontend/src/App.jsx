import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import LoginPage from './components/pages/LoginPage';
import PageNotFound from './components/pages/PageNotFound';
import Chat from './components/pages/Chat.jsx';
import QuitBtn from './components/QuitBtn';
import ProtectedRoute from './components/ProtectedRoute';
import SignUpPage from './components/pages/SignUpPage';
import routes from './utils/routes';
import AuthContext from './contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const logIn = (data) => {
    localStorage.setItem('user', data.username);
    localStorage.setItem('token', data.token);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ logIn, logOut }}>
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
            <Link to={routes.chat} className="navbar-brand">
              {t('chatName')}
            </Link>
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
