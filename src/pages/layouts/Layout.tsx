import React, { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/AuthProvider"
import LoadingPage from "../../components/LoadingPage"
import { useDispatch, useSelector } from "react-redux"
import { initCities, initDiscussionCategories, initPlaceCategories, initLanguages } from "../../store/reducers/app.reducer"
import Navigation from "../../components/navigation/Navigation"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import { Box, Container, Fade, Stack } from "@chakra-ui/react"
import { apiFetch } from "../../http-common/apiFetch"
import useSWR from "swr"
import useRefreshToken from "../../hooks/useRefreshToken"
import { useLocation, useNavigate, useParams } from "react-router"
interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const dispath = useDispatch()
    const {authentification} : any = useAuthContext()
    useEffect(() => {
        onLoadedApplication()
    }, [])

    const onLoadedApplication = async () => {
        try {
            setIsLoaded(false)
            await authentification()
            const discussionCategories : any = await apiFetch('/discussion_categories', 'GET')
            const placeCategories = await apiFetch('/place_categories', 'GET')
            const cities = await apiFetch('/cities', 'GET')
            const languages = await apiFetch('/languages', 'GET')


            if (discussionCategories){
                dispath(initDiscussionCategories(discussionCategories))
                localStorage.setItem('discussion_categories', JSON.stringify(discussionCategories))
            }
            if (placeCategories) dispath(initPlaceCategories(placeCategories))
            if (cities) dispath(initCities(cities))
            if(languages) dispath(initLanguages(languages))

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