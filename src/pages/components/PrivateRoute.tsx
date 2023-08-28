import { ReactNode, useEffect } from "react"
import { Outlet, useNavigate, Navigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthProvider"


const PrivateRoute: React.FC<any> = () => {

    const { user } = useAuthContext()

    return ( user ? <Outlet /> : <Navigate to="/login" /> )

}

export default PrivateRoute