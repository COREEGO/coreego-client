import { Suspense } from "react"
import { useParams } from "react-router"
import useSWR from "swr"
import LoadingPage from "../../components/LoadingPage"
import { Box, Button, Card, CardBody, Container, Divider, Grid, GridItem, Stack, Text } from "@chakra-ui/react"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import UserInfo from "../../components/card/_UserInfo"
import Title from "../../components/texts/Title"
import ThumbSwiper from "../../components/swipers/ThumbSwiper"
import DefaultSwiper from "../../components/swipers/SlideSwiper"
import MapMarker from "../../components/maps/MapMarker"
import CommentModule from "../components/modules/CommentModule"
import LikeButton from "../../components/buttons/LikeButton"
import PublishDateText from "../../components/texts/PublichDateText"
import Category from "../../components/card/_Category"
import City from "../../components/card/_City"
import SlideSwiper from "../../components/swipers/SlideSwiper"
import AddTravelBookButton from "../../components/buttons/AddTravelBookButton"
import ContainerSection from "../components/ContainerSection"
import PlaceCard from "../../components/card/PlaceCard"




const Detail = () => {

    const params = useParams()

    const { data, error, mutate, isLoading } = useSWR('/places/' + params.id, { suspense: true })

    return (
        <Box my={VERTICAL_SPACING}>
            <ContainerSection>
                <Stack spacing={VERTICAL_SPACING}>
                    {
                        data.images.length && <Card borderRadius={0}>
                            <SlideSwiper images={data.images} />
                        </Card>
                    }
                    <PlaceCard mode="detail" place={data}>
                        <Divider />
                        <Stack direction="row" alignItems="center">
                            <LikeButton placeId={data.id} likes={data.likes} mutate={() => mutate()} />
                            <AddTravelBookButton />
                        </Stack>
                    </PlaceCard>
                    <Card>
                        <CardBody>
                            <Text fontSize="lg"> <span style={{fontWeight: 'bold'}}>Adresse :</span> {data.address} </Text>
                        </CardBody>
                        <MapMarker data={data} />
                            <Button colorScheme="blue">Voir plus</Button>
                    </Card>
                </Stack>
            </ContainerSection>
            <Box my={VERTICAL_SPACING}>
                <CommentModule mutate={() => mutate()} placeId={params.id} comments={data.comments} />
            </Box>
        </Box>
    )

}

const PlaceDetail = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <Detail />
    </Suspense>

}

export default PlaceDetail