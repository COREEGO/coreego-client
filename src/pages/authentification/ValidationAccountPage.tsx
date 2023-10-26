import { useCallback, useEffect, useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import { Navigate, useParams } from "react-router"
import LoadingPage from "../../components/LoadingPage"
import { Center, Fade, ScaleFade, Stack, Text, useToast } from "@chakra-ui/react"
import { CheckCircleIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { ACCOUNT_VALIDATE_MESSAGE } from "../../utils/variables"

const AccountVerifiedPage = () => {


    const params = useParams()
    const toast = useToast()

    useEffect(() => {
        onVerifyAccount()
    }, [])

    const onVerifyAccount = async () => {
        try {

            await apiFetch(`/user/validation/account?id=${params.id}&token=${params.token}`, 'post', {})

            toast({
                description: ACCOUNT_VALIDATE_MESSAGE,
                status: 'success',
            })

        } catch (error: any) {
            toast({ description: JSON.parse(error.message), status: 'error' })
        }
    }
    return <Navigate to="/login" replace={true} />
}

export default AccountVerifiedPage