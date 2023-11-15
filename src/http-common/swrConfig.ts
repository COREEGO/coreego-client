
import axios from "./axiosInstance";

export const swrConfig = {

	fetcher: (url: string) => axios.get(url).then((res) => res.data)
};