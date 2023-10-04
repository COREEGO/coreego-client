import { Box, Button, Card, CardBody, Center, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import SuccessAlert from "../../components/alerts/SuccessAlert"
import { InfoIcon } from "@chakra-ui/icons"
import ContainerAuthentification from "./_ContainerAuthentification"
import PageTitle from "../../components/texts/PageTitle"
import CenterLayout from "../layouts/CenterLayout"
import { REGISTER_MESSAGE } from "../../utils/messages"
import { getViolationField } from "../../utils"

const RegisterPage: React.FC<any> = () => {


    const [successMessage, setSuccessMessage] = useState<string>('')
    const [confirmTerm, setConfirmTerm] = useState<boolean>(false)
    const [isBusy, setIsBusy] = useState<boolean>(false)
    const [violations, setViolations] = useState<Array<any>>([])

    const onRegister = async (e: any) => {

        e.preventDefault()

        const form = e.target
        const element = e.target.elements

        const plainPassword = element.plainPassword.value.trim();
        const confirmPassword = element.confirmPassword.value.trim();
        const pseudo = element.pseudo.value.trim()
        const email = element.email.value.trim()
        const term = element.term.checked

        try {
            setSuccessMessage('')
            setIsBusy(true)
            setViolations([])

            if (plainPassword !== confirmPassword) {
                throw new Error(JSON.stringify({
                    violations: [
                        {
                            propertyPath: 'confirmPassword',
                            message: 'Les mots de passe ne sont pas valides'
                        },
                    ]
                }))
            }

            await apiFetch('/register', 'post', {
                pseudo: pseudo,
                email: email,
                hasConfirmTerm: term,
                plainPassword: plainPassword,
            })

            form.reset()
            setSuccessMessage(REGISTER_MESSAGE)
        } catch (e: any) {
            if ('violations' in JSON.parse(e.message)) {
                setViolations(JSON.parse(e.message).violations)
            }
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <CenterLayout>
            <Stack spacing={0} justifyContent="center" flexDirection="column" alignItems="center">
                <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight={500}>Je crée mon compte</Text>
                <Text textAlign="center" color="gray">Remplissez le formulaire pour créer votre compte</Text>
            </Stack>
            <SuccessAlert message={successMessage} />
            <Stack as="form" onSubmit={onRegister} spacing={5}>
                <FormControl isRequired isInvalid={getViolationField(violations, 'pseudo')}>
                    <FormLabel fontSize="sm" textTransform="uppercase" >Nom d'utilisateur</FormLabel>
                    <Input size="lg" required type='text' id="pseudo" />
                    <FormErrorMessage> {getViolationField(violations, 'pseudo')?.message} </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={getViolationField(violations, 'email')}>
                    <FormLabel fontSize="sm" >Votre email</FormLabel>
                    <Input placeholder="email@email.fr" size="lg" type='email' id="email" />
                    <FormErrorMessage> {getViolationField(violations, 'email')?.message} </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={getViolationField(violations, 'plainPassword')}>
                    <FormLabel fontSize="sm" textTransform="uppercase">Mot de passe</FormLabel>
                    <Input placeholder="6+ caractères requis" size="lg" type='password' id="plainPassword" />
                    <FormErrorMessage> {getViolationField(violations, 'plainPassword')?.message} </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={getViolationField(violations, 'confirmPassword')}>
                    <FormLabel fontSize="sm" textTransform="uppercase">Confirmez le mot de passe</FormLabel>
                    <Input placeholder="6+ caractères requis" size="lg" type='password' id="confirmPassword" />
                    <FormErrorMessage>{getViolationField(violations, 'confirmPassword')?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={getViolationField(violations, 'hasConfirmTerm')}>
                    <Checkbox
                        id="term"

                    >
                        Je m'engage à publier des posts concernant la Corée Du Sud
                    </Checkbox>
                    <FormErrorMessage>{getViolationField(violations, 'hasConfirmTerm')?.message}</FormErrorMessage>
                </FormControl>
                <Button isLoading={isBusy} type="submit" colorScheme="blue">S'inscrire</Button>
            </Stack>
        </CenterLayout>
    )
}

export default RegisterPage