import { Suspense, useEffect, useState } from "react"
import { useParams } from "react-router"
import useSWR from "swr"
import LoadingPage from "../../components/LoadingPage"
import { Box, Divider, Stack, Text, Flex, HStack, Spacer, Button } from "@chakra-ui/react"
import MapSimpleMarker from "../../components/maps/MapSimpleMarker"
import TitleText from "../../components/texts/TitleText"
import UserSniped from "../../components/react-ux/UserSniped"
import SavePlaceButton from "../../components/buttons/SavePlaceButton"
import ShareButton from "../../components/buttons/ShareButton"
import LikeButton from "../../components/buttons/LikeButton"
import ContainerSection from "../components/ContainerSection"
import { VERTICAL_SPACING } from "../../utils/variables"
import SlideSwiper from "../../components/swipers/SlideSwiper"
import CommentModule from "../components/modules/CommentModule"
import ReviewModule from "../components/modules/ReviewModule"

import { NavLink } from "react-router-dom"
import LocalisationText from "../../components/texts/LocalisationText"
import CategoryText from "../../components/texts/CategoryText"
import { belongsToAuth } from "../../utils"
import { EDIT_ICON } from "../../utils/icon"
import { useAuthContext } from "../../contexts/AuthProvider"

const Detail = () => {

    const params = useParams()
    const {user}:any = useAuthContext()
    const { data: place, mutate } = useSWR('/place/' + params.id, { suspense: true })

    useEffect(()=>{
        if(place) mutate()
    }, [])

    return (
        <Box py={VERTICAL_SPACING}>
            <Stack spacing={VERTICAL_SPACING}>
                <ContainerSection withPadding={true}>
                    <Stack spacing={VERTICAL_SPACING}>
                        <Stack alignItems={"flex-start"}>
                            {
                                belongsToAuth(place.user.id, user?.id) ?
                                    <NavLink to={`/voyage/place/edit/${params.id}`}>
                                        <Button variant="outline" leftIcon={<EDIT_ICON />}>Modifier</Button>
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
                        </Stack>
                        <Box h={{ base: 300, md: 350 }} w="100%">
                            <SlideSwiper images={place.images} />
                        </Box>
                        <Stack>
                            <Text as="b" fontSize="lg">Description :</Text>
                            <Text whiteSpace={"pre-line"}>
                                {place.description}
                            </Text>
                        </Stack>
                        <Box>
                            <Divider />
                            <Box py={3}>
                                <UserSniped
                                    avatar={place.user.avatar}
                                    pseudo={place.user.pseudo}
                                    publishDate={place.createdAt}
                                />
                            </Box>
                            <Divider />
                        </Box>
                        <Stack>
                            <Text> {place.address} </Text>
                            <Box h={{ base: 250, md: 400 }} position={"relative"} w="100%">
                                <MapSimpleMarker
                                    lng={place.longitude}
                                    lat={place.latitude}
                                    zoom={12}
                                    displayMapMode={true}
                                    displayMapType={true}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </ContainerSection>
                <Stack bg="white" position={"sticky"} bottom={0} py={3} zIndex={100}>
                    <ContainerSection withPadding={true}>
                        <HStack>
                            <LikeButton likes={place.likes} mutate={mutate} placeId={place.id} />
                            <SavePlaceButton
                                placeId={place.id}
                                savedPlaces={place.savedPlaces}
                                mutate={mutate}
                            />
                            <ShareButton />
                        </HStack>
                    </ContainerSection>
                </Stack>
                <CommentModule placeId={place.id} comments={place.comments} mutate={mutate} />
            </Stack>
        </Box>
    )

}

const PlaceDetail = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <Detail />
    </Suspense>

}

export default PlaceDetail