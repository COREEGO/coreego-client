import { Typography, Stack } from "@mui/material"
import { STAR_ICON } from "../../utils/icon"

const StarsAverageIcon = ({ datas }) => {

    const reviewLabel = `( ${datas.count} avi${datas.count > 1 ? 's' : ''} )`

    return (
        <Stack spacing={1} direction="row" alignItems="center">
            <STAR_ICON sx={{color: 'orange'}} />
            {datas.average && <Typography>{datas.average  + '/5'}  </Typography>}
            <Typography fontSize="sm"> {reviewLabel} </Typography>
        </Stack>
    )
}

export default StarsAverageIcon