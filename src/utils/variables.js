export const BASE_URL = process.env.REACT_APP_BASE_URL
export const BASE_URL_API = process.env.REACT_APP_API_BASE_URL

export const IMAGE_PATH =  BASE_URL + '/storage/images/'
export const AVATAR_PATH = BASE_URL + '/storage/avatars/'

export const UNKNOWN_USER = "Ancien membre"

export const SOCIAL_ICON_SIZE = 30

export const TOKEN = localStorage.getItem('token')

export const BEARER_HEADERS = {
    headers:{
        'Authorization' : `Bearer ${TOKEN}`
    }
}

export const REGISTER_MESSAGE = "Un email vous a été envoyé dans votre boite email afin de valider votre compte"
export const PASSWORD_RESET_SEND_EMAIL_MESSAGE = "Un lien de réinitilialisation vous à été envoyé dans votre boite email"
export const PASSWORD_UPDATED_SUCCESS_MESSAGE = "Mot de passe modifié"
export const ACCOUNT_VALIDATE_MESSAGE = "Votre compte a été validé"
export const VALIDATION_EMAIL_MESSAGE = "Votre email a été validé"
export const FORUM_RESUME = `Besoin d'aide ? Une information à partager ?
Discutez avec la communauté.
`;
