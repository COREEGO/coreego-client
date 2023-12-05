import { Stack, Typography } from "@mui/material"
import { MARKER_ICON } from "../../utils/icon"



const LocalisationText: React.FC<{ city: any, district?: any }> = ({ city, district = '' }) => {

    return (
        <Stack direction={"row"} flex={1} color="var(--coreego-blue)">
            <MARKER_ICON />
            <Typography  noWrap={true}> {city.label} {district && ', ' + district?.label} </Typography>
        </Stack>
    )
}

export default LocalisationText