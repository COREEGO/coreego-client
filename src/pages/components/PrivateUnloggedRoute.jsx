import React, { useEffect } from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthProvider"
import { isAdmin } from "../../utils"


const PrivateUnloggedRoute = () => {

    const {auth} = useAuthContext()

    const {pathname} = useLocation()

    return !auth ? <Outlet /> : <Navigate to="/" state={{path: pathname}} />

}

export default PrivateUnloggedRoute