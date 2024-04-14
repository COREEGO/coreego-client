import Cookies from 'js-cookie';

export const BASE_URL = process.env.REACT_APP_BASE_URL
export const BASE_URL_API = process.env.REACT_APP_API_BASE_URL

export const IMAGE_PATH =  BASE_URL + '/storage/images/'
export const AVATAR_PATH = BASE_URL + '/storage/avatars/'

export const UNKNOWN_USER = "Ancien membre"


export const TOKEN = Cookies.get('coreegoAuthorization')

export const setToken = (token) => {
    console.log({token})
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (2 * 60 * 60 * 1000));
    Cookies.set('coreegoAuthorization', token, {expires: expirationDate} )
}

export const removeToken = () => {
    Cookies.remove('coreegoAuthorization')
}

export const BEARER_HEADERS = {
    headers:{
        'Authorization' : `Bearer ${TOKEN}`
    }
}

export const goToKakaoMapByLatLong = (title, latitude, longitude) => {
    return `https://map.kakao.com/link/to/${title},${latitude},${longitude}`
}