import { Box, Button, Card, Text, CardBody, CardHeader, Flex, FormControl, FormErrorMessage, IconButton, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Textarea, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import UserSniped from "../react-ux/UserSniped"
import { useAuthContext } from "../../contexts/AuthProvider"
import { MdMoreVert, MdDelete } from "react-icons/md"
import StarScoreIcon from "../icons/StarScoreIcon"


interface ReviewCardInterface {
    review: any,
    onDelete: (id:any) => any
}

const ReviewCard: React.FC<ReviewCardInterface> = ({ review, onDelete }) => {

    const { user }: any = useAuthContext()

    const isReviewUser = user.id === review.user.id

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
                                    <MenuItem onClick={() => onDelete(review.id)} icon={<MdDelete />}>Supprimer</MenuItem>
                                </MenuList>
                            </Menu>
                        }
                    </Flex>
                </CardHeader>
                <CardBody pt={0}>
                    <VStack alignItems={"flex-start"}>
                        <StarScoreIcon scrore={review.stars} />
                        <Text whiteSpace="pre-line">{review.content}</Text>
                    </VStack>
                </CardBody>
            </Card>
    )
}

export default ReviewCard