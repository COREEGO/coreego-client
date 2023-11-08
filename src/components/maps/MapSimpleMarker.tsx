import { Circle, CustomOverlayMap, Map, MapMarker, MapTypeControl, Roadview, RoadviewMarker } from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"
import { useRef, useState } from "react"
import { ButtonGroup, IconButton } from "@chakra-ui/react"
import { BiMapAlt, BiSolidLandscape, BiStreetView } from "react-icons/bi"
import { BsMapFill } from "react-icons/bs"



const MapSimpleMarker: React.FC<{
    lat: number,
    lng: number,
    zoom?: number,
    withCircle?: boolean
    displayMapMode?: boolean
    displayMapType?: boolean
}> = ({ lat, lng, zoom = 8, withCircle = false, displayMapMode = false, displayMapType = false }) => {

    const [mapMode, setMapMode] = useState<'map' | 'roadview'>("map")
    const [mapType, setMapType] = useState<"ROADMAP" | "HYBRID">("ROADMAP")

    useKakaoLoader()

    const position = { lat, lng }

    return (
        <>
            <Map // 지도를 표시할 Container
                id="map"
                center={{ ...position }}
                style={{
                    display: mapMode === "map" ? "block" : "none",
                    width: "100%",
                    height: "100%",
                }}
                mapTypeId={mapType}
                level={zoom} // 지도의 확대 레벨
            >
                <MapMarker position={{ ...position }} />
                {
                    withCircle && <Circle
                        center={{ ...position }}
                        radius={2000}
                        strokeWeight={1} // 선의 두께입니다
                        strokeColor={"blue"} // 선의 색깔입니다
                        strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle={"solid"} // 선의 스타일 입니다
                        fillColor={"#CFE7FF"} // 채우기 색깔입니다
                        fillOpacity={0.7} // 채우기 불투명도 입니다
                    />
                }
                {
                    displayMapMode && <>
                        {mapMode === "map" && (
                            <IconButton colorScheme="blue"
                                position={"absolute"}
                                top={3}
                                left={3}
                                zIndex={10}
                                onClick={() => setMapMode("roadview")} aria-label='' icon={<BiStreetView />} />
                        )}
                    </>
                }
                {
                    (displayMapType && mapMode === 'map' ) && <ButtonGroup
                        colorScheme="blue"
                        position={"absolute"}
                        top={3}
                        right={3}
                        zIndex={10} isAttached>
                        <IconButton isDisabled={mapType === 'ROADMAP'} onClick={() => setMapType('ROADMAP')} aria-label='Add to friends' icon={<BiMapAlt />} />
                        <IconButton isDisabled={mapType === 'HYBRID'} onClick={() => setMapType('HYBRID')} aria-label='Add to friends' icon={<BiSolidLandscape />} />
                    </ButtonGroup>
                }

            </Map>
            <Roadview // 로드뷰를 표시할 Container
                position={{ ...position, radius: 50 }}
                style={{
                    display: mapMode === "roadview" ? "block" : "none",
                    width: "100%",
                    height: "100%",
                }}
            >
                <RoadviewMarker position={{ ...position }} />
                {mapMode === "roadview" && (
                    <IconButton colorScheme="blue"
                        position={"absolute"}
                        top={3}
                        left={3}
                        zIndex={10}
                        onClick={() => setMapMode("map")} aria-label='' icon={<BsMapFill />} />
                )}
            </Roadview>
        </>
    )
}

export default MapSimpleMarker