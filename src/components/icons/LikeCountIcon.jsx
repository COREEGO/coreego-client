import { Typography, Stack } from "@mui/material"
import { DISLIKE_ICON } from "../../utils/icon"



const LikeCountIcon = ({count}) => {

    return (
        <Stack direction={"row"} gap={0.5} alignItems="center">
            <DISLIKE_ICON  sx={{fontSize: 15}} />
            <Typography component="span" fontSize={15}>{count || 0}</Typography>
        </Stack>
    )

}

export default LikeCountIcon