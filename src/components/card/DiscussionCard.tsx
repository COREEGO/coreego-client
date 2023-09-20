import { Card, CardBody, Stack, Text } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import NoOfComments from "./_NoOfComments";
import NoOfLikes from "./_NoOfLikes";
import Category from "./_Category";


interface DiscussionCardProps {
    discussion: any
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion }) => {

    return (
        <Card>
            <CardBody>
                <Stack spacing={2}>
                    <Category category={discussion.category} />
                    <UserInfo user={discussion.user} date={discussion.createdAt} />
                    <Text as="b" color="var(--coreego-blue)">{discussion.title} </Text>
                    <Text noOfLines={2}>{discussion.content} </Text>
                    <Stack direction="row">
                        <NoOfComments nb={discussion.comments.length} />
                        <NoOfLikes nb={discussion.likes.length} />
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    )

}

export default DiscussionCard