


import { Typography, Stack } from "@mui/material"
import { COMMENT_ICON } from "../../utils/icon"


const CommentCountIcon = ({length}) => {

    return (
        <Stack direction="row" alignItems="center" gap={0.5}>
            <COMMENT_ICON sx={{fontSize: 15}} />
            <Typography component="span" sx={{fontSize: 15}}>{length || 0}</Typography>
        </Stack>
    )

}

export default CommentCountIcon