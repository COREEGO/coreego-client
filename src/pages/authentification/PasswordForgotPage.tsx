import ErrorAlert from "../../components/alerts/ErrorAlert"
import { useEffect, useState } from "react"
import SuccessAlert from "../../components/alerts/SuccessAlert"
import { apiFetch } from "../../http-common/apiFetch"
import { useLocation, useNavigate, useNavigation, useParams } from "react-router"
import { InfoIcon } from "@chakra-ui/icons"
import LoadingPage from "../../components/LoadingPage"
import { getViolationField } from "../../utils"
import Title from "../../components/texts/TitleText"
import { SubmitHandler, useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, Container, Stack, TextField, FormControl, FormHelperText } from "@mui/material"
import { emailValidator, minLengthValidatior, noEmptyValidator, passwordMatchValidator } from "../../utils/formValidation"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"
import { useSearchParams } from "react-router-dom"

type Inputs = {
    email: string,
    password: string,
    confirmPassword: string
}

const ChangePassword = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

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
            const response: any = await apiFetch('/reset-password', 'post', {
                password: data.password,
                email: data.email,
                token: searchParams.get('token'),
                password_confirmation: data.confirmPassword
            })
            reset()
            toast.success(response.message)
            navigate('/login')
        } catch (error: any) {
           toast.error(JSON.parse(error.message).message)
        }
    }

    return (
        <Container>
            <Card sx={{ my: 5, mx: 'auto', width: 600, maxWidth: '100%' }}>
                <CardHeader
                    sx={{ textAlign: 'center' }}
                    title="Réinitialisation du mot de passe"
                    subheader="Choisisez un nouveau mot de passe"
                />
                <CardContent>
                    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
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
            </Card>
        </Container>
    )
}

const SendMail = () => {


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
            const response : any = await apiFetch(`/forgot-password`, 'post', {
                email: data.email
            })
            toast.success(response.message)
            reset()
        } catch (error: any) {
            toast.error(JSON.parse(error.message).message)
        }
    }

    return (
        <Container>
            <Card sx={{ my: 5, mx: 'auto', width: 600, maxWidth: '100%' }}>
                <CardHeader
                    sx={{ textAlign: 'center' }}
                    title="Mot de passe oublié"
                    subheader="Ecrit ton email pour recevoir le lien de réinitialisation"
                />
                <CardContent>
                    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
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
                        <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    )
}

const PasswordForgotPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const showPasswordChangeForm = searchParams.get('token') ? true : false

    return showPasswordChangeForm ? <ChangePassword /> : <SendMail />
}

export default PasswordForgotPage