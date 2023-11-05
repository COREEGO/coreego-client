import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const headers : any = {}

if(localStorage.getItem('token')){
  headers['Authorization'] =  "Bearer " + localStorage.getItem('token')
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: headers,
  withCredentials: true,
});

export default axiosInstance; // Export the configured Axios instance
