import { Circle, CustomOverlayMap, Map, MapMarker, MapTypeControl, Roadview, RoadviewMarker } from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"
import { useRef, useState } from "react"
import { BiMapAlt, BiSolidLandscape, BiStreetView } from "react-icons/bi"
import { BsMapFill } from "react-icons/bs"
import { Button, ButtonGroup, IconButton } from "@mui/material"
import { MAP_ICON, LANDSCAPE_ICON, STREET_VIEW_ICON } from "../../utils/icon"



const MapSimpleMarker = ({ style = {}, lat, lng, zoom = 8, updateMarker, withCircle = false, displayMapMode = false, displayMapType = false }) => {

    const [mapMode, setMapMode] = useState("map")
    const [mapType, setMapType] = useState("ROADMAP")

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
                    ...style
                }}
                mapTypeId={mapType}
                level={zoom} // 지도의 확대 레벨
                onClick={(_t, mouseEvent) => updateMarker ? updateMarker(
                    { lat: mouseEvent.latLng.getLat(), lng: mouseEvent.latLng.getLng() }
                ) : {}}
            >
                {position && <MapMarker position={{ ...position }} />}
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
                            <IconButton
                                size="small"
                                color="primary"
                                sx={{ position: 'absolute', top: 3, left: 3, zIndex: 100 }}
                                onClick={() => setMapMode("roadview")} aria-label=''>
                                <STREET_VIEW_ICON />
                            </IconButton>
                        )}
                    </>
                }
                {
                    (displayMapType && mapMode === 'map') &&  <ButtonGroup
                    variant="contained"
                    size="small"
                    sx={{ position: 'absolute', top: 3, right: 3, zIndex: 10 }} >
                    <Button disabled={mapType === 'ROADMAP'} onClick={() => setMapType('ROADMAP')} aria-label='Add to friends'><MAP_ICON /></Button>
                    <Button disabled={mapType === 'HYBRID'} onClick={() => setMapType('HYBRID')} aria-label='Add to friends'><LANDSCAPE_ICON /></Button>
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
                    <IconButton
                        color="primary"
                        size="small"
                        sx={{ position: 'absolute', top: 3, left: 3, zIndex: 10 }}
                        onClick={() => setMapMode("map")} aria-label=''>
                        <MAP_ICON />
                    </IconButton>
                )}
            </Roadview>
        </>
    )
}

export default MapSimpleMarker