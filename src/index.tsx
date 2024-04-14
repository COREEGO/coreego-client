import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

moment.locale('fr')

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
axios.defaults.withCredentials = true


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
