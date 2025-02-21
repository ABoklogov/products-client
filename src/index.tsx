import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'store/index';
import App from 'components/App';
import { BrowserRouter } from 'react-router';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
