import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

interface MapMarkerInterface{
    data: any,
    size?: any
}

const MapMarker: React.FC<MapMarkerInterface> = ({data, size = { base: 200, sm: 200, md: 300 } }) => {

    const latLong : any = [data.x || data.lat, data.y || data.lon]

    return (
        <Box h={size} >
        <MapContainer style={{height: '100%', width: '100%'}} center={latLong} zoom={15} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latLong}>
                {
                    data.title && <Popup>
                    {data.title}
                </Popup>
                }
            </Marker>
        </MapContainer>
                </Box>
    )
}

export default MapMarker