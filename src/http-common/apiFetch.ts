import axios from "axios";
import axiosInstance from './axiosInstance'

export async function apiFetch<T>(
  url: string,
  method: string,
  payload?: any
): Promise<T | { data: any } | { error: any } | null> {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  let body: any = payload instanceof FormData ? payload : JSON.stringify(payload);


  const headers: any = {
    Accept: "application/json",
  };

  const access_token = localStorage.getItem('access_token');

    if (access_token) {
      headers["Authorization"] = `Bearer ${access_token}`;
    }

  if (payload instanceof FormData) {
    body = payload;
  } else if (method.toLowerCase() === "patch") {
    headers["Content-Type"] = "application/merge-patch+json";
  } else {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios({
      url: `${API_BASE_URL}${url}`,
      method,
      withCredentials: true,
      headers: { ...headers, ...axiosInstance.defaults.headers } ,
      data: body,
    });

    if ("data" in response) {
      return response.data;
    }
  } catch (error:any) {
    console.error(error);
    if (error.response && error.response.data) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }

  return null; // Return a default value if the response is not as expected
}