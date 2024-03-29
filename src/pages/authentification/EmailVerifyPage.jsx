import { useEffect } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import { Navigate, useLocation, useParams } from "react-router"
import { ACCOUNT_VALIDATE_MESSAGE, VALIDATION_EMAIL_MESSAGE } from "../../utils/variables"
import { toast } from "react-toastify"
import axios from "axios"

const EmailVerifyPage = () => {

    const location = useLocation()

    useEffect(() => {
        onVerifyAccount()
    }, [])

    const onVerifyAccount = async () => {
        try {
            await axios.post(`/email-verify${location.search}`)

            toast.success(VALIDATION_EMAIL_MESSAGE);

        } catch (error) {
            toast.error(error?.data?.message)
        }
    }
    return <Navigate to="/login" />
}

export default EmailVerifyPage