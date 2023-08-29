import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react"
import { useAuth } from "../../hooks/useAuth"
import { redirect, useLocation, useNavigate } from "react-router"
import { useAuthContext } from "../../contexts/AuthProvider"
import { useEffect } from "react"


export default function LoginPage() {
    const location = useLocation()
    const navigate = useNavigate()


    const { login } = useAuthContext()


    const onLogin = async (e: any) => {
        e.preventDefault()
        try {

            const element = e.target.elements

            login(element.username.value, element.password.value)

            navigate('/', {replace: true} )

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <form onSubmit={onLogin}>
            <Stack>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' id="username" />
                </FormControl>
                <FormControl>
                    <FormLabel>Mot de passe</FormLabel>
                    <Input type='password' id="password" />
                </FormControl>
                <Button type="submit">Se connecter</Button>
            </Stack>
        </form>
    )

}