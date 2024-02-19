import React, { Suspense } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import { AVATAR_PATH, IMAGE_PATH } from "../../utils/variables";
import { NavLink } from "react-router-dom";
import UserSniped from "../../components/react-ux/UserSniped";
import CategoryText from "../../components/texts/CategoryText";
import ShareButton from "../../components/buttons/ShareButton";
import { belongsToAuth } from "../../utils";
import { useAuthContext } from "../../contexts/AuthProvider";
import { EDIT_ICON } from "../../utils/icon";
import { Box, Button, Chip, Container, Divider, Avatar, ImageListItem, Stack, Typography } from "@mui/material";
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

            <Box mt={5}>
                <Container>
                    <Stack gap={5} justifyContent="center" alignItems="center">
                        {
                            belongsToAuth(discussion.user.id, user?.id) ?
                                <NavLink style={{ width: 'fit-content' }} to={`/forum/discussion/edit/${params.id}`}>
                                    <Button variant="outlined" startIcon={<EDIT_ICON />}>Modifier</Button>
                                </NavLink>
                                :
                                <></>
                        }
                        <Stack alignItems="center" direction="row" spacing={1}>
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
                        <Typography color="var(--coreego-blue)" textAlign="center" sx={{ wordBreak: 'break-all' }} variant="h4" component="h1" > {discussion.title} </Typography>
                    </Stack>
                </Container>
            </Box>

            <Divider sx={{ width: '100%', mt: 5, '&:after, &:before': { backgroundColor: 'black' } }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 40, height: 40 }} src={AVATAR_PATH + discussion.user.avatarPath} />
                    <Typography fontWeight="bold">{discussion.user.pseudo}</Typography>
                </Stack>
            </Divider>

            <Box mt={5}>
                <Container>
                    <Box className="reactquill_content" dangerouslySetInnerHTML={{ __html: discussion.content }} color="var(--grey-bold)" />
                </Container>
            </Box>

            <Box mt={5}>
                <Container>
                    <Stack gap={2}>
                        <Stack direction="row" spacing={1}>
                            <LikeButton discussionId={discussion.id} likes={discussion.likes} mutate={fetchDiscussion} />
                            <ShareButton />
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box my={5}>
                <CommentModule mutate={fetchDiscussion} discussionId={discussion.id} comments={discussion.comments} />
            </Box>
        </>
    )
}

export default DiscussionDetail