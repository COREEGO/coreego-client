import { Box, Button, IconButton, Text, Stack, Textarea, useDisclosure, useToast, Container } from "@chakra-ui/react"
import CommentCard from "../../../components/card/CommentCard"
import { useEffect, useState } from "react"
import { MdClose, MdOutlineAdd } from "react-icons/md"
import { apiFetch } from "../../../http-common/apiFetch"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../../utils/variables"


interface CommentModuleInterface {
    comments: Array<any>,
    discussionId?: any
    placeId?: any,
    mutate: Function
}

const CommentModule: React.FC<CommentModuleInterface> = ({ comments, discussionId, placeId, mutate }) => {

    const toast = useToast()

    const [commentText, setCommentText] = useState<string>('')
    const [isBusy, setIsBusy] = useState<boolean>(false)


    comments = comments.sort((a: { createdAt: Date }, b: { createdAt: Date }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });




    const handleSubmitComment = async (e: any) => {

        e.preventDefault()

        try {
            setIsBusy(true)

            if (commentText.trim().length) {

                await apiFetch('/comments', 'POST', {
                    discussion: discussionId && 'api/discussions/' + discussionId,
                    place: placeId && 'api/places/' + placeId,
                    content: commentText
                })

                toast({
                    title: 'Suucès',
                    position: 'top-right',
                    description: "Commentaire ajouté",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })

                setCommentText('')

                mutate()
            }
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <Box bg="gray.50" py={VERTICAL_SPACING}>
            <Container maxW={CONTAINER_SIZE}>
                <Stack>
                    <Text fontSize="xl" as="b">Commentaires</Text>
                    <Stack alignItems="flex-start" as="form" onSubmit={handleSubmitComment}>
                        <Textarea bg="white" borderRadius={0} rows={6} value={commentText} onChange={(e: any) => setCommentText(e.target.value)} placeholder='Réagisez à cette publication...' />
                        <Button isLoading={isBusy} isDisabled={commentText.trim().length < 1} size="sm" colorScheme='blue' borderRadius={0} type="submit">Envoyer</Button>
                    </Stack>
                    {
                        comments.map((comment: any) => {
                            return (
                                <CommentCard mutate={() => mutate()} key={comment.id} comment={comment} />
                            )
                        })
                    }
                </Stack>
            </Container>
        </Box >
    )

}

export default CommentModule