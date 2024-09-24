import ReactDOM from 'react-dom/client';
import init from './init';

const root = ReactDOM.createRoot(document.getElementById('root'));

const startApp = await init();
root.render(startApp);
