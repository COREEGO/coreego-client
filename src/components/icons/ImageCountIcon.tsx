


import { Stack } from "@chakra-ui/react"
import { IMAGE_ICON } from "../../utils/icon"
import { Typography } from "@mui/material"


interface PropsInterface{
    length: number
}

const ImageCountIcon : React.FC<PropsInterface> = ({length}) => {

    return (
        <Stack direction={"row"} spacing={0}>
            <IMAGE_ICON />
            <Typography component="span">{length || 0}</Typography>
        </Stack>
    )

}

export default ImageCountIcon