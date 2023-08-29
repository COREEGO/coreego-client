import { useEffect } from "react"
import { Navigate, redirect } from "react-router"

const HomePage = () => {

    useEffect(() => {
        redirect('/discussion/feed')
    }, [])

    return <Navigate to="/discussion/feed" />

}

export default HomePage