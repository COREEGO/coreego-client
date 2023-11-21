import { useEffect } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import { Navigate, useLocation, useParams } from "react-router"
import {  useToast } from "@chakra-ui/react"
import { ACCOUNT_VALIDATE_MESSAGE } from "../../utils/variables"

const VerifEmailPage = () => {


    const params = useParams()
    const location = useLocation()
    const toast = useToast()
    useEffect(() => {

        onVerifyAccount()
    }, [])

    const onVerifyAccount = async () => {
        console.log(params)
        try {
            await apiFetch(`/verify/email${location.search}`, 'get')
            toast({
                description: ACCOUNT_VALIDATE_MESSAGE,
                status: 'success',
            })

        } catch (error: any) {

            toast({ description: JSON.parse(error.message).data, status: 'error' })
        }
    }
    return <Navigate to="/login" />
}

export default VerifEmailPage