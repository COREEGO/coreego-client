/** @format */
import axios from 'axios'

export async function apiFetch<T>(url: any, method: string, payload?: any): Promise<any> {


	let body : any = payload ? JSON.stringify(payload) : undefined;

	const headers : any = {
	  Accept: "application/json",
	};

	if (payload instanceof FormData) {
	  body = payload;
	} else {
	  headers["Content-Type"] = "application/json";
	}


	try {
	  const response = await axios({
		url:  process.env.NEXT_PUBLIC_API_URL + url,
		method,
		withCredentials: true,
		headers,
		data: body
	  });

	  if (response && "data" in response) {
		return response.data;
	  }
	} catch (e : any) {
		console.log('fauteee')
	  	throw new Error(e.message);
	}

	return null; // Return a default value if the response is not as expected
  }
