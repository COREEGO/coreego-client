import * as React from 'react'
import useSignIn from 'react-auth-kit';
import { Text, Card, Stack, CardBody, Box, FormControl, FormLabel, Input, Button, CardHeader, FormErrorMessage } from "@chakra-ui/react"
import { useAuthContext } from "../../contexts/AuthProvider"
import { useEffect, useState } from "react"
import ErrorAlert from "../../components/alerts/ErrorAlert"
import { NavLink, useNavigate } from "react-router-dom"
import CenterLayout from "../layouts/CenterLayout"
import { useForm } from "react-hook-form"
import { emailValidator, noEmptyValidator } from "../../utils/formValidation"
import { apiFetch } from '../../http-common/apiFetch';

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

    const onsubmit = async (data: Inputs) => {
        try {
            await apiFetch('/login', 'post', {
                username: data.email.trim(),
                password: data.password.trim()
            })
            await authentification()
            navigate('/')
        } catch (e: any) {
            let errorMessage;
            if (JSON.parse(e.message).status == 401){
                errorMessage = "Email ou Mot de passe incorrect"
            }
            setError('root', {
                message: errorMessage
            })
        }

    }

    return (
        <CenterLayout>
            <Card>
                <CardHeader>
                    <Stack spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
                        <Text as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="500">Je me connecte</Text>
                        <Text textAlign="center" color="gray">Remplissez le formulaire pour vous connecter</Text>
                    </Stack>
                </CardHeader>
                <CardBody>
                    <Stack>
                        <ErrorAlert message={errors?.root?.message} />
                        <Stack as="form" onSubmit={handleSubmit(onsubmit)} action="/login" spacing={5}>
                            <FormControl isInvalid={errors.email ? true : false}>
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Votre email</FormLabel>
                                <Input
                                    {...register('email', { ...noEmptyValidator, ...emailValidator })}
                                    placeholder="email@email.fr" size="lg" type='email' />
                                {errors.email && <FormErrorMessage> {errors.email.message} </FormErrorMessage>}
                            </FormControl>
                            <FormControl isInvalid={errors.password ? true : false}>
                                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }} textTransform="uppercase">Mot de passe</FormLabel>
                                    <NavLink style={{ fontSize: '14px', color: 'var(--coreego-blue)', fontWeight: 'bold' }} to="/password/reset">Mot de passe oublié ?</NavLink>
                                </Stack>
                                <Input
                                    {...register('password', {
                                        required: 'Cette valeur ne doit pas être vide',
                                        minLength: { value: 6, message: '6+ caratères requis' }
                                    })}
                                    placeholder="6+ caractères requis" size="lg" type='password' />
                                {errors.password && <FormErrorMessage> {errors.password.message} </FormErrorMessage>}
                            </FormControl>
                            <Button isLoading={isSubmitting} type="submit" colorScheme="blue">Se connecter</Button>
                        </Stack>
                        <Stack direction="row" justifyContent="center" flexWrap="wrap">
                            <Text>Vous n'avez pas encore de compte ?</Text>
                            <NavLink style={{ color: 'var(--coreego-blue)', fontWeight: 'bold' }} to="/register">
                                Inscrivez-vous ici
                            </NavLink>
                        </Stack>
                    </Stack>
                </CardBody>
            </Card>
        </CenterLayout>
    )

}