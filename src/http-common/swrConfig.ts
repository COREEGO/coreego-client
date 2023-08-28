import axiosCreate from './axiosConfig'

export const swrConfig = {
	fetcher: (url: string) => axiosCreate.get(url).then((res) => res.data),
};