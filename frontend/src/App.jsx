import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Components/MainPage';
import PageNotFound from './Components/PageNotFound';
import Chat from './Components/Chat';
import ProtectedRoute from './Components/ProtectedRoute';
import RegistrationPage from './Components/Registration/RegistrationPage';
import routes from './routes';
import { ProfanityProvider } from './Components/ProfanityContext';

const App = () => (
  <ProfanityProvider>
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
          <Route path={routes.loginPage} element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path={routes.signUpPage} element={<RegistrationPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  </ProfanityProvider>
);

export default App;
