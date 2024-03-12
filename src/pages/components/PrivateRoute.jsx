import React, { ReactNode, useEffect } from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthProvider"
import { isAdmin } from "../../utils"


const PrivateRoute = ({middlewareIsAdmin = false}) => {

    const {user} = useAuthContext()
    const [isAuthorized, setIsAuthorized] = React.useState(true)

    const location = useLocation()


    useEffect(() => {
        if (middlewareIsAdmin) {
          setIsAuthorized(isAdmin(user?.role));
        }
      }, [user, middlewareIsAdmin]);


    return ( (user && isAuthorized) ? <Outlet /> : <Navigate to="/login" state={{path: location.pathname}} /> )

}

export default PrivateRoute