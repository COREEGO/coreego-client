import React, { ReactNode, useEffect } from "react";
import { Divider, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@chakra-ui/react";

interface ModalWrapperProps {
    id: string;
    title?: any;
    renderButton: (onOpen: () => void) => ReactNode;
    renderFooter?: () => ReactNode;
    children: ReactNode;
    params: Record<string, string>,
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
            <Modal id={id} {...params} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalContent>
                    <ModalHeader>{title && <HStack> {title} </HStack>}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>
                    {
                        renderFooter && <ModalFooter> {renderFooter()} </ModalFooter>
                    }
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalWrapper;