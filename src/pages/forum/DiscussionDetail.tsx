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
import { Box, Button, Container, Stack, Typography } from "@mui/material";



const Detail: React.FC<any> = () => {

    const params = useParams()
    const { user }: any = useAuthContext()
    const { data, mutate } = useSWR('/discussion/' + params.id, { suspense: true })

    useEffect(()=>{
        mutate()
    }, [])

    return (
        <>
            <Box my={5}>
                <Stack>
                    <Container maxWidth="lg">
                        <Stack spacing={3}>
                            {
                                belongsToAuth(data.user.id, user?.id) ?
                                    <NavLink style={{width: 'fit-content'}} to={`/forum/discussion/edit/${params.id}`}>
                                        <Button  variant="outlined" startIcon={<EDIT_ICON />}>Modifier</Button>
                                    </NavLink>
                                    :
                                    <></>
                            }
                            <UserSniped
                                avatar={data.user.avatar}
                                pseudo={data.user.pseudo}
                                publishDate={data.created_at}
                            />
                            <NavLink to={'/forum?category=' + data.category.id}>
                                <CategoryText category={data.category} />
                            </NavLink>
                            <Typography sx={{wordBreak: 'break-all'}} component={"h1"} fontSize={24} fontWeight={"bold"}>{data.title}</Typography>
                            <Typography paragraph={true}> {data.content} </Typography>
                            {
                                data.images && <Stack flexWrap="wrap" spacing={2}>
                                    {data.images.map((image: any) => {
                                        return <img
                                        key={image.id}
                                            src={BASE_URL + image.path}
                                            height={250}
                                            width="auto"
                                            style={{borderRadius: 10, maxWidth: "100%" }}
                                        />
                                    })}
                                </Stack>
                            }
                        </Stack>
                    </Container>
                    <Box sx={{position: 'sticky'}}  bottom={0} py={3} zIndex={100}>
                        <Container maxWidth="lg">
                            <Stack direction="row" spacing={1}>
                                <LikeButton size="sm" discussionId={data.id} likes={data.likes} mutate={mutate} />
                                <ShareButton />
                            </Stack>
                        </Container>
                    </Box>
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