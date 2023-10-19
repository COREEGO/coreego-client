import { Box, Button, Card, CardBody, Container, Divider, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
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
import NoOfComments from "../../components/card/_NoOfComments";
import NoOfLikes from "../../components/card/_NoOfLikes";
import DiscussionCard from "../../components/card/DiscussionCard";
import ThumbSwiper from "../../components/swipers/ThumbSwiper";
import ContainerPage from "../components/ContainerSection";



const Detail: React.FC<any> = () => {

    const params = useParams()

    const { data, error, mutate, isLoading } = useSWR('/discussions/' + params.id, { suspense: true })

    return (
        <Box mt={VERTICAL_SPACING}>
            <ContainerPage>
                <Stack spacing={VERTICAL_SPACING}>
                    <DiscussionCard discussion={data} mode="detail">
                        <Divider />
                        <LikeButton discussionId={data.id} likes={data.likes} mutate={() => mutate()} />
                    </DiscussionCard>
                    {
                        data.images.length && <Card borderRadius={0}>
                            <ThumbSwiper images={data.images} />
                        </Card>
                    }
                </Stack>
            </ContainerPage>
            <Box my={VERTICAL_SPACING}>
                <CommentModule mutate={() => mutate()} discussionId={params.id} comments={data.comments} />
            </Box>
        </Box>
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