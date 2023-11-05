import { Suspense } from "react"
import { useParams } from "react-router"
import useSWR from "swr"
import LoadingPage from "../../components/LoadingPage"
import { Box, Divider, Stack, Text, Flex, HStack, Spacer } from "@chakra-ui/react"
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

const Detail = () => {

    const params = useParams()

    const { data: place, mutate } = useSWR('/places/' + params.id, { suspense: true })

    return (
        <Box py={VERTICAL_SPACING}>
            <Stack spacing={VERTICAL_SPACING}>
                <ContainerSection withPadding={true}>
                    <Stack spacing={VERTICAL_SPACING}>
                        <Flex alignItems={"start"} flexWrap="wrap" gap={5}>
                            <Stack>
                                <TitleText text={place.title} />
                                <NavLink to={"/voyage?category=" + place.category.id}>
                                    <CategoryText category={place.category} />
                                </NavLink>
                                <NavLink to={`/voyage?city=${place.city.id}&district=${place.district.id}`}>
                                    <LocalisationText city={place.city} district={place.district} />
                                </NavLink>
                                <ReviewModule placeId={place.id} mutate={mutate} reviews={place.reviews} />
                            </Stack>
                            <Spacer />
                            <HStack>
                                <LikeButton likes={place.likes} mutate={mutate} placeId={place.id} />
                                <SavePlaceButton
                                    placeId={place.id}
                                    savedPlaces={place.savedPlaces}
                                    mutate={mutate}
                                />
                                <ShareButton />
                            </HStack>
                        </Flex>
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
                            <Box h={{ base: 300, md: 350 }} w="100%">
                                <MapSimpleMarker
                                    lng={place.longitude}
                                    lat={place.latitude}
                                    zoom={12}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </ContainerSection>
                <CommentModule placeId={place.id}  comments={place.comments} mutate={mutate} />
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