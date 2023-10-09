import { Box, Button, Card, CardBody, Center, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, Tooltip, useToast } from "@chakra-ui/react"
import ErrorAlert from "../../components/alerts/ErrorAlert"
import { useEffect, useState } from "react"
import SuccessAlert from "../../components/alerts/SuccessAlert"
import { apiFetch } from "../../http-common/apiFetch"
import { useLocation, useNavigate, useNavigation, useParams } from "react-router"
import { InfoIcon } from "@chakra-ui/icons"
import CenterLayout from "../layouts/CenterLayout"
import LoadingPage from "../../components/LoadingPage"
import { getViolationField } from "../../utils"


const SendMailScreen = () => {

    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [isBusy, setIsBusy] = useState<boolean>(false)



    const onSendMail = async (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        setErrorMessage('')
        setSuccessMessage('')

        try {
            setIsBusy(true)
            await apiFetch(`/user/password-reset?email=${element.email.value}`, 'post', {})
            setSuccessMessage('Vérifier votre boite email')
        } catch (error: any) {
            console.log(error)
            setErrorMessage(JSON.parse(error.message))
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <>
            <Stack spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
                <Text as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="500">Mot de passe oublié</Text>
                <Text textAlign="center" color="gray">Ecrit ton email pour recevoir le lien de réinitialisation</Text>
            </Stack>
            <ErrorAlert message={errorMessage} />
            <SuccessAlert message={successMessage} />
            <Stack as="form" onSubmit={onSendMail} action="/login" spacing={5}>
                <FormControl isRequired>
                    <FormLabel fontSize="sm">Votre email</FormLabel>
                    <Input placeholder="email@email.fr" size="lg" type='email' id="email" name="email" />
                </FormControl>
                <Button isLoading={isBusy} type="submit" colorScheme="blue">Recevoir le email</Button>
            </Stack>
        </>
    )
}

interface ChangePasswordScreenInterface {
    params: any,
    navigate: any
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenInterface> = ({ params, navigate }) => {

    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isBusy, setIsBusy] = useState<boolean>()
    const [violations, setViolations] = useState<Array<any>>([])

    const toast = useToast()

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {
        try {
            setIsLoading(true)
            await apiFetch(`/user/password-reset?id=${params.id}&token=${params.token}`, 'post', {})
        } catch (error: any) {
            toast({
                description: error.message,
                status: 'error',
            })
            navigate('/login')
        } finally {
            setIsLoading(false)
        }
    }

    const onChangePassword = async (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        const form = e.target
        const plainPassword = element.plainPassword.value.trim();
        const confirmPassword = element.confirmPassword.value.trim();

        setSuccessMessage('')
        setErrorMessage('')
        setViolations([])
        try {
            setIsBusy(true)
            if (plainPassword !== confirmPassword) {
                throw new Error(JSON.stringify({
                    violations: [
                        {
                            propertyPath: 'confirmPassword',
                            message: 'Les mots de passe ne sont pas valides'
                        },
                    ]
                }))
            }
            await apiFetch(`/users/${params.id}/password-reset`, 'patch', {
                plainPassword: plainPassword
            })
            setSuccessMessage('Mot de passe modifier')
            form.reset()
        } catch (e: any) {
            console.log(e)
            if ('violations' in JSON.parse(e.message)) {
                setViolations(JSON.parse(e.message).violations)
            }
        }finally{
            setIsBusy(false)
        }
    }

    return !isLoading ? (
        <>
            <Stack spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
                <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="500">Réinitilisez le mot de passe</Text>
                <Text textAlign="center" color="gray">écris ton nouveau mot de passe</Text>
            </Stack>
            <ErrorAlert message={errorMessage} />
            <SuccessAlert message={successMessage} />
            <Stack as="form" onSubmit={onChangePassword}>
                <FormControl isRequired isInvalid={getViolationField(violations, 'plainPassword')}>
                    <FormLabel fontSize="sm" textTransform="uppercase">Mot de passe</FormLabel>
                    <Input placeholder="6+ caractères requis" size="lg" type='password' id="plainPassword" />
                    <FormErrorMessage> {getViolationField(violations, 'plainPassword')?.message} </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={getViolationField(violations, 'confirmPassword')}>
                    <FormLabel fontSize="sm" textTransform="uppercase">Confirmez le mot de passe</FormLabel>
                    <Input placeholder="6+ caractères requis" size="lg" type='password' id="confirmPassword" />
                    <FormErrorMessage>{getViolationField(violations, 'confirmPassword')?.message}</FormErrorMessage>
                </FormControl>
                <Button isLoading={isBusy} colorScheme="blue" type="submit">Réinitilisé le mot de passe</Button>
            </Stack>
        </>
    ) : <LoadingPage type="data" />


}


const PasswordReset = () => {

    const params = useParams()
    const navigate = useNavigate()

    const changePasswordScreen = params.id && params.token

    return (
        <CenterLayout>

            {
                !changePasswordScreen ? <SendMailScreen /> : <ChangePasswordScreen params={params} navigate={navigate} />
            }
        </CenterLayout>
    )
}

export default PasswordReset