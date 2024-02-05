import React, { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/AuthProvider"
import LoadingPage from "../../components/LoadingPage"
import { useDispatch } from "react-redux"
import { initCities, initDiscussionCategories, initPlaceCategories, initLanguages } from "../../store/reducers/app.reducer"
import Navigation from "../../components/navigation/Navigation"
import { apiFetch } from "../../http-common/apiFetch"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const dispath = useDispatch()
    const { authentification }: any = useAuthContext()

    useEffect(() => {
        onLoadedApplication()
    }, [])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            authentification()
        }
    }, [localStorage.getItem('token')])

    const onLoadedApplication = async () => {
        try {
            const discussionCategories: any = await apiFetch('/discussion-categories', 'GET')
            const placeCategories = await apiFetch('/place-categories', 'GET')
            const cities = await apiFetch('/cities', 'GET')
            const languages = await apiFetch('/languages', 'GET')


            dispath(initDiscussionCategories(discussionCategories))
            dispath(initPlaceCategories(placeCategories))
            dispath(initCities(cities))
            dispath(initLanguages(languages))


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