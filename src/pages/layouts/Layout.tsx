import React, { useEffect, useState } from "react"
import HeaderNavigation from "../components/navigation/HeaderNavigation"
import { useAuthContext } from "../../contexts/AuthProvider"
import LoadingPage from "../../components/LoadingPage"
import { useDispatch, useSelector } from "react-redux"
import { apiFetch } from "../../http-common/apiFetch"
import { initDiscussionCategories, initPlaceCategories } from "../../store/reducers/app.reducer"
import { Box } from "@chakra-ui/react"


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

    const onLoadedApplication = async () => {
        try {
            setAppLoaded(false)
            await authentificate()

            const discussionCategories = await apiFetch('/discussion_categories', 'GET')
            const placeCategories = await apiFetch('/place_categories', 'GET')

            if (discussionCategories) {
                dispath(initDiscussionCategories(discussionCategories))
            }

            if (placeCategories) {
                dispath(initPlaceCategories(placeCategories))
            }

        } catch (error) {

        } finally {
            setAppLoaded(true)
        }
    }

    return appLoaded ? (
        <>
            <HeaderNavigation />
            {children}
        </>
    ) : <LoadingPage type="app" />
}


export default Layout