import { useParams } from "react-router"
import { Suspense, useEffect, useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import LoadingPage from "../../components/LoadingPage"
import useSWR from "swr"
import ProductForm from "../../components/forms/ProductForm"
import PlaceForm from "../../components/forms/PlaceForm"

const Place = () => {

    const params = useParams()

    const { data, error, mutate } = useSWR(`/place/${params.id}`, {suspense: true})

    if (error) console.log(error)

    return <PlaceForm isEditMode={true} data={data} mutate={mutate} />
}

const PlaceEditPage = () => {
    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <Place />
        </Suspense>
    )
}

export default PlaceEditPage