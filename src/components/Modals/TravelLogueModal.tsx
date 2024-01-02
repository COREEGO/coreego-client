import { BiMapAlt } from "react-icons/bi"
import MapMultiMarker from "../maps/MapMultiMarker"
import { useEffect, useState } from "react"
import { Box, Dialog, Fab, IconButton } from "@mui/material"
import { CLOSE_ICON, MAP_ICON } from "../../utils/icon"

interface PropsInterface {
    places: Array<any>
}

const TravelLogueModal: React.FC<PropsInterface> = ({ places }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            <Fab onClick={() => setIsOpen(true)} sx={{ position: 'fixed', bottom: 10, right: 10 }} color="success" aria-label="add">
                <MAP_ICON />
            </Fab>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <IconButton
                    sx={{ position: 'fixed', left: 20, top: 5, zIndex: 10 }}
                    edge="start"
                    color="inherit"
                    onClick={() => setIsOpen(false)}
                    aria-label="close"
                >
                    <CLOSE_ICON />
                </IconButton>
                <Box sx={{width: '100vw', height: '100vh' }}>
                    <MapMultiMarker withDetailCard={true} places={places} />
                </Box>
            </Dialog>
        </>
    )

}

export default TravelLogueModal