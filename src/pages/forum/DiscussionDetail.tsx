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
import { Box, Button, Container, ImageList, ImageListItem, Stack, Typography } from "@mui/material";



const Detail: React.FC<any> = () => {

    const params = useParams()
    const { user }: any = useAuthContext()
    const { data, mutate, error } = useSWR('/discussion/' + params.id, { suspense: true })

    return (
        <>
            <Box my={5}>
                <Stack>
                    <Container maxWidth="lg">
                        <Stack spacing={3}>
                            {
                                belongsToAuth(data.user.id, user?.id) ?
                                    <NavLink style={{ width: 'fit-content' }} to={`/forum/discussion/edit/${params.id}`}>
                                        <Button variant="outlined" startIcon={<EDIT_ICON />}>Modifier</Button>
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
                            <Typography sx={{ wordBreak: 'break-all' }} component={"h1"} fontSize={24} fontWeight={"bold"}>{data.title}</Typography>
                            <Typography sx={{whiteSpace: 'pre-line'}}> {data.content} </Typography>
                            {
                                data.images ? <ImageList variant="quilted" gap={3} sx={{ width: '100%', height: 'auto' }}>
                                    {data.images.map((image: any) => (
                                        <ImageListItem key={image.id} rows={6}>
                                            <img
                                                width="100%"
                                                src={BASE_URL + "/storage/images/" + image.path}
                                                alt={image.path}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList> : <></>
                            }
                        </Stack>
                    </Container>
                    <Box sx={{ position: 'sticky', backgroundColor: 'white' }} bottom={0} py={2} zIndex={100}>
                        <Container maxWidth="lg">
                            <Stack direction="row" spacing={1}>
                                <LikeButton discussionId={data.id} likes={data.likes} mutate={mutate} />
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