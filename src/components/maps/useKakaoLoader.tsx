import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({
        appkey: "b23d5d4476f8161f8aa429875abc98cc",
        libraries: ["clusterer", "drawing", "services"],
    })
}