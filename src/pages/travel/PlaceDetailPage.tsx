import { Suspense, useEffect, useState } from "react"
import { useParams } from "react-router"
import useSWR from "swr"
import LoadingPage from "../../components/LoadingPage"
import MapSimpleMarker from "../../components/maps/MapSimpleMarker"
import TitleText from "../../components/texts/TitleText"
import UserSniped from "../../components/react-ux/UserSniped"
import SavePlaceButton from "../../components/buttons/SavePlaceButton"
import ShareButton from "../../components/buttons/ShareButton"
import LikeButton from "../../components/buttons/LikeButton"
import SlideSwiper from "../../components/swipers/SlideSwiper"
import CommentModule from "../components/modules/CommentModule"
import ReviewModule from "../components/modules/ReviewModule"

import { NavLink } from "react-router-dom"
import LocalisationText from "../../components/texts/LocalisationText"
import CategoryText from "../../components/texts/CategoryText"
import { belongsToAuth } from "../../utils"
import { EDIT_ICON } from "../../utils/icon"
import { useAuthContext } from "../../contexts/AuthProvider"
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material"

const Detail = () => {

    const params = useParams()
    const { user }: any = useAuthContext()
    const { data: place, mutate } = useSWR('/place/' + params.id, { suspense: true })

    useEffect(() => {
        if (place) mutate()
    }, [])

    return (
        <>
            <Box my={5}>
                <Container maxWidth="lg">
                    <Stack spacing={2} >
                        <Stack spacing={3} alignItems={"flex-start"}>
                            {
                                belongsToAuth(place.user.id, user?.id) ?
                                    <NavLink to={`/voyage/place/edit/${params.id}`}>
                                        <Button variant="outlined" startIcon={<EDIT_ICON />}>Modifier</Button>
                                    </NavLink>
                                    :
                                    <></>
                            }
                            <TitleText text={place.title} />
                            <NavLink to={"/voyage?category=" + place.category.id}>
                                <CategoryText category={place.category} />
                            </NavLink>
                            <NavLink to={`/voyage?city=${place.city.id}&district=${place.district.id}`}>
                                <LocalisationText city={place.city} district={place.district} />
                            </NavLink>
                            <ReviewModule placeId={place.id} mutate={mutate} reviews={place.reviews} />
                            <Box sx={{ height: { xs: 300, md: 350 }, width: '100%' }}>
                                <SlideSwiper images={place.images} />
                            </Box>
                            <Stack spacing={2}>
                                <Typography component="span" variant="h6" sx={{ fontWeight: 'bold' }}>Description :</Typography>
                                <Typography sx={{ whiteSpace: 'pre-line', mt: 1 }} paragraph={true}>
                                    {place.description}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box>
                            <Divider />
                            <Box py={3}>
                                <UserSniped
                                    avatar={place.user.avatarPath}
                                    pseudo={place.user.pseudo}
                                    publishDate={place.created_at}
                                />
                            </Box>
                            <Divider />
                        </Box>
                        <Stack spacing={2}>
                            <Typography component="span" variant="h6" sx={{ fontWeight: 'bold' }}> Adresse </Typography>
                            <Typography> {place.address} </Typography>
                            <Box sx={{ height: { xs: 250, md: 400 }, width: '100%', position: 'relative' }}>
                                <MapSimpleMarker
                                    lng={place.longitude}
                                    lat={place.latitude}
                                    zoom={1}
                                    displayMapMode={true}
                                    displayMapType={true}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
                <Stack sx={{ bgcolor: 'white', position: 'sticky', bottom: 0, py: 3, zIndex: 100 }}>
                    <Container maxWidth="lg">
                        <Stack direction={"row"} spacing={1}>
                            <LikeButton likes={place.likes} mutate={mutate} placeId={place.id} />
                            <SavePlaceButton
                                placeId={place.id}
                                savedPlaces={place.savedPlaces}
                                mutate={mutate}
                            />
                            <ShareButton />
                        </Stack>
                    </Container>
                </Stack>
            </Box>
            <CommentModule placeId={place.id} comments={place.comments} mutate={mutate} />
        </>
    )

}

const PlaceDetail = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <Detail />
    </Suspense>

}

export default PlaceDetail