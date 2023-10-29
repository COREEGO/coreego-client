import { Button, Divider, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { TbFilterCog } from "react-icons/tb"


const FilterModal: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton isRound={true} colorScheme="whiteAlpha" border={"1px solid black"} onClick={onOpen} icon={<TbFilterCog color="black" />} aria-label={"open modal"} />
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Filtres</ModalHeader>
                    <Divider />
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            {children}
                        </Stack>
                    </ModalBody>
                <ModalFooter>
                    <Button colorScheme="twitter" w="100%" onClick={onClose}>Rechercher</Button>
                </ModalFooter>
                </ModalContent>
                <ModalCloseButton />
            </Modal>
        </>
    )

}

export default FilterModal