import React, { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/AuthProvider"
import LoadingPage from "../../components/LoadingPage"
import { useDispatch, useSelector } from "react-redux"
import { apiFetch } from "../../http-common/apiFetch"
import { initCities, initDiscussionCategories, initPlaceCategories } from "../../store/reducers/app.reducer"
import Navigation from "../../components/navigation/Navigation"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import { Box, Container, Fade, Stack } from "@chakra-ui/react"


interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [appLoaded, setAppLoaded] = useState<boolean>(false)

    const { authentificate } = useAuthContext()

    const dispath = useDispatch()

    useEffect(() => {
        onLoadedApplication()
    }, [])

    // useEffect(() => {
    //     authentificate()
    // }, [localStorage.getItem('token')])

    const onLoadedApplication = async () => {
        try {
            setAppLoaded(false)

            authentificate()

            const discussionCategories = await apiFetch('/discussion_categories', 'GET')
            const placeCategories = await apiFetch('/place_categories', 'GET')
            const cities = await apiFetch('/cities', 'GET')

            if (discussionCategories) dispath(initDiscussionCategories(discussionCategories))
            if (placeCategories) dispath(initPlaceCategories(placeCategories))
            if (cities) dispath(initCities(cities))


        } catch (error:any) {
            console.log(JSON.parse(error.message).message)
        } finally {
            setAppLoaded(true)
        }
    }

    return appLoaded ? (
        <>
            <Navigation />
            {children}
        </>
    ) : <LoadingPage type="app" />
}


export default Layout