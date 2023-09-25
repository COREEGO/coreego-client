import { Box, Button, Card, CardHeader, Center, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react"
import { error } from "console"
import ErrorAlert from "../../components/alerts/ErrorAlert"



const RegisterPage: React.FC<any> = () => {


    const onRegister = () => {
        console.log('submit')
    }

    return (
        <Stack mt={100}>
            <Center>
                <Card p={3} w={500} maxW="100%">
                    <CardHeader pt={0}>
                        <Center>
                            <Heading color="var(--coreego-blue)" size='md'>Créer un compte</Heading>
                        </Center>
                    </CardHeader>
                    <Box as="form" onSubmit={onRegister}>
                        <Stack>
                            <FormControl>
                                <FormLabel>Pseudo</FormLabel>
                                <Input type='text' id="pseudo" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type='email' id="username" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Mot de passe</FormLabel>
                                <Input type='password' id="password" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirmer le mot de passe</FormLabel>
                                <Input type='password' id="confirm-password" />
                            </FormControl>
                            <Button
                                color="white"
                                bg="var(--coreego-blue)"
                                _hover={{ backgroundColor: 'var(--coreego-blue-light)' }}
                                type="submit">
                                Je crée mon compte
                            </Button>
                        </Stack>
                    </Box>
                </Card>
            </Center>
        </Stack>
    )
}

export default RegisterPage