import { Box, Text, Stack, Flex, Image, Button, Spacer } from "@chakra-ui/react";
import { Suspense } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import { BASE_URL, VERTICAL_SPACING } from "../../utils/variables";
import ContainerPage from "../components/ContainerSection";
import TitleText from "../../components/texts/TitleText";
import { NavLink } from "react-router-dom";
import UserSniped from "../../components/react-ux/UserSniped";
import CategoryText from "../../components/texts/CategoryText";



const Detail: React.FC<any> = () => {

    const params = useParams()

    const { data, mutate } = useSWR('/discussions/' + params.id, { suspense: true })

    return (
        <>
            <Box py={VERTICAL_SPACING} bg="white">
                <ContainerPage withPadding={true}>
                    <Stack>
                        <Stack>
                            <UserSniped
                                avatar={data.user.avatar}
                                pseudo={data.user.pseudo}
                                publishDate={data.createdAt}
                            />
                            <NavLink to={'/forum?category=' + data.category.id}>
                                <CategoryText category={data.category} />
                            </NavLink>
                            <TitleText text={data.title} />
                        </Stack>
                        <Flex alignItems="center" gap={2}>
                            <Spacer />
                            <LikeButton size="sm" discussionId={data.id} likes={data.likes} mutate={() => mutate()} />
                            <Button size="sm" className="btn_blue">Partager</Button>
                        </Flex>
                    </Stack>
                </ContainerPage>
            </Box>
            <Box py={VERTICAL_SPACING}>
                <ContainerPage withPadding={true}>
                    <Stack spacing={VERTICAL_SPACING}>
                        <Text whiteSpace="pre-line"> {data.content} </Text>
                        {
                            data.images && <Flex flexWrap="wrap" gap={2}>
                                {data.images.map((image: any) => {
                                    return <Image key={image.id} height={250} w="auto" maxW="100%" src={BASE_URL + image.filePath} />
                                })}
                            </Flex>
                        }
                    </Stack>
                </ContainerPage>
            </Box>
            <CommentModule mutate={() => mutate()} discussionId={params.id} comments={data.comments} />

        </>
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