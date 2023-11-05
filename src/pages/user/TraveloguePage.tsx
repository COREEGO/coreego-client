import { Suspense } from "react"
import LoadingPage from "../../components/LoadingPage"




const Detail = () => {
    return <p>detail</p>
}


const TraveloguePage = () => {
    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <Detail />
        </Suspense>

    )
}

export default TraveloguePage