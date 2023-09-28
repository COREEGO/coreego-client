import { Box, Button, Card, CardBody, CardHeader, Center, Checkbox, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputRightElement, List, ListItem, Stack, Text, Tooltip, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import SuccessAlert from "../../components/alerts/SuccessAlert"
import { InfoIcon } from "@chakra-ui/icons"





const RegisterPage: React.FC<any> = () => {

    const [messageErrorPseudo, setMessageErrorPseudo] = useState<string>()
    const [messageErrorEmail, setMessageErrorEmail] = useState<string>()
    const [messageErrorPassword, setMessageErrorPassword] = useState<string>()
    const [messageErrorConfirmPassword, setMessageErrorConfirmPassword] = useState<string>()
    const [successMessage, setSuccessMessage] = useState<string>('')

    const [confirmTerm, setConfirmTerm] = useState<boolean>(false)

    const onRegister = async (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        try {
            if (element.password.value !== element.confirmPassword.value) {
                setMessageErrorConfirmPassword('Les mots de passe doivent correspondre.')
            } else {
                setMessageErrorConfirmPassword('')

                await apiFetch('/register', 'post', {
                    pseudo: element.pseudo.value,
                    email: element.email.value,
                    password: element.password.value,
                })
                setSuccessMessage("Un email a été envoyé dans votre boite email afin de valider votre compte")
            }

        } catch (error: any) {
            if (error) {
                const e = JSON.parse(error.message)
                setMessageErrorPseudo(e.pseudo)
                setMessageErrorEmail(e.email)
                setMessageErrorPassword(e.password)
            }
        }
    }

    return (
        <Center flexDirection="column">
            <Stack maxW="100%" w={400} spacing={2} alignItems="center">
                <Text as="h1" fontSize="4xl" fontWeight="bold" color="var(--coreego-blue)">S'inscrire</Text>
                <SuccessAlert message={successMessage} />
                <Card w="100%">
                    <CardBody>
                        <Box as="form" onSubmit={onRegister}>
                            <Stack>
                                <FormControl>
                                    <FormLabel textTransform="uppercase" >Nom d'utilisateur</FormLabel>
                                    <Input required type='text' id="pseudo" />
                                    <FormHelperText color="red">{messageErrorPseudo}</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <FormLabel textTransform="uppercase">Email</FormLabel>
                                    <Input required type='email' id="email" />
                                    <FormHelperText color="red">{messageErrorEmail}</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <FormLabel textTransform="uppercase">Mot de passe</FormLabel>
                                    <InputGroup>
                                        <Input
                                            required
                                            type='password'
                                            id="password"
                                        />
                                        <InputRightElement>
                                            <Tooltip hasArrow label='Minimum 6 caractères, 1 caractère spétial, 1 nombre alpha numéric' bg='gray.300' color='black'>
                                                <InfoIcon />
                                            </Tooltip>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormHelperText color="red">{messageErrorPassword}</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <FormLabel textTransform="uppercase">Confirmer le mot de passe</FormLabel>
                                    <Input
                                        required
                                        type='password'
                                        id="confirmPassword"
                                    />
                                    <FormHelperText color="red">{messageErrorConfirmPassword}</FormHelperText>
                                </FormControl>
                                <Checkbox
                                    isChecked={confirmTerm}
                                    onChange={(e) => setConfirmTerm(e.target.checked)}
                                >
                                    J'accepte les conditions général d'utilisation *
                                </Checkbox>
                                <Button
                                    isDisabled={!confirmTerm}
                                    color="white"
                                    bg="var(--coreego-blue)"
                                    _hover={{ backgroundColor: 'var(--coreego-blue-light)' }}
                                    type="submit">
                                    Je crée mon compte
                                </Button>
                            </Stack>
                        </Box>
                    </CardBody>
                </Card>
                <Text>
                    * En cochant cette case, je m'engage à publié des posts en raport avec la corée du sud.
                    En cas de non respect et après plusieurs avertissement, nous serons dans l'obligation de suspendre votre compte.
                </Text>
            </Stack>
        </Center>
    )
}

export default RegisterPage