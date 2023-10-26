import { Box, Button, IconButton, Text, Stack, Textarea, useDisclosure, useToast, Container, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormErrorMessage } from "@chakra-ui/react"
import CommentCard from "../../../components/card/CommentCard"
import { useEffect, useState } from "react"
import { MdClose, MdOutlineAdd } from "react-icons/md"
import { apiFetch } from "../../../http-common/apiFetch"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../../utils/variables"
import { useAuthContext } from "../../../contexts/AuthProvider"
import { SubmitHandler, useForm } from "react-hook-form"
import { noEmptyValidator } from "../../../utils/formValidation"


interface CommentModuleInterface {
    comments: Array<any>,
    discussionId?: any
    placeId?: any,
    mutate: Function
}

type Inputs = {
    content: string
}

const CommentModule: React.FC<CommentModuleInterface> = ({ comments, discussionId, placeId, mutate }) => {

    const toast = useToast()
    const { user } = useAuthContext()

    const { isOpen, onOpen, onClose } = useDisclosure()


    comments = comments.sort((a: { createdAt: Date }, b: { createdAt: Date }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch('/comments', 'POST', {
                discussion: discussionId && 'api/discussions/' + discussionId,
                place: placeId && 'api/places/' + placeId,
                content: data.content
            })
            toast({
                description: "Commentaire ajouté",
                status: 'success',
            })

            comments.push({
                user: user,
                content: data.content,
                createdAt: new Date()
            })
            reset()
            mutate()
            onClose()
        } catch (error: any) {
            toast({
                description: JSON.parse(error.message),
                status: 'success',
            })
        }
    }

    return (
        <Box>
            <Container maxW={CONTAINER_SIZE}>
                <Stack>
                    <Stack direction="row" alignItems="center">
                        <Text as="b">Commentaires</Text>
                        <Button size="sm" colorScheme="twitter" onClick={onOpen}>Ajouter</Button>
                    </Stack>
                    {
                        comments.length && <Stack mt={5}>
                            {
                                comments.map((comment: any) => {
                                    return (
                                        <CommentCard mutate={() => mutate()} key={comment.id} comment={comment} />
                                    )
                                })
                            }
                        </Stack>
                    }
                </Stack>
            </Container>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter un commentaire</ModalHeader>
                    <ModalCloseButton />
                    <Stack spacing={0} as="form" onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl isInvalid={errors.content ? true : false}>
                                <Textarea
                                    required
                                    {...register('content', { ...noEmptyValidator })}
                                    placeholder="Ecrivez votre commentaire" rows={10} />
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
        </Box>
    )

}

export default CommentModule