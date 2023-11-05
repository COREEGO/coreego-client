import { Box, Button, Card, CardBody, CardHeader, Center, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import SuccessAlert from "../../components/alerts/SuccessAlert"
import { InfoIcon } from "@chakra-ui/icons"
import PageTitle from "../../components/texts/TitleText"
import CenterLayout from "../layouts/CenterLayout"
import { REGISTER_MESSAGE } from "../../utils/messages"
import { getViolationField } from "../../utils"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { emailValidator, maxLengthValidator, minLengthValidatior, noEmptyValidator, passwordMatchValidator } from "../../utils/formValidation"
import { NavLink } from "react-router-dom"

type Inputs = {
    pseudo: string
    email: string
    password: string,
    confirmPassword: string,
    hasConfirmTerm: boolean
}

const RegisterPage: React.FC<any> = () => {

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
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

    return (
        <CenterLayout>
            <Card>
                <CardHeader>
                    <Stack spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
                        <Text as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={500}>Je crée mon compte</Text>
                        <Text textAlign="center" color="gray">Remplissez le formulaire pour créer votre compte</Text>
                    </Stack>
                </CardHeader>
                <CardBody>
                    <Stack>
                        {(isSubmitted && isSubmitSuccessful) && <SuccessAlert message={REGISTER_MESSAGE} />}
                        <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5}>
                            <FormControl isInvalid={errors.pseudo ? true : false}>
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }} textTransform="uppercase">Nom d'utilisateur</FormLabel>
                                <Input
                                    {...register('pseudo',
                                        { ...noEmptyValidator, ...minLengthValidatior(3), ...maxLengthValidator(20) }
                                    )}
                                    type='text' size="lg" minLength={3} maxLength={20} />
                                {errors.pseudo && <FormErrorMessage> {errors.pseudo.message} </FormErrorMessage>}
                            </FormControl>
                            <FormControl isInvalid={errors.email ? true : false}>
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }} >Votre email</FormLabel>
                                <Input
                                    {...register('email', { ...noEmptyValidator, ...emailValidator })}
                                    placeholder="email@email.fr" size="lg" type='email' />
                                {errors.email && <FormErrorMessage> {errors.email.message} </FormErrorMessage>}
                            </FormControl>
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
                            <FormControl isInvalid={errors.hasConfirmTerm ? true : false}>
                                <Checkbox
                                    {...register('hasConfirmTerm', { ...noEmptyValidator })}
                                >
                                    Je m'engage à publier des posts concernant la Corée Du Sud
                                </Checkbox>
                                {errors.hasConfirmTerm && <FormErrorMessage> {errors.hasConfirmTerm.message} </FormErrorMessage>}
                            </FormControl>
                            <Button isLoading={isSubmitting} type="submit" colorScheme="blue">S'inscrire</Button>
                        </Stack>
                        <Stack direction="row" justifyContent="center" flexWrap="wrap">
                            <Text>Vous avez un compte ?</Text>
                            <NavLink style={{ color: 'var(--coreego-blue)', fontWeight: 'bold' }} to="/login">
                                Connectez-vous ici
                            </NavLink>
                        </Stack>
                    </Stack>
                </CardBody>
            </Card>
        </CenterLayout>
    )
}

export default RegisterPage