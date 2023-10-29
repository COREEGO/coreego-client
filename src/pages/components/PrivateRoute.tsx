import { ReactNode, useEffect } from "react"
import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthProvider"


const PrivateRoute: React.FC<any> = () => {

    const {user} = useAuthContext()
    const location = useLocation()

    return ( user ? <Outlet /> : <Navigate to="/login" state={{path: location.pathname}} /> )

}

export default PrivateRoute