import { Text, Card, Center, Stack, CardBody, Box, FormControl, FormLabel, Input, CardFooter, Button, InputRightElement, Tooltip } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import { useAuthContext } from "../../contexts/AuthProvider"
import { useState } from "react"
import ErrorAlert from "../../components/alerts/ErrorAlert"
import { apiFetch } from "../../http-common/apiFetch"
import { NavLink } from "react-router-dom"
import { InfoIcon } from "@chakra-ui/icons"


export default function LoginPage() {

    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const onLogin = async (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        try {
            await apiFetch('/login', 'post', {
                username: element.username.value,
                password: element.password.value
            })
            navigate('/')
        } catch (e: any) {
            setError("Mot de passe ou identifiant invalide")
        }
    }


    return (
        <Center flexDirection="column">
            <Stack maxW="100%" w={400} spacing={2} alignItems="center">
                <Text as="h1" fontSize="4xl" fontWeight="bold" color="var(--coreego-blue)">Se connecter</Text>
                <ErrorAlert message={error} />
                <Card w="100%">
                    <CardBody>
                        <Box as="form" onSubmit={onLogin}>
                            <Stack alignItems="flex-start">
                                <FormControl>
                                    <FormLabel textTransform="uppercase">Email</FormLabel>
                                    <Input type='email' id="username" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel textTransform="uppercase">Mot de passe</FormLabel>
                                    <Input type='password' id="password" />
                                </FormControl>
                                <NavLink style={{ textDecoration: 'underline' }} to="/password/reset">Mot de passe oublié</NavLink>
                                <Button colorScheme="blue" type="submit">Se connecter</Button>
                            </Stack>
                        </Box>
                    </CardBody>
                    <CardFooter pt={0}>
                        <Stack>
                            <NavLink to="/register">Je crée mon compte</NavLink>
                        </Stack>
                    </CardFooter>
                </Card>
            </Stack>
        </Center>
    )

}