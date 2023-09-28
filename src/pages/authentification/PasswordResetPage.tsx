import { Box, Button, Card, CardBody, Center, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react"
import ErrorAlert from "../../components/alerts/ErrorAlert"
import { useState } from "react"
import SuccessAlert from "../../components/alerts/SuccessAlert"
import { apiFetch } from "../../http-common/apiFetch"






const PasswordResetPage = () => {

    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')

    const onSendMail = async (e:any) => {
        e.preventDefault()
        const element = e.target.elements
        setErrorMessage('')
        setSuccessMessage('')

        try {
            await apiFetch('/reset-password/sendmail', 'post', {
                email: element.email.value
            })
            setSuccessMessage('Vérifier votre boite email')
        } catch (error:any) {
            setErrorMessage(JSON.parse(error.message))
        }
    }


    return (
        <Center flexDirection="column">
            <Stack maxW="100%" w={400} spacing={2} alignItems="center">
                <Text textAlign="center" as="h1" fontSize="4xl" fontWeight="bold" color="var(--coreego-blue)">Mot de passe <br /> oublié</Text>
                <ErrorAlert message={errorMessage} />
                <SuccessAlert message={successMessage} />
                <Card w="100%">
                    <CardBody>
                        <Box as="form" onSubmit={onSendMail}>
                            <Stack alignItems="flex-start">
                                <FormControl>
                                    <FormLabel textTransform="uppercase">Email</FormLabel>
                                    <Input type='email' id="email" />
                                </FormControl>
                                <Button colorScheme="blue" type="submit">Envoyer</Button>
                            </Stack>
                        </Box>
                    </CardBody>
                </Card>
            </Stack>
        </Center>
    )
}

export default PasswordResetPage