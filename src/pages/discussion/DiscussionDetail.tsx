import { Box, Button, Container, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import { useParams } from "react-router";
import { Image } from "@chakra-ui/react";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables";
import FeedInfo from "../components/FeedInfo";
import ImagesLinear from "../../components/swipers/ImagesLinear";
import Category from "../../components/card/_Category";
import Title from "../../components/texts/Title";
import SlideSwiper from "../../components/swipers/SlideSwiper";
import UserInfo from "../../components/card/_UserInfo";
import PublishDateText from "../../components/texts/PublichDateText";



const Detail: React.FC<any> = () => {

    const params = useParams()
    const { data, error, mutate, isLoading } = useSWR('/discussions/' + params.id, { suspense: true })

    return (
        <Stack my={VERTICAL_SPACING}>
            <Container maxW={CONTAINER_SIZE} mb={VERTICAL_SPACING}>
                <Grid templateColumns='repeat(10, 1fr)' gap={{ base: 3, md: 20 }}>
                    <GridItem colSpan={{ base: 10, sm: 10, md: 6 }}>
                        <Stack>
                            <Stack justifyContent="space-between" direction="row" alignItems="center">
                                <UserInfo user={data.user} size={{ base: 'sm', md: 'md' }} />
                                <PublishDateText size={{ base: 'sm', md: 'md' }} date={data.createdAt} />
                            </Stack>
                            <Category size={{ base: 'xl', md: '2xl' }} category={data.category} />
                            <Title> {data.title} </Title>
                            {
                                data.images.length && <Box h={{ base: 200, sm: 350, md: 450 }} maxW="100%">
                                    <SlideSwiper images={data.images} />
                                </Box>
                            }
                            <Text whiteSpace="pre-line">{data.content}</Text>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={{ base: 10, md: 4 }}>
                        <Stack>
                            <LikeButton discussionId={data.id} likes={data.likes} mutate={() => mutate()} />
                        </Stack>
                    </GridItem>
                </Grid>
            </Container>
            <CommentModule mutate={() => mutate()} discussionId={params.id} comments={data.comments} />
        </Stack>
    )
}

const DiscussionDetail = () => {

    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <Detail />
        </Suspense>
    )

}

export default DiscussionDetail