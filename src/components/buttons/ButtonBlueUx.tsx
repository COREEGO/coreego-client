import { Button } from "@mui/material";
import React from "react";

interface PropsInterface {
    children: React.ReactNode;
    options?: Record<any, any>
}

export const ButtonBlueUx: React.FC<PropsInterface> = ({ children, options }) => {
    return (
        <Button
            size="large"
            sx={{
                "&:hover": {
                    backgroundColor: 'var(--coreego-blue-light)',
                },
                bgcolor: 'var(--coreego-blue)', color: 'white',
            }}
            {...options}
            variant="outlined">
            {children}
        </Button>
    );
};
