import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import React from 'react';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import App from './App';
import store from './slices/index';
import 'react-toastify/dist/ReactToastify.css';
import ru from './components/locales/ru';
import SocketContext from './contexts/SocketContext';

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

  const socket = io();

  filter.reset();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const rollbar = {
    accessToken: process.env.REACT_APP_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <React.StrictMode>
      <RollBarProvider config={rollbar}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <SocketContext.Provider value={socket}>
              <Provider store={store}>
                <App />
              </Provider>
            </SocketContext.Provider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollBarProvider>
    </React.StrictMode>
  );
};

export default init;
