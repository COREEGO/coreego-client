import { useParams } from "react-router"
import DiscussionForm from "../../components/forms/DiscussionForm"
import React, { Suspense, useEffect, useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import LoadingPage from "../../components/LoadingPage"
import useSWR from "swr"
import axios from "axios"
import { toast } from "react-toastify"


const DiscussionEditPage = () => {
    const params = useParams()

    const [isLoaded, setIsLoaded] = React.useState(false)
    const [discussion, setDiscussion] = React.useState()

    React.useEffect(()=>{
        const loadDiscussion = async () =>{
            try {
                const response = await axios.get(`/discussions/${params.slug}`)
                setDiscussion(response.data)
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoaded(true)
            }
        }
        loadDiscussion()
    }, [])

    return isLoaded ? <DiscussionForm  isEditMode={true} discussion={discussion} /> : <LoadingPage type="page" />

}

export default DiscussionEditPage