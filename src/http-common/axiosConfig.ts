import axios from "axios";


export default axios.create({
  headers: {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
  }
});