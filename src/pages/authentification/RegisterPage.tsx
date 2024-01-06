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
import { NavLink, useNavigate } from "react-router-dom"
import { Box, Card, CardHeader, Container, FormControl, Stack, TextField, Typography, CardContent, FormHelperText, CardActions } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { toast } from "react-toastify"


type Inputs = {
    pseudo: string
    email: string
    password: string,
    confirmPassword: string,
    hasConfirmTerm: boolean
}

const RegisterPage: React.FC<any> = () => {

    const navigate = useNavigate()

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
            const response: any = await apiFetch('/register', 'post', {
                pseudo: data.pseudo,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword
            })
            reset()
            toast.success(response.message)
            navigate('/login')
        } catch (error: any) {
            if ('errors' in JSON.parse(error.message)) {
                const errors = JSON.parse(error.message).errors;
                for (const field in errors) {
                    if (errors.hasOwnProperty(field)) {
                        const messages = errors[field];
                        for (const message of messages) {
                            setError(field as any, {
                                type: 'manual',
                                message: message
                            })
                        }
                    }
                }
            }
        }
    }

    return (
        <Container>
            <Card sx={{ my: 5, mx: 'auto', width: 600, maxWidth: '100%' }}>
                <CardHeader
                    sx={{ textAlign: 'center' }}
                    title="Je crée mon compte"
                    subheader="Remplissez le formulaire pour créer votre compte"
                />
                <CardContent>
                    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
                        <FormControl fullWidth>
                            <TextField
                                label="Pseudo"
                                placeholder="Votre pseudo"
                                error={errors.pseudo ? true : false}
                                autoFocus
                                required
                                {...register('pseudo',
                                    { ...noEmptyValidator, ...minLengthValidatior(3), ...maxLengthValidator(20) }
                                )}
                            />
                            {errors.pseudo && <FormHelperText id="component-error-text">{errors.pseudo.message}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label="Adresse email"
                                error={errors.email ? true : false}
                                autoFocus
                                required
                                {...register('email', { ...noEmptyValidator, ...emailValidator })}
                                placeholder="email@email.fr" type='email'
                            />
                            {errors.email && <FormHelperText id="component-error-text">{errors.email.message}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label="Mot de passe"
                                error={errors.password ? true : false}
                                autoFocus
                                required
                                {...register('password', { ...noEmptyValidator, ...minLengthValidatior(6) })}
                                placeholder="6+ caractères requis"
                                type='password'
                            />
                            {errors.password && <FormHelperText id="component-error-text">{errors.password.message}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label="Confirmez votre mot de passe"
                                error={errors.password ? true : false}
                                autoFocus
                                required
                                {...register('confirmPassword', {
                                    ...noEmptyValidator,
                                    validate: () => passwordMatchValidator(getValues().password, getValues().confirmPassword)
                                }
                                )}
                                placeholder="6+ caractères requis"
                                type='password'
                            />
                            {errors.confirmPassword && <FormHelperText id="component-error-text">{errors.confirmPassword.message}</FormHelperText>}
                        </FormControl>
                        <LoadingButton variant="contained" loading={isSubmitting} type="submit">Je m'inscris</LoadingButton>
                    </Stack>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                    <NavLink style={{ color: 'var(--coreego-blue)'}} to="/login">
                        Connectez-vous ici
                    </NavLink>
                </CardActions>
                {/* <CardBody> */}
                {/* <Stack>
                        {(isSubmitted && isSubmitSuccessful) && <SuccessAlert message={REGISTER_MESSAGE} />}
                        <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5}>
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
                </CardBody> */}
            </Card>
        </Container>
    )
}

export default RegisterPage