import { Button, Card, CardBody, CardHeader, Flex, FormControl, FormErrorMessage, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure, useEditableControls, useToast } from "@chakra-ui/react"
import { useAuthContext } from "../../contexts/AuthProvider"
import { MdBorderColor,  MdDelete, MdMoreVert } from "react-icons/md"
import { apiFetch } from "../../http-common/apiFetch"
import { SubmitHandler, useForm } from "react-hook-form"
import { noEmptyValidator } from "../../utils/formValidation"
import UserSniped from "../react-ux/UserSniped"


interface CommentCardInterface {
    comment: any,
    mutate: Function
}

type Inputs = {
    content: string
}

const CommentCard: React.FC<CommentCardInterface> = ({ comment, mutate }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }
    } = useForm<Inputs>({ mode: 'onTouched' })

    const { user }: any = useAuthContext()

    const toast = useToast()

    const isCommentUser = comment.user.id === user.id

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch('/comments/' + comment.id, 'PATCH', {
                content: data.content
            })
            toast({
                description: "Commentaire modifié",
                status: 'success',
            })
            mutate()
            onClose()
        } catch (error: any) {
            toast({
                description: `${JSON.parse(error.message)}`,
                status: 'error',
            })
        }
    }

    const handleDeleteComment = async () => {
        try {
            const result = window.confirm('Supprimer ce commentaire ?')
            if (!result) return

            await apiFetch('/comments/' + comment.id, 'DELETE')
            toast({
                title: 'Suucès',
                description: "Commentaire supprimé",
                status: 'success',
            })
            mutate()
        } catch (error: any) {
            toast({
                description: `${JSON.parse(error.message)}`,
                status: 'error',
            })
        }
    }


    return (
        <>
            <Card borderRadius={0} w="100%">
                <CardHeader>
                    <Flex>
                        <Flex flex={1}>
                            <UserSniped
                                avatar={comment.user.avatar}
                                pseudo={comment.user.pseudo}
                                publishDate={comment.createdAt}
                            />
                        </Flex>
                        {
                            isCommentUser &&
                            <Menu>
                                <MenuButton>
                                    <IconButton variant='ghost' aria-label={"voir menu"} icon={<MdMoreVert />} />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={onOpen} icon={<MdBorderColor />}>Modifier</MenuItem>
                                    <MenuItem onClick={handleDeleteComment} icon={<MdDelete />}>Supprimer</MenuItem>
                                </MenuList>
                            </Menu>
                        }
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text whiteSpace="pre-line"> {comment.content}   </Text>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modifier votre commentaire</ModalHeader>
                    <ModalCloseButton />
                    <Stack spacing={0} as="form" onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl isInvalid={errors.content ? true : false}>
                                <Textarea
                                    defaultValue={comment.content}
                                    required
                                    {...register('content', { ...noEmptyValidator })}
                                    placeholder="Modifier votre commentaire" rows={10} />
                                {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button isLoading={isSubmitting} w="100%" colorScheme='blue' type="submit">
                                Ajouter
                            </Button>
                        </ModalFooter>
                    </Stack>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CommentCard