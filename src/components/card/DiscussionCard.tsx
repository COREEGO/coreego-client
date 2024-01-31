import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/material";
import UserSniped from "../react-ux/UserSniped";
import CategoryText from "../texts/CategoryText";
import CommentCountIcon from "../icons/CommentCounterIcon";
import ImageCountIcon from "../icons/ImageCountIcon";
import LikeCountIcon from "../icons/LikeCountIcon";


interface DiscussionCardProps {
    discussion: any,
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion }) => {


    return (
        <Card variant="outlined" elevation={0} sx={{ minWidth: '100%' }}>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                        <Avatar sx={{ width: 30, height: 30 }} variant="rounded" src={discussion.user.avatarPath} />
                        <CategoryText category={discussion?.category} />
                    </Stack>
                    <Box>
                        <Typography component="p" variant="h5" fontWeight={"bold"} noWrap={true}>{discussion.title}</Typography>
                        <Typography color="var(--grey-bold)" noWrap={true}> {discussion.content}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <CommentCountIcon length={discussion.comments?.length} />
                        <LikeCountIcon length={discussion.likes?.length} />
                    </Stack>
                </Stack>
                {/* <Stack spacing={1}>
                    <UserSniped
                        avatar={discussion.user.avatarPath}
                        pseudo={discussion.user.pseudo}
                        publishDate={discussion.created_at}
                    />
                    <CategoryText category={discussion?.category} />
                    <Stack>
                        <Typography fontWeight={"bold"} noWrap={true}>{discussion.title}</Typography>
                        <Typography noWrap={true}> {discussion.content}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <CommentCountIcon length={discussion.comments?.length} />
                        <LikeCountIcon length={discussion.likes?.length} />
                        <ImageCountIcon length={discussion.images?.length} />
                    </Stack>
                </Stack> */}
            </CardContent>
        </Card>
    )

}

export default DiscussionCard