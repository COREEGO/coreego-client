import { Card, CardBody, HStack, useDisclosure, Text, Modal, ModalContent, ModalHeader, Stack, ModalBody, Grid, GridItem, Divider, ModalCloseButton } from "@chakra-ui/react"
import { BsHeart } from "react-icons/bs"
import { VERTICAL_SPACING } from "../../utils/variables"
import PlaceCard from "../card/PlaceCard"
import DiscussionCard from "../card/DiscussionCard"



interface PropsInterface {
    places: Array<any>,
    discussions: Array<any>
}


const LikesUserModal: React.FC<PropsInterface> = ({ places, discussions }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const nbLike = places.length + discussions.length

    return (
        <>
            <Card w="100%" as="button" onClick={onOpen}>
                <CardBody display={"flex"} justifyContent={"center"} w="100%">
                    <Text fontSize="lg" as="span">
                        <HStack>
                            <BsHeart />
                            <Text>J'aimes</Text>
                        </HStack>
                    </Text>
                </CardBody>
            </Card>
            <Modal size="full" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>
                        {nbLike + " J'aimes"}
                    </ModalHeader>
                    <Divider borderColor={"black"} opacity={1} />
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={VERTICAL_SPACING}>
                            {
                                places.length && <Stack>
                                    <Text fontWeight={500} fontSize={"xl"}>Lieux</Text>
                                    <Grid gap={5} templateColumns={{
                                        base: "repeat(1, 1fr)",
                                        sm: "repeat(1, 1fr)",
                                        md: "repeat(3, 1fr)",
                                        lg: "repeat(4, 1fr)",
                                    }}>
                                        {
                                            places.map((place: any) => {
                                                return <GridItem key={'p-' + place.id}>
                                                    <PlaceCard size="sm" place={place} />
                                                </GridItem>
                                            })
                                        }
                                    </Grid>
                                </Stack>
                            }
                            {
                                discussions.length && <Stack>
                                    <Text fontWeight={500} fontSize={"xl"}>Discussions</Text>
                                    <Grid gap={5} templateColumns={{
                                        base: "repeat(1, 1fr)",
                                        sm: "repeat(1, 1fr)",
                                        md: "repeat(3, 1fr)",
                                        lg: "repeat(4, 1fr)",
                                    }}>
                                        {
                                            discussions.map((discussion: any) => {
                                                return <GridItem key={'d-' + discussion.id}>
                                                    <DiscussionCard size="sm" discussion={discussion} />
                                                </GridItem>
                                            })
                                        }
                                    </Grid>
                                </Stack>
                            }
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}

export default LikesUserModal