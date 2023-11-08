import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { BiMapAlt } from "react-icons/bi"
import MapMultiMarker from "../maps/MapMultiMarker"

interface PropsInterface {
    places: Array<any>
}

const TravelLogueModal: React.FC<PropsInterface> = ({ places }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton onClick={onOpen} position={"fixed"} right={5} bottom={5} colorScheme="green" aria-label={"open map"} isRound size="lg" icon={<BiMapAlt />} />
            <Modal size="full" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <Box as="span" position={"relative"} zIndex={1000}>
                        <ModalCloseButton />
                    </Box>
                    <ModalBody p={0}>
                        <Box w="100wh" h="100vh">
                            <MapMultiMarker withDetailCard={true} places={places} />
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}

export default TravelLogueModal