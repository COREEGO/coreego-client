import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

interface MapMarkerInterface{
    data: any
}

const MapMarker: React.FC<MapMarkerInterface> = ({data}) => {

    const {x,y} = data

    return (
        <MapContainer style={{height: '100%', width: '100%'}} center={[x,y]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[x,y]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>

    )
}

export default MapMarker