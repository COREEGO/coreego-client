import React, { ReactNode, useEffect } from "react";
import { Divider, Text, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure, ModalOverlay, Portal, Button } from "@chakra-ui/react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack } from "@mui/material";
import { Transition } from "framer-motion";

interface ModalWrapperProps {
    id: string;
    title?: any;
    renderButton: (onOpen: () => void) => ReactNode;
    renderFooter?: () => ReactNode;
    children?: ReactNode;
    params?: Record<any, any>,
    options?: Record<any, any>,
    showDivider?: boolean,
    renderBody: Function
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
    id,
    renderButton,
    renderFooter,
    children,
    params,
    options,
    title,
    renderBody
}) => {
    const [open, setOpen] = React.useState<boolean>(false);


    return (
        <>
            {renderButton(() => setOpen(true))}
            {
                open && <Dialog
                    maxWidth="md"
                    open={open}
                    keepMounted
                    onClose={() => setOpen(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    {
                        title ? <DialogTitle><Stack direction={"row"} alignItems={"center"}> {title} </Stack></DialogTitle> : <></>
                    }
                    {
                        renderBody ? <DialogContent>
                            {renderBody()}
                        </DialogContent> : <></>
                    }

                    {
                        renderFooter && <DialogActions> {renderFooter()} </DialogActions>
                    }

                </Dialog>
            }

        </>
    );
};

export default ModalWrapper;