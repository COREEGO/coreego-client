import { useEffect, useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import { useParams } from "react-router"



const AccountVerifiedPage = () => {

    const [isVerified, setIsVerified] = useState<boolean>(false)

    const params = useParams()

    useEffect(() => {

    }, [])

    const onVerifyAccount = async () => {
        try {
            await apiFetch(`/account-verified/${params.id}/${params.token}`, 'put')
        } catch (error) {
            setIsVerified(false)
        }
    }


    return (
        <>
            {
                isVerified ? <p>Votre compte est activé</p> : <p>Probleme lors de l'activation de votre compte</p>
            }
        </>

    )

}

export default AccountVerifiedPage