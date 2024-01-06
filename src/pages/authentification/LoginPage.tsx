import * as React from 'react'
import useSignIn from 'react-auth-kit';
import { useAuthContext } from "../../contexts/AuthProvider"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { emailValidator, minLengthValidatior, noEmptyValidator } from "../../utils/formValidation"
import { apiFetch } from '../../http-common/apiFetch';
import { Card, CardActions, CardContent, CardHeader, Container, FormControl, FormHelperText, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Inputs = {
    email: string,
    password: string
}

export default function LoginPage() {

    const { authentification }: any = useAuthContext()


    const navigate = useNavigate()

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

    const onSubmit = async (data: Inputs) => {
        try {
            const response: any = await apiFetch('/login', 'post', {
                email: data.email.trim(),
                password: data.password.trim()
            })
            if (response) {
                localStorage.setItem('token', response.token)
            }
            await authentification()
            navigate('/')
        } catch (e: any) {
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
                                {...register('password', { ...noEmptyValidator })}
                                placeholder="Votre mot de passe"
                                type='password'
                            />
                            {errors.password && <FormHelperText id="component-error-text">{errors.password.message}</FormHelperText>}
                        </FormControl>
                        <LoadingButton variant="contained" loading={isSubmitting} type="submit">Je m'inscris</LoadingButton>
                    </Stack>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                    <NavLink style={{ color: 'var(--coreego-blue)' }} to="/register">
                        Inscrivez-vous ici
                    </NavLink>
                </CardActions>
            </Card>
        </Container>
    )
}