import React, { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/AuthProvider"
import LoadingPage from "../../components/LoadingPage"
import { useDispatch, useSelector } from "react-redux"
import { initCities, initDiscussionCategories, initPlaceCategories } from "../../store/reducers/app.reducer"
import Navigation from "../../components/navigation/Navigation"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import { Box, Container, Fade, Stack } from "@chakra-ui/react"
import { apiFetch } from "../../http-common/apiFetch"
import useSWR from "swr"
import useRefreshToken from "../../hooks/useRefreshToken"
interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const { user, setUser }: any = useAuthContext()
    const dispath = useDispatch()

    useEffect(() => {
        onLoadedApplication()
    }, [])

    const onLoadedApplication = async () => {
        try {
            setIsLoaded(false)

            const discussionCategories = await apiFetch('/discussion_categories', 'GET')
            const placeCategories = await apiFetch('/place_categories', 'GET')
            const cities = await apiFetch('/cities', 'GET')


            if (discussionCategories) dispath(initDiscussionCategories(discussionCategories))
            if (placeCategories) dispath(initPlaceCategories(placeCategories))
            if (cities) dispath(initCities(cities))

        } catch (error: any) {
            console.error(JSON.parse(error.message))
        } finally {
            setIsLoaded(true)
        }
    }

    return isLoaded ? (
        <>
            <Navigation />
            {children}
        </>
    ) : <LoadingPage type="app" />
}


export default Layout