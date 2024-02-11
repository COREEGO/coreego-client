import { Button, FormControl, Text, FormErrorMessage, FormLabel, Input, Stack, useToast, Card, CardHeader, CardBody } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router"
import { apiFetch } from "../../http-common/apiFetch"
import { noEmptyValidator, minLengthValidatior, passwordMatchValidator } from "../../utils/formValidation"
import { PASSWORD_UPDATED_SUCCESS_MESSAGE } from "../../utils/variables"
import { SubmitHandler, useForm } from "react-hook-form"
import Title from "../../components/texts/TitleText"


type Inputs = {
    password: string,
    confirmPassword: string
}


const UpdatePasswordPage = () => {

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

    const params = useParams()
    const toast = useToast()
    const navigate = useNavigate()

    const [tokenInfo, setTokenInfo] = useState<any>()

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await apiFetch(`/reset-password/reset/${params.token}`, 'get')
                if (response) setTokenInfo(response)
                reset()
            } catch (error: any) {
                toast({
                    description: JSON.parse(error?.message)?.data.message,
                    status: 'error'
                })
                navigate('/login')
            }
        }
        checkToken()
    }, [])

    if (!params.token) {
        toast({
            description: 'Pas de token trouvé',
            status: 'error'
        })
        return <Navigate to="/login" />
    }

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch(`/user/${tokenInfo.userId}/password?token=${tokenInfo.token}`, 'put', {
                plainPassword: data.password
            })
        } catch (error: any) {
            console.log(JSON.parse(error.message))
        }
    }

    return (
        <>de</>
        // <CenterLayout>
        //     <Card>
        //         <CardHeader>
        //             <Stack textAlign="center" spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
        //                 <Title text="Réinitilisez du mot de passe" />
        //                 <Text color="gray">Nouveau nouveau mot de passe</Text>
        //             </Stack>
        //         </CardHeader>
        //         <CardBody>
        //             <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        //                 {(isSubmitted && isSubmitSuccessful) && <SuccessAlert message={PASSWORD_UPDATED_SUCCESS_MESSAGE} />}
        //                 <FormControl isInvalid={errors.password ? true : false}>
        //                     <FormLabel fontSize={{ base: 'sm', md: 'md' }} textTransform="uppercase">Mot de passe</FormLabel>
        //                     <Input
        //                         {...register('password', { ...noEmptyValidator, ...minLengthValidatior(6) })}
        //                         placeholder="6+ caractères requis" size="lg" type='password' />
        //                     {errors.password && <FormErrorMessage> {errors.password.message} </FormErrorMessage>}
        //                 </FormControl>
        //                 <FormControl isInvalid={errors.confirmPassword ? true : false}>
        //                     <FormLabel fontSize={{ base: 'sm', md: 'md' }} textTransform="uppercase">Confirmez le mot de passe</FormLabel>
        //                     <Input
        //                         {...register('confirmPassword', {
        //                             ...noEmptyValidator,
        //                             validate: () => passwordMatchValidator(getValues().password, getValues().confirmPassword)
        //                         }
        //                         )}
        //                         placeholder="Confirmer le mot de passe" size="lg" type='password' />
        //                     {errors.confirmPassword && <FormErrorMessage> {errors.confirmPassword.message} </FormErrorMessage>}
        //                 </FormControl>
        //             <Button isLoading={isSubmitting} colorScheme="blue" type="submit">Réinitilisé le mot de passe</Button>
        //             </Stack>
        //         </CardBody>
        //     </Card>
        // </CenterLayout>
    )
}

export default UpdatePasswordPage