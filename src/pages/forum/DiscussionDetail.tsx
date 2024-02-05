import React, { Suspense } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import { IMAGE_PATH } from "../../utils/variables";
import { NavLink } from "react-router-dom";
import UserSniped from "../../components/react-ux/UserSniped";
import CategoryText from "../../components/texts/CategoryText";
import ShareButton from "../../components/buttons/ShareButton";
import { belongsToAuth } from "../../utils";
import { useAuthContext } from "../../contexts/AuthProvider";
import { EDIT_ICON } from "../../utils/icon";
import { Box, Button, Container, ImageList, ImageListItem, Stack, Typography } from "@mui/material";
import { apiFetch } from "../../http-common/apiFetch";
import moment from "moment";



const DiscussionDetail: React.FC<any> = () => {

    const params = useParams()
    const { user }: any = useAuthContext()

    const [isBusy, setIsBusy] = React.useState(true)
    const [discussion, setDiscussion] = React.useState<any>({})

    React.useEffect(() => {
        fetchDiscussion()
    }, [])

    const fetchDiscussion = async () => {
        try {
            const response: any = await apiFetch(`/discussions/${params.slug}`, 'GET')

            setDiscussion(response)

        } catch (error: any) {
            console.log(error.message)
        } finally {
            setIsBusy(false)
        }
    }

    return isBusy ? <LoadingPage type="page" /> : (
        <>
            <Box my={5}>
                <Container>
                    <Stack spacing={3} justifyContent="center" alignItems="center">
                        <Stack direction="row" spacing={1}>
                            <CategoryText category={discussion.category} />
                            <Typography sx={{
                                color: 'var(--grey-bold)',
                                '&:before': {
                                    content: '"| "',  // Correction ici
                                },
                            }}>
                                {moment(discussion.created_at).format('D MMMM YYYY')}
                            </Typography>
                        </Stack>
                        <Typography textAlign="center" sx={{wordBreak: 'break-all'}} variant="h3" fontWeight="bold" component="h1" > {discussion.title} </Typography>
                        <Stack direction="row" spacing={1}>
                            <LikeButton discussionId={discussion.id} likes={discussion.likes} mutate={fetchDiscussion} />
                            <ShareButton />
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box bgcolor="white" py={5}>
                <Container>
                    <Stack spacing={5}>
                        <UserSniped
                            avatar={discussion.user.avatar}
                            pseudo={discussion.user.pseudo}
                        />
                        <Box className="reactquill_content" dangerouslySetInnerHTML={{ __html: discussion.content }}  color="var(--grey-bold)"/>
                    </Stack>
                </Container>
            </Box>

            {/* <Stack>
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
                                avatar={data.user.avatarPath}
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
                                                src={IMAGE_PATH + image.name}
                                                alt={image.name}
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
                </Stack> */}

            {/* <CommentModule mutate={mutate} discussionId={params.id} comments={data.comments} /> */}
        </>
    )
}

export default DiscussionDetail