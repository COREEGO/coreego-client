import { Card, CardBody, Stack, Text } from "@chakra-ui/react";
import UserSniped from "../react-ux/UserSniped";
import ImageCountIcon from "../icons/ImageCountIcon";
import LikeCountIcon from "../icons/LikeCountIcon";
import CommentCountIcon from "../icons/CommentCounterIcon";
import CategoryText from "../texts/CategoryText";


interface DiscussionCardProps {
    discussion: any,
    size: 'xl' | 'sm'
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, size }) => {


    const XlCard = () => {
        return (
            <Card>
                <CardBody>
                    <Stack direction="row" alignItems="flex-start">
                        <Stack>
                            <UserSniped
                                avatar={discussion.user.avatar}
                                pseudo={discussion.user.pseudo}
                                publishDate={discussion.createdAt}
                            />
                            <Stack spacing={0}>
                                <CategoryText category={discussion.category} />
                                <Text as="b" noOfLines={2}> {discussion.title} </Text>
                                <Text as="span" noOfLines={1}> {discussion.content} </Text>
                            </Stack>
                            <Stack direction="row">
                                <CommentCountIcon length={discussion.comments.length} />
                                <LikeCountIcon length={discussion.likes.length} />
                                <ImageCountIcon length={discussion.images.length} />
                            </Stack>
                        </Stack>
                    </Stack>
                </CardBody>
            </Card>
        )
    }

    const SmCard = () => {
        return (
            <Card>
                <CardBody>
                    <CategoryText category={discussion.category} />
                    <Text as="b" noOfLines={1}> {discussion.title} </Text>
                    <Text as="span" fontSize="sm" noOfLines={1}> {discussion.content} </Text>
                </CardBody>
            </Card>
        )
    }

    return size == 'xl' ?  <XlCard /> : <SmCard />

}

export default DiscussionCard