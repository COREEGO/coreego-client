import { Box, Button, IconButton, Text, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import CommentCard from "../../../components/card/CommentCard"
import { useState } from "react"
import { MdClose, MdOutlineAdd } from "react-icons/md"
import { apiFetch } from "../../../http-common/apiFetch"


interface CommentModuleInterface {
    comments: Array<any>,
    discussionId?: any
    placeId?: any,
    mutate: Function
}

const CommentModule: React.FC<CommentModuleInterface> = ({ comments, discussionId, placeId, mutate }) => {

    const toast = useToast()

    const [commentText, setCommentText] = useState<string>('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    comments = comments.sort((a : {createdAt: Date }, b : {createdAt: Date }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });


    const handleSubmitComment = async (e:any) => {

        e.preventDefault()

        try {

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

            onClose()

            mutate()


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <Stack>
                <Stack alignItems="center" direction="row" spacing={3}>
                    <Text as="b" color="var(--coreego-blue)">Commentaires
                    </Text>
                    <IconButton
                    onClick={isOpen ? onClose : onOpen  }
                    size="sm"
                    colorScheme="blue"
                    isRound={true}
                    icon={isOpen ? <MdClose /> : <MdOutlineAdd />}
                    aria-label={"open comment text area"}
                    />
                </Stack>
                {
                    isOpen &&
                    <Stack alignItems="flex-start" as="form" onSubmit={handleSubmitComment}>
                        <Textarea borderRadius={0} value={commentText} onChange={(e: any) => setCommentText(e.target.value)} bg="white" placeholder='Réagisez à cette publication...' />
                        {
                            commentText.trim() && <Button size="sm" colorScheme='blue' borderRadius={0} type="submit">Envoyer</Button>
                        }

                    </Stack>
                }
                <Stack>
                    {
                        comments.map((comment: any) => {
                            return (
                                <CommentCard mutate={() => mutate()} key={comment.id} comment={comment} />
                            )
                        })
                    }
                </Stack>
            </Stack>
        </Box >
    )

}

export default CommentModule