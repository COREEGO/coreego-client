import { Box, Stack, Typography } from "@mui/material"
import NOTFIND_SVG  from '../images/svgs/not-find.svg'



const NotFoundComponent = ({showText = false, ...props}) => {

    return (
        <Stack spacing={3} maxWidth="100%" alignItems="center">
            <img alt="no content" style={{maxWidth: "100%"}} {...props} src={NOTFIND_SVG} />
            {showText && <Typography fontWeight="bold">Aucuns résultats</Typography>}
        </Stack>
    )
}

export default NotFoundComponent