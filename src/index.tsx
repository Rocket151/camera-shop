import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { fetchCamerasDataAction, fetchPromoDataAction } from './store/api-actions';

store.dispatch(fetchCamerasDataAction());
store.dispatch(fetchPromoDataAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
