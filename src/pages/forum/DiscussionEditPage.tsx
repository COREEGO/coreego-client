import { useParams } from "react-router"
import DiscussionForm from "../../components/forms/DiscussionForm"
import { Suspense, useEffect, useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import LoadingPage from "../../components/LoadingPage"
import useSWR from "swr"

const Discussion = () => {

    const params = useParams()
    const { data, error, mutate } = useSWR(`/discussion/${params.id}`, {suspense: true})

    if (error) console.log(error)
    return <DiscussionForm isEditMode={true} data={data} mutate={mutate} />
}

const DiscussionEditPage = () => {
    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <Discussion />
        </Suspense>
    )
}

export default DiscussionEditPage