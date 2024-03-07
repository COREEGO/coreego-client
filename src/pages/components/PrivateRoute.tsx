import { ReactNode, useEffect } from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthProvider"
import { isAdmin } from "../../utils"


const PrivateRoute: React.FC<any> = (middlewareIsAdmin = false) => {

    const {user} : any = useAuthContext()

    const location = useLocation()

    let isAuthorized = true

    if(middlewareIsAdmin && user){
        isAuthorized =  isAdmin(user?.role)
    }


    return ( (user && isAuthorized) ? <Outlet /> : <Navigate to="/login" state={{path: location.pathname}} /> )

}

export default PrivateRoute