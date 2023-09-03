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
    Box,
    Divider
} from '@chakra-ui/react'
import React, { useRef } from "react"
import { MdOutlineFilterAlt } from 'react-icons/md'


interface DefaultDialogProps {
    children: React.ReactNode,
    handleFilterChange: (e: any) => {}
}

const FilterDialog: React.FC<DefaultDialogProps> = ({ children, handleFilterChange }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const cancelRef = useRef<any>()


    function onSubmit(e:any){
        e.preventDefault()
        handleFilterChange(e.target.elements)
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
                    <AlertDialogHeader display="flex" alignItems="center" >
                        <Text as="span" me="3">Filtres</Text>
                        <MdOutlineFilterAlt />
                    </AlertDialogHeader>
                    <Divider />
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Stack spacing={5}>
                            {children}
                        </Stack>
                    </AlertDialogBody>
                    <Divider />
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