/** @format */
import axios from "axios";
import { toast } from "react-toastify";

export async function apiFetch<T>(
  url: any,
  method: string,
  payload?: any,
  isPrivateRoute?: boolean
): Promise<T | { data: any } | { error: any } | null> {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  let body: any = payload ? JSON.stringify(payload) : undefined;

  const headers: any = {
    Accept: "application/json",
  };

  if(isPrivateRoute){
    headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  }

  if (payload instanceof FormData) {
    headers['Content-type'] = "multipart/form-data"
    body = payload;
  } else if (method.toLocaleLowerCase() === "patch" || method.toLocaleLowerCase() === "put") {
    headers["Content-Type"] = "application/merge-patch+json";
  } else {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios({
      url: BASE_URL + url,
      method,
      withCredentials: true,
      headers,
      data: body,
    });

    if (response && "data" in response) {
      return response.data;
    }
  } catch (error: any) {
      throw new Error(JSON.stringify(error.response?.data));
  }

  return null; // Return a default value if the response is not as expected
}
