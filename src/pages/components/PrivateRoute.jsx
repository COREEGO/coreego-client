import React, { useEffect } from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthProvider"
import { isAdmin } from "../../utils"


const PrivateRoute = ({middlewareIsAdmin = false}) => {

    const {auth} = useAuthContext()
    const [isAuthorized, setIsAuthorized] = React.useState(true)

    const {pathname} = useLocation()


    useEffect(() => {
        if (middlewareIsAdmin) {
          setIsAuthorized(isAdmin(auth?.role));
        }
      }, [auth, middlewareIsAdmin]);

    return ( (auth && isAuthorized) ? <Outlet /> : <Navigate to="/login" state={{path: pathname}} /> )

}

export default PrivateRoute