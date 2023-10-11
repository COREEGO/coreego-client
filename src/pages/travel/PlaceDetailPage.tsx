import { Suspense } from "react"
import { useParams } from "react-router"
import useSWR from "swr"
import LoadingPage from "../../components/LoadingPage"
import { Box, Button, Container, Stack, Text } from "@chakra-ui/react"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import UserInfo from "../../components/card/_UserInfo"
import Title from "../../components/texts/Title"
import ThumbSwiper from "../../components/swipers/ThumbSwiper"
import DefaultSwiper from "../../components/swipers/DefaultSwiper"
import MapMarker from "../../components/maps/MapMarker"
import FeedInfo from "../components/FeedInfo"
import CommentModule from "../components/modules/CommentModule"
import LikeButton from "../../components/buttons/LikeButton"




const Detail = () => {

    const params = useParams()

    const { data, error, mutate, isLoading } = useSWR('/places/' + params.id, { suspense: true })

    return (
        <Stack>
            <Container maxW={CONTAINER_SIZE}>
                <Stack py={VERTICAL_SPACING}>
                    <FeedInfo data={data} />
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={1}>
                        <Box h={{ base: 250, sm: 350, md: 400 }} w="100%">
                            <DefaultSwiper images={data.images} />
                        </Box>
                        <Box h={{ base: 250, sm: 350, md: 400 }} w="100%">
                            <MapMarker data={data} />
                        </Box>
                    </Stack>
                    <Stack direction="row" mt={5}>
                        <LikeButton placeId={data.id} likes={data.likes} mutate={() => mutate()} />
                        {/* Le mettre dans un composant */}
                        <Button colorScheme="green">Je souhaite visiter</Button>
                    </Stack>
                </Stack>
            </Container>
            <CommentModule mutate={() => mutate()} placeId={params.id} comments={data.comments} />
        </Stack>
    )

}

const PlaceDetail = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <Detail />
    </Suspense>

}

export default PlaceDetail