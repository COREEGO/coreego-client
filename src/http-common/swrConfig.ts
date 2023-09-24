
import axiosInstance from "./axiosInstance";

export const swrConfig = {
	fetcher: (url: string) => axiosInstance.get(url).then((res) => res.data)
};