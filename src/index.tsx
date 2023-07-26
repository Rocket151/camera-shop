import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import { store } from './store';
import { fetchCamerasDataAction, fetchPromoDataAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import { getCamerasDataWithRating } from './cameras-data-adapter/cameras-data-adapter';
import { addCamerasData } from './store/cameras-data/cameras-data';

store.dispatch(fetchCamerasDataAction());
store.dispatch(fetchPromoDataAction());
const camerasDataWithRating = await getCamerasDataWithRating();
store.dispatch(addCamerasData(camerasDataWithRating));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
