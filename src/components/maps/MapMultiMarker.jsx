import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"
import { useState } from "react"
import { BiMapAlt, BiSolidLandscape } from "react-icons/bi"
import PlaceMapCard from "../card/PlaceMapCard"
import { Box, Button, ButtonGroup } from "@mui/material"
import { LANDSCAPE_ICON, MAP_ICON } from "../../utils/icon"


const MapMultiMarker  = ({ places, withDetailCard = false }) => {

    // const [mapMode, setMapMode] = useState<'map' | 'roadview'>("map")
    const [mapType, setMapType] = useState("ROADMAP")

    const [target, setTarget] = useState(null)

    useKakaoLoader()

    const center = { lat: places[0].latitude, lng: places[0].longitude }

    return (
        <Map // 지도를 표시할 Container
            id="map"
            center={center}
            style={{
                width: "100%",
                height: "100%",
            }}
            mapTypeId={mapType}
            level={12} // 지도의 확대 레벨
        >
            {
                places.map((place) => {
                    return <Box key={place.id} id={place.id}>
                        <MapMarker onClick={() => withDetailCard ? setTarget(place) : {}} position={{ lat: place.latitude, lng: place.longitude }} />
                        {(withDetailCard && target) ?
                            <CustomOverlayMap position={{ lat: target.latitude, lng: target.longitude }}>
                                <Box sx={{ width: 300, height: '100%', maxWidth: '100%' }}>
                                    <PlaceMapCard onClose={() => setTarget(null)} place={target} />
                                </Box>
                            </CustomOverlayMap>
                            : <></>}
                    </Box>
                })
            }
            <ButtonGroup
                variant="contained"
                size="small"
                sx={{ position: 'absolute', top: 3, right: 3, zIndex: 10 }} >
                <Button disabled={mapType === 'ROADMAP'} onClick={() => setMapType('ROADMAP')} aria-label='Add to friends'><MAP_ICON /></Button>
                <Button disabled={mapType === 'HYBRID'} onClick={() => setMapType('HYBRID')} aria-label='Add to friends'><LANDSCAPE_ICON /></Button>
            </ButtonGroup>

        </Map>
    )
}

export default MapMultiMarker