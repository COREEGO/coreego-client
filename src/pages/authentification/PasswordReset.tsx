import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, Tooltip, useToast } from "@chakra-ui/react"
import ErrorAlert from "../../components/alerts/ErrorAlert"
import { useEffect, useState } from "react"
import SuccessAlert from "../../components/alerts/SuccessAlert"
import { apiFetch } from "../../http-common/apiFetch"
import { useLocation, useNavigate, useNavigation, useParams } from "react-router"
import { InfoIcon } from "@chakra-ui/icons"
import CenterLayout from "../layouts/CenterLayout"
import LoadingPage from "../../components/LoadingPage"
import { getViolationField } from "../../utils"
import Title from "../../components/texts/Title"
import { SubmitHandler, useForm } from "react-hook-form"
import { emailValidator, minLengthValidatior, noEmptyValidator, passwordMatchValidator } from "../../utils/formValidation"
import { PASSWORD_RESET_SEND_EMAIL_MESSAGE, PASSWORD_UPDATED_SUCCESS_MESSAGE } from "../../utils/variables"

type Inputs = {
    email: string,
    password: string,
    confirmPassword: string
}

const SendMailScreen = () => {


    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
        reset
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch(`/user/password-reset?email=${data.email.trim()}`, 'post', {})
            reset()
        } catch (error: any) {
            setError('email', {
                type: 'manual',
                message: JSON.parse(error.message)
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <Stack textAlign="center" spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
                    <Title text="Mot de passe oublié" />
                    <Text color="gray">Ecrit ton email pour recevoir le lien de réinitialisation</Text>
                </Stack>
            </CardHeader>
            <CardBody>
                <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        {(isSubmitted && isSubmitSuccessful) && <SuccessAlert message={PASSWORD_RESET_SEND_EMAIL_MESSAGE} />}
                        <FormControl isInvalid={errors.email ? true : false}>
                            <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Votre email</FormLabel>
                            <Input
                                {...register('email', { ...noEmptyValidator, ...emailValidator })}
                                placeholder="email@email.fr" size="lg" type='email' />
                            {errors.email && <FormErrorMessage> {errors.email.message} </FormErrorMessage>}
                        </FormControl>
                    </Stack>
                    <Button isLoading={isSubmitting} type="submit" colorScheme="blue">Recevoir le email</Button>
                </Stack>
            </CardBody>

        </Card>
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

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
        reset
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

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

    const onChangePassword: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch(`/users/${params.id}/password-reset`, 'patch', {
                plainPassword: data.password
            })
        } catch (error: any) {
                console.log(JSON.parse(error.message))
        }
    }

    return !isLoading ? (
        <>
            <Stack spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
                <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="500">Réinitilisez le mot de passe</Text>
                <Text textAlign="center" color="gray">écris ton nouveau mot de passe</Text>
            </Stack>
            {(isSubmitted && isSubmitSuccessful) && <SuccessAlert message={PASSWORD_UPDATED_SUCCESS_MESSAGE} />}
            <Stack as="form" onSubmit={handleSubmit(onChangePassword)}>
                <FormControl isInvalid={errors.password ? true : false}>
                    <FormLabel fontSize={{ base: 'sm', md: 'md' }} textTransform="uppercase">Mot de passe</FormLabel>
                    <Input
                        {...register('password', { ...noEmptyValidator, ...minLengthValidatior(6) })}
                        placeholder="6+ caractères requis" size="lg" type='password' />
                    {errors.password && <FormErrorMessage> {errors.password.message} </FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword ? true : false}>
                    <FormLabel fontSize={{ base: 'sm', md: 'md' }} textTransform="uppercase">Confirmez le mot de passe</FormLabel>
                    <Input
                        {...register('confirmPassword', {
                            ...noEmptyValidator,
                            validate: () => passwordMatchValidator(getValues().password, getValues().confirmPassword)
                        }
                        )}
                        placeholder="Confirmer le mot de passe" size="lg" type='password' />
                    {errors.confirmPassword && <FormErrorMessage> {errors.confirmPassword.message} </FormErrorMessage>}
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