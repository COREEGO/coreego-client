import { Avatar, Box, Card, Divider, Text, Stack, Flex, Image, Button, Spacer } from "@chakra-ui/react";
import { Suspense } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import { BASE_URL, VERTICAL_SPACING } from "../../utils/variables";
import ThumbSwiper from "../../components/swipers/ThumbSwiper";
import ContainerPage from "../components/ContainerSection";
import DiscussionCard from "../../components/card/DiscussionCard";
import Title from "../../components/texts/Title";
import AvatarUx from "../../components/react-ux/AvatarUx";
import { NavLink } from "react-router-dom";
import { dateParse } from "../../utils";
import Category from "../../components/card/_Category";



const Detail: React.FC<any> = () => {

    const params = useParams()

    const { data, error, mutate, isLoading } = useSWR('/discussions/' + params.id, { suspense: true })

    return (
        <>
            <Box py={VERTICAL_SPACING} bg="white">
                <ContainerPage withPadding={true}>
                    <Stack>
                        <Stack direction="row" alignItems="center">

                            <AvatarUx size="sm" user={data.user} />
                            <Stack spacing={0}>
                                <NavLink to="/">
                                    <Text as="span" noOfLines={1}>{data.user.pseudo}</Text>
                                </NavLink>
                                <Text as="small" color="gray">{dateParse(data.createdAt)}</Text>
                            </Stack>
                        </Stack>
                        <Stack>
                            <NavLink to={'/discussions?category=' + data.category.id}>
                                <Category category={data.category} />
                            </NavLink>
                            <Title text={data.title} />
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
                                    return <Image height={250} w="auto" maxW="100%" src={BASE_URL + image.filePath} />
                                })}
                            </Flex>
                        }
                    </Stack>
                </ContainerPage>
            </Box>
            <Box py={VERTICAL_SPACING} bg="white">
                <CommentModule mutate={() => mutate()} discussionId={params.id} comments={data.comments} />
            </Box>
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