export const BASE_URL = process.env.REACT_APP_BASE_URL
export const BASE_URL_API = process.env.REACT_APP_API_BASE_URL

export const IMAGE_PATH =  BASE_URL + '/storage/images/'
export const AVATAR_PATH = BASE_URL + '/storage/avatars/'

export const UNKNOWN_USER = "Ancien membre"

export const TOKEN = localStorage.getItem('token')

export const BEARER_HEADERS = {
    headers:{
        'Authorization' : `Bearer ${TOKEN}`
    }
}
