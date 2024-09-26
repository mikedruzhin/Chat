import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import React from 'react';
import App from './App';
import store from './slices/index';
import 'react-toastify/dist/ReactToastify.css';
import ru from './components/locales/ru';
import filter from './utils/filter.js';
import socket from './utils/socket.js';

const resources = {
  ru,
};

export const Context = React.createContext({});

const i18n = i18next.createInstance();

const init = async () => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  const rollbar = {
    accessToken: process.env.REACT_APP_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <Provider store={store}>
      <RollBarProvider config={rollbar}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <Context.Provider value={{ filter, socket }}>
              <App />
            </Context.Provider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollBarProvider>
    </Provider>
  );
};

export default init;
