import { Stack, Typography } from "@mui/material"
import { STAR_ICON } from "../../utils/icon"

const StarScoreIcon  = ({scrore}) => {

    return(
        <Stack>
            <STAR_ICON color="orange" />
            <Typography>{scrore + '/5'}</Typography>
        </Stack>
    )
}

export default StarScoreIcon