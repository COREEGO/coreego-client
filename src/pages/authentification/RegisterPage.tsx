import { Box, Button, Card, CardBody, Center, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import SuccessAlert from "../../components/alerts/SuccessAlert"
import { InfoIcon } from "@chakra-ui/icons"
import PageTitle from "../../components/texts/Title"
import CenterLayout from "../layouts/CenterLayout"
import { REGISTER_MESSAGE } from "../../utils/messages"
import { getViolationField } from "../../utils"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
    pseudo: string
    email: string
    password: string,
    confirmPassword: string,
    hasConfirmTerm: boolean
}

const RegisterPage: React.FC<any> = () => {
    const [successMessage, setSuccessMessage] = useState<string>('')

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        getValues,
        reset
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch('/register', 'post', {
                pseudo: data.pseudo,
                email: data.email,
                hasConfirmTerm: data.hasConfirmTerm,
                plainPassword: data.password,
            })
            setSuccessMessage(REGISTER_MESSAGE)
            reset()
        } catch (error: any) {
            if ('violations' in JSON.parse(error.message)) {
                for (const violation of JSON.parse(error.message).violations) {
                    setError(violation.propertyPath, {
                        type: 'manual',
                        message: violation.message
                    })
                }
            }
        }
    }

    const passwordMatchValidator = () => {
        const { password, confirmPassword } = getValues();
        return password === confirmPassword || 'Les mots de passe ne correspondent pas.';
    };

    return (
        <CenterLayout>
            <Stack spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
                <Text as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={500}>Je crée mon compte</Text>
                <Text textAlign="center" color="gray">Remplissez le formulaire pour créer votre compte</Text>
            </Stack>
            <SuccessAlert message={successMessage} />
            <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5}>

                <FormControl isInvalid={errors.pseudo ? true : false}>
                    <FormLabel fontSize={{ base: 'sm', md: 'md' }} textTransform="uppercase">Nom d'utilisateur</FormLabel>
                    <Input
                        {...register('pseudo', {
                            required: 'Cette valeur ne doit pas être vide',
                            pattern: {
                                value: /\S/,
                                message: 'Cette valeur ne doit pas être vide'
                            },
                            minLength: { value: 3, message: 'Minimum 3 caratère' },
                            maxLength: { value: 20, message: "Maximum 20 caratère" }
                        })}
                        type='text' size="lg" minLength={3} maxLength={20} />
                    {errors.pseudo && <FormErrorMessage> {errors.pseudo.message} </FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.email ? true : false}>
                    <FormLabel fontSize={{ base: 'sm', md: 'md' }} >Votre email</FormLabel>
                    <Input
                        {...register('email', {
                            required: 'Cette valeur ne doit pas être vide',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Adresse email invalide',
                            }
                        })}
                        placeholder="email@email.fr" size="lg" type='email' />
                    {errors.email && <FormErrorMessage> {errors.email.message} </FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.password ? true : false}>
                    <FormLabel fontSize={{ base: 'sm', md: 'md' }} textTransform="uppercase">Mot de passe</FormLabel>
                    <Input
                        {...register('password', {
                            required: 'Cette valeur ne doit pas être vide',
                            minLength: { value: 6, message: '6+ caratères requis' }
                        })}
                        placeholder="6+ caractères requis" size="lg" type='password' />
                    {errors.password && <FormErrorMessage> {errors.password.message} </FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword ? true : false}>
                    <FormLabel fontSize={{ base: 'sm', md: 'md' }} textTransform="uppercase">Confirmez le mot de passe</FormLabel>
                    <Input
                        {...register('confirmPassword', {
                            required: 'Cette valeur ne doit pas être vide',
                            minLength: { value: 6, message: '6+ caratères requis' },
                            validate: passwordMatchValidator,
                        })}
                        placeholder="Confirmer le mot de passe" size="lg" type='password' id="confirmPassword" />
                    {errors.confirmPassword && <FormErrorMessage> {errors.confirmPassword.message} </FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.hasConfirmTerm ? true : false}>
                    <Checkbox
                        {...register('hasConfirmTerm', {
                            required: 'Vous devez valider les terms'
                        })}
                    >
                        Je m'engage à publier des posts concernant la Corée Du Sud
                    </Checkbox>
                    {errors.hasConfirmTerm && <FormErrorMessage> {errors.hasConfirmTerm.message} </FormErrorMessage>}
                </FormControl>
                <Button isLoading={isSubmitting} type="submit" colorScheme="blue">S'inscrire</Button>
            </Stack>
        </CenterLayout>
    )
}

export default RegisterPage