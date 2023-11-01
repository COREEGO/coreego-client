import { Box, Button, Card, Text, CardBody, CardHeader, Flex, FormControl, FormErrorMessage, IconButton, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import UserSniped from "../react-ux/UserSniped"
import { useAuthContext } from "../../contexts/AuthProvider"
import { MdMoreVert, MdBorderColor, MdDelete } from "react-icons/md"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { control } from "leaflet"
import { minLengthValidatior, minNumber, noEmptyValidator } from "../../utils/formValidation"
import StarsButton from "../buttons/StarsButton"
import { apiFetch } from "../../http-common/apiFetch"
import Stars from "./_Stars"


interface ReviewCardInterface {
    review: any,
    mutate: Function
}

type Inputs = {
    content: string,
    stars: number
}

const ReviewCard: React.FC<ReviewCardInterface> = ({ review, mutate }) => {

    const { user }: any = useAuthContext()


    const isReviewUser = user.id === review.user.id

    const toast = useToast()


    const handleDeleteReview = async () => {
        try {
            const result = window.confirm('Supprimer ce commentaire ?')
            if (!result) return

            await apiFetch('/reviews/' + review.id, 'DELETE')
            toast({
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
            <Card>
                <CardHeader>
                    <Flex alignItems={"flex-start"}>
                        <UserSniped
                            avatar={review.user.avatar}
                            pseudo={review.user.pseudo}
                            publishDate={review.createdAt}
                        />
                        <Spacer />
                        {
                            isReviewUser &&
                            <Menu>
                                <MenuButton>
                                    <MdMoreVert />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={handleDeleteReview} icon={<MdDelete />}>Supprimer</MenuItem>
                                </MenuList>
                            </Menu>
                        }
                    </Flex>
                </CardHeader>
                <CardBody pt={0}>
                    <Stack>
                        <Stars star={review.stars} />
                        <Text whiteSpace="pre-line">{review.content}</Text>
                    </Stack>
                </CardBody>
            </Card>

    )

}

export default ReviewCard

function toast(arg0: { description: string; status: string }) {
    throw new Error("Function not implemented.")
}
