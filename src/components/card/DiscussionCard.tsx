import { Card, CardContent, Stack, Typography } from "@mui/material";
import UserSniped from "../react-ux/UserSniped";
import CategoryText from "../texts/CategoryText";
import CommentCountIcon from "../icons/CommentCounterIcon";
import ImageCountIcon from "../icons/ImageCountIcon";
import LikeCountIcon from "../icons/LikeCountIcon";


interface DiscussionCardProps {
    discussion: any,
    size?: 'xl' | 'sm'
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, size = 'xl' }) => {

    const XlCard = () => {
        return (
            <Card sx={{ minWidth: '100%' }}>
                <CardContent>
                    <Stack spacing={1}>
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
                    </Stack>
                </CardContent>
            </Card>
        )
    }

    const SmCard = () => {
        return (
            <Card>
                {/* <CardBody>
                    <CategoryText category={discussion.category} />
                    <Text as="b" noOfLines={1}> {discussion.title} </Text>
                    <Text as="span" fontSize="sm" noOfLines={1}> {discussion.content} </Text>
                </CardBody> */}
            </Card>
        )
    }

    return size == 'xl' ? <XlCard /> : <SmCard />

}

export default DiscussionCard