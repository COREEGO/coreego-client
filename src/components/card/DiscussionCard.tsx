import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/material";
import UserSniped from "../react-ux/UserSniped";
import CategoryText from "../texts/CategoryText";
import CommentCountIcon from "../icons/CommentCounterIcon";
import ImageCountIcon from "../icons/ImageCountIcon";
import LikeCountIcon from "../icons/LikeCountIcon";
import { cleanHtmlText, dateParse } from "../../utils";


interface DiscussionCardProps {
    discussion: any,
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion }) => {


    return (
        <Card elevation={3}
        raised={true}
            sx={{
                transition: "elevation 0.3s ease",
                ":hover": {
                    boxShadow: "0 0 8px", // Change this value to the desired elevation on hover
                }
            }}>
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack alignItems="center" direction="row" spacing={1}>
                            <UserSniped avatar={discussion.user.avatarPath} />
                            <CategoryText category={discussion?.category} />
                        </Stack>
                        <Typography> {dateParse(discussion.created_at)} </Typography>
                    </Stack>
                    <Box>
                        <Typography color="var(--coreego-blue)" component="p" variant="h5" noWrap={true}>{discussion.title}</Typography>
                        <Typography  color="var(--grey-bold)" noWrap={true}> {cleanHtmlText(discussion.content)} </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <CommentCountIcon length={discussion.comments?.length} />
                        <LikeCountIcon length={discussion.likes?.length} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )

}

export default DiscussionCard