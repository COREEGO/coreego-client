import React, { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/AuthProvider"
import LoadingPage from "../../components/LoadingPage"
import { useDispatch } from "react-redux"
import { initCities, initDiscussionCategories, initPlaceCategories, initLanguages } from "../../store/reducers/app.reducer"
import Navigation from "../../components/navigation/Navigation"
import { apiFetch } from "../../http-common/apiFetch"
import axios from "axios"
import { TOKEN } from "../../utils/variables"

const Layout = ({ children }) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const dispath = useDispatch()
    const { authentification } = useAuthContext()



    useEffect(() => {
        onLoadedApplication()
    }, [])



    const onLoadedApplication = async () => {
        try {
            const discussionCategories = await axios.get('/discussion-categories')
            const placeCategories = await axios.get('/place-categories')
            const cities = await axios.get('/cities')
            const languages = await axios.get('/languages')


            dispath(initDiscussionCategories(discussionCategories.data))
            dispath(initPlaceCategories(placeCategories.data))
            dispath(initCities(cities.data))
            dispath(initLanguages(languages.data))

            if(TOKEN){
                await authentification()
            }

        } catch (error) {
            console.error(error.message)
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