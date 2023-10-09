import { Text, Card, Center, Stack, CardBody, Box, FormControl, FormLabel, Input, CardFooter, Button, InputRightElement, Tooltip } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import { useAuthContext } from "../../contexts/AuthProvider"
import { useState } from "react"
import ErrorAlert from "../../components/alerts/ErrorAlert"
import { apiFetch } from "../../http-common/apiFetch"
import { NavLink } from "react-router-dom"
import { InfoIcon } from "@chakra-ui/icons"
import TitlePageUx from "../../components/react-ux/TitlePageUx"
import PageTitle from "../../components/texts/Title"
import HeaderSection from "../../components/sections/HeaderSection"
import CenterLayout from "../layouts/CenterLayout"


export default function LoginPage() {


    const { login, error } = useAuthContext()
    const [isBusy, setIsBusy] = useState<boolean>(false)

    const onLogin = async (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        setIsBusy(true)
        await login(element.username.value.trim(), element.password.value.trim())
        if (error) {
            // console.log(error);
        }
        setIsBusy(false)
    }


    return (
        <CenterLayout>
            <Stack spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
                <Text as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="500">Je me connecte</Text>
                <Text textAlign="center" color="gray">Remplissez le formulaire pour vous connecter</Text>
            </Stack>
            <ErrorAlert message={error} />
            <Stack as="form" onSubmit={onLogin} action="/login" spacing={5}>
                <FormControl isRequired>
                    <FormLabel fontSize="sm">Votre email</FormLabel>
                    <Input placeholder="email@email.fr" size="lg" type='email' id="username" name="username" />
                </FormControl>
                <FormControl isRequired>
                    <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                        <FormLabel fontSize="sm" textTransform="uppercase">Mot de passe</FormLabel>
                        <NavLink style={{ fontSize: '14px', color: 'var(--coreego-blue)', fontWeight: 'bold' }} to="/password/reset">Mot de passe oublié ?</NavLink>
                    </Stack>
                    <Input placeholder="6+ caractères requis" size="lg" type='password' id="password" name="password" />
                </FormControl>
                <Button isLoading={isBusy} type="submit" colorScheme="blue">Se connecter</Button>
            </Stack>
            <Stack direction="row" justifyContent="center" flexWrap="wrap">
                <Text>Vous n'avez pas encore de compte ?</Text>
                <NavLink style={{ color: 'var(--coreego-blue)', fontWeight: 'bold' }} to="/register">
                    Inscrivez-vous ici
                </NavLink>
            </Stack>
        </CenterLayout>
    )

}