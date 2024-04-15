import PlaceForm from "../../components/forms/PlaceForm"
import { Helmet } from 'react-helmet'

const PlaceCreatePage = () => {

    return (
        <>
            <Helmet>
                <title>Nouveau lieu | Coreego</title>
            </Helmet>
            <PlaceForm />
        </>
    )
}

export default PlaceCreatePage