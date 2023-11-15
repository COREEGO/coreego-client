import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"
import { useState } from "react"
import { Box, ButtonGroup, IconButton } from "@chakra-ui/react"
import { BiMapAlt, BiSolidLandscape } from "react-icons/bi"
import PlaceMapCard from "../card/PlaceMapCard"


const MapMultiMarker: React.FC<{
    places: Array<any>,
    withDetailCard?: boolean
}> = ({ places, withDetailCard = false }) => {

    // const [mapMode, setMapMode] = useState<'map' | 'roadview'>("map")
    const [mapType, setMapType] = useState<"ROADMAP" | "HYBRID">("ROADMAP")

    const [target, setTarget] = useState<any>(null)

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
                places.map((place: any) => {
                    return <Box id={place.id}>
                        <MapMarker onClick={() => withDetailCard ? setTarget(place) : {}} position={{ lat: place.latitude, lng: place.longitude }} />
                        {(withDetailCard && target) ?
                            <CustomOverlayMap position={{ lat: target.latitude, lng: target.longitude }}>
                                <Box w={100}>
                                    <PlaceMapCard onClose={() => setTarget(null)} place={target} />
                                </Box>
                            </CustomOverlayMap>
                            : <></>}
                    </Box>
                })
            }
            <ButtonGroup
                colorScheme="blue"
                position={"absolute"}
                top={3}
                right={20}
                zIndex={10} isAttached>
                <IconButton isDisabled={mapType === 'ROADMAP'} onClick={() => setMapType('ROADMAP')} aria-label='Add to friends' icon={<BiMapAlt />} />
                <IconButton isDisabled={mapType === 'HYBRID'} onClick={() => setMapType('HYBRID')} aria-label='Add to friends' icon={<BiSolidLandscape />} />
            </ButtonGroup>

        </Map>
    )
}

export default MapMultiMarker