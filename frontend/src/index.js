import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import ReactDOM from 'react-dom/client';
import initI18n from './i18n';
import App from './App';
import store from './Components/slices/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
initI18n().then((i18n) => {
  root.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>,
  );
}).catch((error) => {
  console.error('Ошибка инициализации i18next:', error);
});
