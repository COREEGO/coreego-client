import { Box, Stack, Typography } from "@mui/material"
import NOTFIND_SVG  from '../images/svgs/not-find.svg'



const NotFindComponent = ({showText = false, ...props}) => {

    return (
        <Stack spacing={3} maxWidth="100%" alignItems="center">
            <img style={{maxWidth: "100%"}} {...props} src={NOTFIND_SVG} />
            {showText && <Typography fontWeight="bold">Aucuns résultats</Typography>}

        </Stack>
    )
}

export default NotFindComponent