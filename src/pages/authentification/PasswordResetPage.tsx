import { Box, Button, Card, CardBody, Center, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, Tooltip } from "@chakra-ui/react"
import ErrorAlert from "../../components/alerts/ErrorAlert"
import { useEffect, useState } from "react"
import SuccessAlert from "../../components/alerts/SuccessAlert"
import { apiFetch } from "../../http-common/apiFetch"
import { useLocation, useNavigate, useNavigation, useParams } from "react-router"
import { InfoIcon } from "@chakra-ui/icons"


const SendMailScreen = () => {

    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')

    const onSendMail = async (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        setErrorMessage('')
        setSuccessMessage('')

        try {
            await apiFetch('/reset-password/sendmail', 'post', {
                email: element.email.value
            })
            setSuccessMessage('Vérifier votre boite email')
        } catch (error: any) {
            setErrorMessage(JSON.parse(error.message))
        }
    }

    return (
        <Stack maxW="100%" w={400} spacing={2} alignItems="center">
            <Text textAlign="center" as="h1" fontSize="4xl" fontWeight="bold" color="var(--coreego-blue)">Mot de passe <br /> oublié</Text>
            <ErrorAlert message={errorMessage} />
            <SuccessAlert message={successMessage} />
            <Card w="100%">
                <CardBody>
                    <Box as="form" onSubmit={onSendMail}>
                        <Stack alignItems="flex-start">
                            <FormControl>
                                <FormLabel textTransform="uppercase">Email</FormLabel>
                                <Input type='email' id="email" />
                            </FormControl>
                            <Button colorScheme="blue" type="submit">Envoyer</Button>
                        </Stack>
                    </Box>
                </CardBody>
            </Card>
        </Stack>
    )
}

interface ChangePasswordScreenInterface {
    params: any,
    navigate: any
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenInterface> = ({ params, navigate }) => {

    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')

    useEffect(() => {
        tokenValidation()
    }, [])

    const tokenValidation = async () => {
        try {
           await apiFetch(`/token-validation/${params.id}/${params.token}`, 'get');
        } catch (error : any) {
            navigate('/login')
        }
    }

    const onChangePassword = async (e:any) => {
        e.preventDefault()
        const element = e.target.elements
        setSuccessMessage('')
        setErrorMessage('')
        try {
            if(element.password.value !== element.confirmPassword.value){
                throw new Error("Les mots de passe doivent être identique")
            }
            await apiFetch(`/users-update/${params.id}/password`, 'put', {
                password : element.password.value
            })
            setSuccessMessage('Mot de passe modifier')
            setTimeout(() => {
                navigate('/login')
            }, 1500)
        } catch (error:any) {
            setErrorMessage(error.message)
        }
    }

    return (
        <Stack maxW="100%" w={400} spacing={2} alignItems="center">
            <Text textAlign="center" as="h1" fontSize="4xl" fontWeight="bold" color="var(--coreego-blue)">Réinitilisez le <br /> mot de passe</Text>
            <ErrorAlert message={errorMessage} />
            <SuccessAlert message={successMessage} />
            <Card w="100%">
                <CardBody>
                    <Box as="form" onSubmit={onChangePassword}>
                        <Stack alignItems="flex-start">
                            <FormControl>
                                <FormLabel textTransform="uppercase">Mot de passe</FormLabel>
                                <InputGroup>
                                    <Input type='password' id="password" />
                                    <InputRightElement>
                                        <Tooltip hasArrow label='Minimum 6 caractères, 1 caractère spétial, 1 nombre alpha numéric' bg='gray.300' color='black'>
                                            <InfoIcon />
                                        </Tooltip>
                                    </InputRightElement>
                                  </InputGroup>
                            </FormControl>
                            <FormControl>
                                    <FormLabel textTransform="uppercase">Confirmer le mot de passe</FormLabel>
                                    <Input type='password' id="confirmPassword" />
                            </FormControl>
                            <Button colorScheme="blue" type="submit">Réinitilisé le mot de passe</Button>
                        </Stack>
                    </Box>
                </CardBody>
            </Card>
        </Stack>
    )


}


const PasswordResetPage = () => {

    const params = useParams()
    const navigate = useNavigate()

    const changePasswordScreen = params.id && params.token

    return (
        <Center flexDirection="column">
            {
                !changePasswordScreen ? <SendMailScreen /> : <ChangePasswordScreen params={params} navigate={navigate} />
            }
        </Center>
    )
}

export default PasswordResetPage