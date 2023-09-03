import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
    Text,
    Stack,
    Box
} from '@chakra-ui/react'
import React, { useRef } from "react"
import { MdOutlineFilterAlt } from 'react-icons/md'


interface DefaultDialogProps {
    children: React.ReactNode,
    handleFormElements: (e: any) => {}
}

const FilterDialog: React.FC<DefaultDialogProps> = ({ children, handleFormElements }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const cancelRef = useRef<any>()


    function onSubmit(e:any){
        e.preventDefault()
        handleFormElements(e.target.elements)
        onClose()
    }

    return (
        <>
            <Button onClick={onOpen} bg="var(--coreego-red)" color="white" width="fit-content" p={2} borderRadius={90}>
                <MdOutlineFilterAlt />
            </Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <Box as="form" onSubmit={onSubmit}>
                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Stack spacing={5}>
                            {children}
                        </Stack>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button size="sm" colorScheme='gray' ref={cancelRef} onClick={onClose}>
                            Annuler
                        </Button>
                        <Button size="sm" colorScheme='blue' ml={3} type='submit'>
                            Filter
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </Box>
            </AlertDialog>
        </>
    )
}

export default FilterDialog