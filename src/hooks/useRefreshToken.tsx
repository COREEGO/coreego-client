import { useAuthContext } from "../contexts/AuthProvider"
import { apiFetch } from "../http-common/apiFetch";


const useRefreshToken = () => {
    const {setUser} : any = useAuthContext()
    const refresh: any = async () => {
        const response : any = await apiFetch('/token/refresh', 'post', {
            refresh_token: localStorage.getItem('refresh_token')
        })
        if(response){
            console.log('ref:', response)
        }
        localStorage.setItem('token', response.token)
        localStorage.setItem('refresh_token', response.refresh_token)

        const me = await apiFetch('/me', 'get')
        if(me) setUser(me)

        return response.token;
    }

    return refresh
}

export default useRefreshToken