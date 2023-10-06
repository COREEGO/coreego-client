import { useCallback, useEffect, useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import { Navigate, useParams } from "react-router"
import LoadingPage from "../../components/LoadingPage"
import { Center, Fade, ScaleFade, Stack, Text, useToast } from "@chakra-ui/react"
import { CheckCircleIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"

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
                description: "Votre compte a été valider",
                status: 'success',
            })

        } catch (error: any) {
            toast({
                description: "Token non valide",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return <Navigate to="/login" replace={true} />
}

export default AccountVerifiedPage