import { useParams } from "react-router"
import DiscussionForm from "../../components/forms/DiscussionForm"
import React from "react"
import LoadingPage from "../../components/LoadingPage"
import axios from "axios"
import useMiddleware from "../../hooks/useMiddleware"


const DiscussionEditPage = () => {
    const params = useParams()

    const [isLoaded, setIsLoaded] = React.useState(false)
    const [discussion, setDiscussion] = React.useState()

    const {canEdit} = useMiddleware()

    React.useEffect(()=>{
        const loadDiscussion = async () =>{
            try {
                const response = await axios.get(`/discussions/${params.slug}`)
                canEdit(response.data.user.id)
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