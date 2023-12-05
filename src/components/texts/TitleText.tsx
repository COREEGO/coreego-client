import { Typography } from "@mui/material"

const TitleText : React.FC<{text:string}> = ({text }) => {
    return (
        <Typography sx={{whiteSpace: 'normal'}} variant="h1" fontSize={24} fontWeight="bold">{text}</Typography>
    )
}

export default TitleText