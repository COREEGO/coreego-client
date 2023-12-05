import { Typography } from "@mui/material"

const TitleText : React.FC<{text:string}> = ({text }) => {
    return (
        <Typography variant="h1" fontSize={24} fontWeight="bold" gutterBottom>{text}</Typography>
    )
}

export default TitleText