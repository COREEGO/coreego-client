/** @format */
import axios from "axios";

export async function apiFetch<T>(
  url: any,
  method: string,
  payload?: any
): Promise<T | { data: any } | { error: any } | null> {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  let body: any = payload ? JSON.stringify(payload) : undefined;

  const token = localStorage.getItem("token");

  const headers: any = {
    Accept: "application/json",
  };

  if (payload instanceof FormData) {
    body = payload;
  } else if (method.toLocaleLowerCase() === "patch") {
    headers["Content-Type"] = "application/merge-patch+json";
  } else {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["authorization"] = "Bearer " + token;
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
  } catch (error: any) {
    console.log(error);
    if (error.response && error.response.data) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }

  return null; // Return a default value if the response is not as expected
}
