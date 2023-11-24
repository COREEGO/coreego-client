import { Box, Text, Stack, Flex, Image, Button, Spacer, HStack, Wrap } from "@chakra-ui/react";
import { Suspense, useEffect } from "react";
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
import ContainerSection from "../components/ContainerSection";
import ShareButton from "../../components/buttons/ShareButton";
import { belongsToAuth } from "../../utils";
import { useAuthContext } from "../../contexts/AuthProvider";
import { EDIT_ICON } from "../../utils/icon";



const Detail: React.FC<any> = () => {

    const params = useParams()
    const { user }: any = useAuthContext()
    const { data, mutate } = useSWR('/discussion/' + params.id, { suspense: true })

    useEffect(()=>{
        mutate()
    }, [])

    return (
        <>
            <Box py={VERTICAL_SPACING} bg="white">
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Stack alignItems={"flex-start"}>
                            {
                                belongsToAuth(data.user.id, user?.id) ?
                                    <NavLink to={`/forum/discussion/edit/${params.id}`}>
                                        <Button variant="outline" leftIcon={<EDIT_ICON />}>Modifier</Button>
                                    </NavLink>
                                    :
                                    <></>
                            }
                            <UserSniped
                                avatar={data.user.avatar}
                                pseudo={data.user.pseudo}
                                publishDate={data.createdAt}
                            />
                            <NavLink to={'/forum?category=' + data.category.id}>
                                <CategoryText category={data.category} />
                            </NavLink>
                            <TitleText text={data.title} />
                            <Text whiteSpace="pre-line"> {data.content} </Text>
                            {
                                data.images && <Wrap flexWrap="wrap" gap={2}>
                                    {data.images.map((image: any) => {
                                        return <Image borderRadius={"md"} key={image.id} height={250} w="auto" maxW="100%" src={BASE_URL + image.filePath} />
                                    })}
                                </Wrap>
                            }
                        </Stack>
                    </ContainerSection>
                    <Stack bg="white" position={"sticky"} bottom={0} py={3} zIndex={100}>
                        <ContainerSection withPadding={true}>
                            <HStack>
                                <LikeButton size="sm" discussionId={data.id} likes={data.likes} mutate={mutate} />
                                <ShareButton />
                            </HStack>
                        </ContainerSection>
                    </Stack>
                </Stack>
            </Box>
            <CommentModule mutate={mutate} discussionId={params.id} comments={data.comments} />

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