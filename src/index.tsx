import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { swrConfig } from './http-common/swrConfig';
import moment from 'moment';
import 'moment/locale/fr';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

moment.locale('fr')

root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <SWRConfig value={swrConfig}>
        <App />
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
