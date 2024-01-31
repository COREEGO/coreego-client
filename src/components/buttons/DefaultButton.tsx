import { Button, ButtonProps } from "@mui/material"
import { PropsWithChildren } from "react"


const DefaultButton = (props: PropsWithChildren<ButtonProps>) => {

    return (
        <Button
            {...props}
            variant="outlined"
            sx={{
                backgroundColor: 'white',
                borderColor: 'var(--mui-light)',
                '&:hover': {
                    borderColor: 'var(--mui-light)',
                    boxShadow: 'var(--box-shadow)',
                    backgroundColor: 'white'
                }
            }}>
            {props.children}
        </Button>
    )

}

export default DefaultButton