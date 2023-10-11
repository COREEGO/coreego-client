import { Container, Stack } from "@chakra-ui/react";
import { Suspense } from "react";
import { useParams } from "react-router";
import {Image} from "@chakra-ui/react";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables";
import FeedInfo from "../components/FeedInfo";
import ImagesLinear from "../../components/swipers/ImagesLinear";



const Detail: React.FC<any> = () => {

    const params = useParams()
    const { data, error, mutate, isLoading } = useSWR('/discussions/' + params.id, { suspense: true })


    return (
        <Stack>
            <Container maxW={CONTAINER_SIZE}>
                <Stack py={VERTICAL_SPACING}>
                    <FeedInfo data={data} />
                    <ImagesLinear images={data.images} />
                    <LikeButton discussionId={data.id} likes={data.likes} mutate={() => mutate()} />
                </Stack>
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