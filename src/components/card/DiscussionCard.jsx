import { Avatar, Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import CategoryText from "../texts/CategoryText";
import CommentCountIcon from "../icons/CommentCounterIcon";
import LikeCountIcon from "../icons/LikeCountIcon";
import { cleanHtmlText } from "../../utils";
import moment from "moment";
import { AVATAR_PATH } from "../../utils/variables";


const DiscussionCard = ({ discussion }) => {


    return (
        <Card elevation={3}>
            <CardActionArea component="div">
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar src={AVATAR_PATH + discussion.user.avatar} sx={{width: 30, height: 30}} />
                            <Typography variant="body2" fontWeight="bold"> {discussion.user.pseudo} </Typography>
                        </Stack>
                        <Typography variant="body2"> {moment(discussion.created_at).format('D MMMM YYYY')} </Typography>
                    </Stack>
                        <CategoryText size="small" category={discussion?.category} />
                    <Box>
                        <Typography color="var(--coreego-blue)" component="p" variant="h6" noWrap={true}>{discussion.title}</Typography>
                        <Typography color="var(--grey-bold)" noWrap={true}> {cleanHtmlText(discussion.content)} </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <CommentCountIcon length={discussion.comments?.length} />
                        <LikeCountIcon length={discussion.likes?.length} />
                    </Stack>
                </Stack>
            </CardContent>
            </CardActionArea>
        </Card>
    )

}

export default DiscussionCard