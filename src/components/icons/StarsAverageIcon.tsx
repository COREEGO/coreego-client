import { Stack } from "@chakra-ui/react"
import { Typography } from "@mui/material"
import { STAR_ICON } from "../../utils/icon"

interface PropsInterface {
    datas: Array<any>
}

const StarsAverageIcon: React.FC<PropsInterface> = ({ datas }) => {

    const sum = datas.reduce((prev: number, curr: any) => prev + curr.stars, 0)

    const average: any = sum / datas.length || 0

    const reviewLabel = `(${datas.length} review${datas.length > 1 ? 's' : ''})`


    return (
        <Stack direction={"row"} alignItems={"center"}>
            <STAR_ICON sx={{color: 'orange'}} />
            {average && <Typography>{average + '/5'}  </Typography>}
            <Typography fontSize="sm"> {reviewLabel} </Typography>
        </Stack>
    )
}

export default StarsAverageIcon