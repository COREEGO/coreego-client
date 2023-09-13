import React, { useEffect, useState } from "react"
import HeaderNavigation from "../components/navigation/HeaderNavigation"
import { useAuthContext } from "../../contexts/AuthProvider"
import LoadingPage from "../../components/LoadingPage"
import { useDispatch, useSelector } from "react-redux"
import { apiFetch } from "../../http-common/apiFetch"
import { initCities, initDiscussionCategories, initPlaceCategories } from "../../store/reducers/app.reducer"
import Navigation from "../components/navigation/Navigation"


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
            const cities = await apiFetch('/cities', 'GET')

            if (discussionCategories) dispath(initDiscussionCategories(discussionCategories))
            if (placeCategories) dispath(initPlaceCategories(placeCategories))
            if (cities) dispath(initCities(cities))




        } catch (error) {

        } finally {
            setAppLoaded(true)
        }
    }

    return appLoaded ? (
        <>
            <Navigation>
                {children}
            </Navigation>
        </>
    ) : <LoadingPage type="app" />
}


export default Layout