import { Circle, CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"



const MapSimpleMarker: React.FC<{ lat: number, lng: number, withCircle: boolean }> = ({ lat, lng, withCircle = false }) => {

    useKakaoLoader()

    return (
        <Map // 지도를 표시할 Container
            id="map"
            center={{ lat, lng }}
            style={{
                // 지도의 크기
                width: "100%",
                height: "100%",
            }}
            level={8} // 지도의 확대 레벨
        >
            {
                withCircle && <Circle
                    center={{
                        lat: lat,
                        lng: lng,
                    }}
                    radius={2000}
                    strokeWeight={1} // 선의 두께입니다
                    strokeColor={"blue"} // 선의 색깔입니다
                    strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"solid"} // 선의 스타일 입니다
                    fillColor={"#CFE7FF"} // 채우기 색깔입니다
                    fillOpacity={0.7} // 채우기 불투명도 입니다
                />
            }
            <MapMarker // 마커를 생성합니다
                position={{ lat, lng }}
            />
        </Map>
    )
}

export default MapSimpleMarker