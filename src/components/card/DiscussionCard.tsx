import { Card, CardBody, Stack, Text } from "@chakra-ui/react";
import NoOfComments from "./_NoOfComments";
import NoOfLikes from "./_NoOfLikes";
import Category from "./_Category";
import NoOfImage from "./_NoOfImage";
import UserSniped from "../react-ux/UserSniped";


interface DiscussionCardProps {
    discussion: any,
    mode: 'feed' | 'detail',
    children?: React.ReactNode
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, mode, children }) => {

    return (
        <Card borderRadius={0} >
            <CardBody>
                <Stack direction="row" alignItems="flex-start">
                    <Stack>
                        <UserSniped
                            avatar={discussion.user.avatar}
                            pseudo={discussion.user.pseudo}
                            publishDate={discussion.createdAt}
                        />
                        <Stack spacing={0}>
                            <Category category={discussion.category} />
                            <Text as="b" noOfLines={2}> {discussion.title} </Text>
                            <Text as="span" noOfLines={1}> {discussion.content} </Text>
                        </Stack>
                        <Stack direction="row">
                            <NoOfComments nb={discussion.comments.length} />
                            <NoOfLikes nb={discussion.likes.length} />
                            <NoOfImage nb={discussion.images.length} />
                        </Stack>
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    )

}

export default DiscussionCard