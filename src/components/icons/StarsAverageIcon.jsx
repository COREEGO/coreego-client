import { Typography, Stack } from "@mui/material"
import { STAR_ICON } from "../../utils/icon"

const StarsAverageIcon = ({ datas }) => {

    const sum = datas.reduce((prev, curr) => prev + curr.stars, 0)

    const average = sum / datas.length || 0

    const reviewLabel = `(${datas.length} review${datas.length > 1 ? 's' : ''})`


    return (
        <Stack spacing={1} direction="row" alignItems="center">
            <STAR_ICON sx={{color: 'orange'}} />
            {average && <Typography>{average + '/5'}  </Typography>}
            <Typography fontSize="sm"> {reviewLabel} </Typography>
        </Stack>
    )
}

export default StarsAverageIcon