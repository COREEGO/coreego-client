/** @format */
import axios from "axios";

export async function apiFetch<T>(
  url: any,
  method: string,
  payload?: any
): Promise<T | null> {

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  let body: any = payload ? JSON.stringify(payload) : undefined;

  const headers: any = {
    Accept: "application/json",
  };

  if (payload instanceof FormData) {
    body = payload;
  } else {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios({
      url: API_BASE_URL + url,
      method,
      withCredentials: true,
      headers,
      data: body,
    });

    if (response && "data" in response) {
      return response.data;
    }
  } catch (e: any) {
      throw new Error(e.response.data.error)
  }

  return null; // Return a default value if the response is not as expected
}
