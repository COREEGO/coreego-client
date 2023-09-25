import { Alert, AlertIcon, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Divider, FormControl, FormLabel, Heading, Input, Stack, StackDivider } from "@chakra-ui/react"
import { useAuth } from "../../hooks/useAuth"
import { redirect, useLocation, useNavigate } from "react-router"
import { useAuthContext } from "../../contexts/AuthProvider"
import { useEffect, useState } from "react"
import ErrorAlert from "../../components/alerts/ErrorAlert"
import { apiFetch } from "../../http-common/apiFetch"
import { NavLink } from "react-router-dom"


export default function LoginPage() {

    const { login, error } = useAuthContext()

    const navigate = useNavigate()

    const onLogin = (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        login(element.username.value, element.password.value)
    }


    return (
        <Stack mt={100}>
            <Center>
                <Card w={500} maxW="100%">
                    <CardHeader>
                        <Center>
                            <Heading color="var(--coreego-blue)" size='md'>Connexion</Heading>
                        </Center>
                    </CardHeader>
                    <CardBody>
                        <Box as="form" onSubmit={onLogin}>
                            <Stack>
                                <ErrorAlert message={error} />
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input type='email' id="username" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <Input type='password' id="password" />
                                </FormControl>
                                <Button mt={3} color="white" bg="var(--coreego-blue)" _hover={{ backgroundColor: 'var(--coreego-blue-light)' }} type="submit">Se connecter</Button>
                            </Stack>
                        </Box>
                    </CardBody>
                    <CardFooter pt={0}>
                        <Stack>
                            <NavLink to="/register">Je crée mon compte</NavLink>
                        </Stack>
                    </CardFooter>
                </Card>
            </Center>
        </Stack>
    )

}