import { useEffect } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import { Navigate, useLocation, useParams } from "react-router"
import { ACCOUNT_VALIDATE_MESSAGE } from "../../utils/variables"
import { toast } from "react-toastify"

const EmailVerifyPage = () => {

    const location = useLocation()

    useEffect(() => {
        onVerifyAccount()
    }, [])

    const onVerifyAccount = async () => {
        try {
            await apiFetch(`/email-verify${location.search}`, 'post')

            toast.success("Votre email a été valider");

        } catch (error: any) {
            toast.error(JSON.parse(error?.message)?.message)
        }
    }
    return <Navigate to="/login" />
}

export default EmailVerifyPage