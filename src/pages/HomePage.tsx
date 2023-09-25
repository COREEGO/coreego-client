import { useEffect } from "react"
import { Navigate, redirect } from "react-router"

const HomePage = () => {

    useEffect(() => {
        redirect('/discussions')
    }, [])

    return <Navigate to="/discussions" />

}

export default HomePage