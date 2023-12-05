import { Stack } from "@chakra-ui/react"
import { Typography } from "@mui/material"
import { DISLIKE_ICON } from "../../utils/icon"





interface PropsInterface{
    length: number
}

const LikeCountIcon : React.FC<PropsInterface> = ({length}) => {

    return (
        <Stack direction={"row"} spacing={0}>
            <DISLIKE_ICON />
            <Typography component="span">{length || 0}</Typography>
        </Stack>
    )

}

export default LikeCountIcon