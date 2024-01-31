import React, { ReactNode, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack, IconButton, Box } from "@mui/material";
import { Transition } from "framer-motion";
import { CLOSE_ICON } from "../../utils/icon";

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
                        title ? <DialogTitle color="var(--coreego-blue)"><Stack direction={"row"} alignItems={"center"}> {title} </Stack></DialogTitle> : <></>
                    }
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CLOSE_ICON />
                    </IconButton>
                    {
                        renderBody ? <DialogContent dividers>
                            <Box sx={{ width: 500, maxWidth: '100%', margin: 'auto' }}>
                                {renderBody()}
                            </Box>
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