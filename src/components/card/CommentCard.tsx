import { Box, Button, ButtonGroup, Card, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Text, Textarea, useEditableControls, useToast } from "@chakra-ui/react"
import UserInfo from "./_UserInfo"
import { useAuthContext } from "../../contexts/AuthProvider"
import { MdBorderColor, MdCheck, MdClose, MdDelete, MdMoreVert, MdOutlineDelete } from "react-icons/md"
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import moment from "moment"


interface CommentCardInterface {
    comment: any,
    mutate: Function
}

const CommentCard: React.FC<CommentCardInterface> = ({ comment, mutate }) => {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [content, setContent] = useState<string>(comment.content)

    const { user }: any = useAuthContext()

    const toast = useToast()

    const isCommentUser = comment.user.id === user.id

    const handleClickModifiyComment = async (e: any) => {
        e.preventDefault()
        try {
            if (content.length) {
                await apiFetch('/comments/' + comment.id, 'PATCH', {
                    content: content
                })
                toast({
                    title: 'Suucès',
                    description: "Commentaire modifié",
                    status: 'success',
                })
                mutate()
                setIsEditing(false)
            }
        } catch (error: any) {
            toast({
                title: 'Erreur',
                description: `${JSON.parse(error.message)}`,
                status: 'error',
            })
        }
    }

    const handleDeleteComment = async () => {
        try {
            const result = window.confirm('Supprimer ce commentaire ?')

            if (result) {
                await apiFetch('/comments/' + comment.id, 'DELETE')
                mutate()
                toast({
                    title: 'Suucès',
                    description: "Commentaire supprimé",
                    status: 'success',
                })
            } else {
                console.log('non suppression')
            }

        } catch (error:any) {
            console.log(JSON.parse(error.message))
        }
    }


    return (
        <Card p={3} borderRadius={0} w="100%">
            <Stack direction="row">
                <Stack flex={1}>
                    <UserInfo user={comment.user} date={comment.createdAt} />
                    {
                        isEditing ? <Stack as="form" onSubmit={handleClickModifiyComment}>
                            <Textarea borderRadius={0} value={content} onChange={(e: any) => setContent(e.target.value)} />
                            <Stack direction="row">
                                <ButtonGroup size="sm">
                                    <Button type="submit" colorScheme="green" ><MdCheck /></Button>
                                    <Button onClick={() => setIsEditing(false)} colorScheme="red" ><MdClose /></Button>
                                </ButtonGroup>
                            </Stack>
                        </Stack> : <Text whiteSpace="pre-line"> {comment.content}   </Text>
                    }
                </Stack>
                {
                    isCommentUser && <Stack>
                        <Menu>
                            <MenuButton as="button">
                                <MdMoreVert />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setIsEditing(true)} icon={<MdBorderColor />}>Modifier</MenuItem>
                                <MenuItem onClick={handleDeleteComment} icon={<MdDelete />}>Supprimer</MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                }
            </Stack>
        </Card>
    )
}

export default CommentCard