import * as React from 'react'
import { useAuthContext } from "../../contexts/AuthProvider"
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Card, CardActions, CardContent, CardHeader, Container, Divider, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import axios from 'axios';
import { emailValidator, requiredValidator } from '../../utils/formValidation';


export default function LoginPage() {

    const { setUser, authentification } = useAuthContext()


    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onTouched'
    })

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/login', {
                email: data.email.trim(),
                password: data.password.trim()
            })
            localStorage.setItem('token', response.data.token)
            await authentification()
            navigate('/')

        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    return (
        <Container>
            <Card sx={{ my: 5, mx: 'auto', width: 600, maxWidth: '100%' }}>
                <CardHeader
                    sx={{ textAlign: 'center' }}
                    title="Je me connecte"
                    subheader="Remplissez le formulaire pour vous connecter"
                />
                <CardContent>
                    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
                            <TextField
                                fullWidth
                                label="Adresse email"
                                error={errors.email ? true : false}
                                helperText={errors?.email?.message}
                                required
                                {...register('email', {...requiredValidator, ...emailValidator} )}
                                placeholder="email@email.fr"
                                type='email'
                            />
                            <TextField
                                fullWidth
                                label="Mot de passe"
                                error={errors.password ? true : false}
                                helperText={errors?.password?.message}
                                required
                                {...register('password', requiredValidator)}
                                placeholder="Votre mot de passe"
                                type='password'
                            />
                        <LoadingButton variant="contained" loading={isSubmitting} type="submit">Je m'inscris</LoadingButton>
                    </Stack>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                    <NavLink style={{ color: 'var(--coreego-blue)' }} to="/register">
                        Inscrivez-vous ici
                    </NavLink>
                    <NavLink to="/password/forgot" style={{ color: 'var(--coreego-blue)' }}>
                        Mot de passe oublié
                    </NavLink>
                </CardActions>
            </Card>
        </Container>
    )
}