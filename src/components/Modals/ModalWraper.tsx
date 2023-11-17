import React, { ReactNode, useEffect } from "react";
import { Divider, Text, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure, ModalOverlay, Portal } from "@chakra-ui/react";

interface ModalWrapperProps {
    id: string;
    title?: any;
    renderButton: (onOpen: () => void) => ReactNode;
    renderFooter?: () => ReactNode;
    children: ReactNode;
    params?: Record<any, any>,
    showDivider?: boolean
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
    id,
    renderButton,
    renderFooter,
    children,
    params,
    title,
}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {renderButton(onOpen)}
            {
                isOpen && <Modal id={id} {...params} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader>{title && <HStack> {title} </HStack>}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>{children}</ModalBody>
                        {
                            renderFooter && <ModalFooter> {renderFooter()} </ModalFooter>
                        }
                    </ModalContent>
                </Modal>
            }

        </>
    );
};

export default ModalWrapper;