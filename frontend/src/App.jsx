import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/MainPage';
import PageNotFound from './components/PageNotFound';
import Chat from './components/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import RegistrationPage from './components/Registration/RegistrationPage';
import routes from './utils/routes';

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Routes>
        <Route
          path={routes.chat}
          element={(
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
            )}
        />
        <Route path={`${routes.baseUrl}${routes.login}`} element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path={`${routes.signUp}`} element={<RegistrationPage />} />
      </Routes>
    </div>
    <ToastContainer />
  </Router>
);

export default App;
