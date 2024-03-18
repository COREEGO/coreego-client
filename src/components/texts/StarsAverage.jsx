import { Stack, Typography } from "@mui/material"
import { STAR_ICON } from "../../utils/icon"



const StarsAverage = ({ datas }) => {

    const sum = datas.reduce((prev, curr) => prev + curr.stars, 0)

    const average = sum / datas.length || 0

    const reviewLabel = `(${datas.length} review ${datas.length > 1 ? 's' : ''})`

    return (
        <Stack alignItem="center" spacing={1}>
            <STAR_ICON color="orange" />
            { average > 0 &&  <Text> {average} </Text> }
            <Typography color="grey" fontSize="sm"> {reviewLabel} </Typography>
        </Stack>
    )

}

export default StarsAverage