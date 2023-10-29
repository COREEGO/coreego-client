import { Box } from "@chakra-ui/react"
import { StaticMap } from "react-kakao-maps-sdk"

interface StaticMapInterface {
    lat: number,
    lng: number
}

const ImageMap: React.FC<StaticMapInterface> = ({ lat, lng }) => {
    return (
                <StaticMap
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "100%"
                    }}
                    center={{
                        lat: lat,
                        lng: lng
                    }}
                    marker={{
                        position: {
                            lat: lat,
                            lng: lng
                        }
                    }}
                    level={5}
                />
    )
}

export default ImageMap