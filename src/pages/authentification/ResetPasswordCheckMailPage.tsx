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
import Title from "../../components/texts/TitleText"
import { SubmitHandler, useForm } from "react-hook-form"
import { emailValidator, minLengthValidatior, noEmptyValidator, passwordMatchValidator } from "../../utils/formValidation"
import { PASSWORD_RESET_SEND_EMAIL_MESSAGE, PASSWORD_UPDATED_SUCCESS_MESSAGE } from "../../utils/variables"

type Inputs = {
    email: string,
    password: string,
    confirmPassword: string
}

interface ChangePasswordScreenInterface {
    params: any,
    navigate: any
}

const ResetPasswordCheckMailPage = () => {


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
            await apiFetch("/reset-password", 'post',{
                email: data.email
            })
            reset()
        } catch (error: any) {
            setError('email', {
                type: 'manual',
                message: JSON.parse(error).message
            })
        }
    }

    return (
        <CenterLayout>
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
        </CenterLayout>
    )
}

export default ResetPasswordCheckMailPage