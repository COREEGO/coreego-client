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
import FeedInfo from "../components/FeedInfo"
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
        <>
            <Box my={VERTICAL_SPACING}>
                <ContainerSection>
                    <Stack spacing={VERTICAL_SPACING}>
                        {
                            data.images.length && <Card borderRadius={0}>
                                <SlideSwiper images={data.images} />
                            </Card>
                        }
                        <Card>
                            <CardBody>
                                <Stack direction="row" alignItems="center" flexWrap="wrap">
                                    <Text fontSize="lg"> {data.address} </Text>
                                    <Button colorScheme="blue">Voir map</Button>
                                </Stack>
                            </CardBody>
                            <Box h={{ base: 200, sm: 200, md: 300 }}>
                                <MapMarker data={data} />
                            </Box>
                        </Card>
                        <PlaceCard mode="detail" place={data}>
                            <Divider />
                            <Stack direction="row" alignItems="center">
                                <LikeButton placeId={data.id} likes={data.likes} mutate={() => mutate()} />
                                <AddTravelBookButton />
                            </Stack>
                        </PlaceCard>
                    </Stack>
                </ContainerSection>
            </Box>
        </>
        // <Stack mt={VERTICAL_SPACING}>
        //     <Container maxW={CONTAINER_SIZE} mb={VERTICAL_SPACING}>
        //         <Grid templateColumns='repeat(10, 1fr)' gap={{ base: 3, md: 20 }}>
        //             <GridItem colSpan={{ base: 10, sm: 10, md: 6 }} >
        //                 <Stack>
        //                     <Stack justifyContent="space-between" direction="row" alignItems="center">
        //                         <UserInfo user={data.user} size={{ base: 'sm', md: 'md' }} />
        //                         <PublishDateText size={{ base: 'sm', md: 'md' }} date={data.createdAt} />
        //                     </Stack>
        //                     <Category size={{ base: 'xl', md: '2xl' }} category={data.category} />
        //                     <Title>{data.title}</Title>
        //                     {
        //                         data.images.length && <Box h={{ base: 200, sm: 350, md: 400 }} maxW="100%">
        //                             <SlideSwiper images={data.images} />
        //                         </Box>
        //                     }
        //                     <Text whiteSpace="pre-line">{data.description}</Text>
        //                 </Stack>
        //             </GridItem>
        //             <GridItem colSpan={{ base: 10, md: 4 }}>
        //                 <Stack>
        //                     <Stack direction="row" flexWrap="wrap" order={{ base: 2, md: 1 }}>
        //                         <LikeButton placeId={data.id} likes={data.likes} mutate={() => mutate()} />
        //                         <AddTravelBookButton />
        //                     </Stack>
        //                     <Stack order={{ base: 1, md: 2 }}>
        //                         <City city={data.city} size={{ base: 'xl', md: '2xl' }} />
        //                         <Text fontSize={{ base: 'xl', md: '2xl' }} color="var(--coreego-blue)">{data.address}</Text>
        //                         <Box h={{ base: 200, sm: 250, md: 300 }} zIndex={10} maxW="100%">
        //                             <MapMarker data={data} />
        //                         </Box>
        //                     </Stack>
        //                 </Stack>
        //             </GridItem>
        //         </Grid>
        //     </Container>
        //     <CommentModule mutate={() => mutate()} placeId={params.id} comments={data.comments} />
        // </Stack>
    )

}

const PlaceDetail = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <Detail />
    </Suspense>

}

export default PlaceDetail