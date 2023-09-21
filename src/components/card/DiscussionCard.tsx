import { Card, CardBody, CardFooter, CardHeader, Stack, Text } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import NoOfComments from "./_NoOfComments";
import NoOfLikes from "./_NoOfLikes";
import Category from "./_Category";


interface DiscussionCardProps {
    discussion: any
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion }) => {

    return (
        <Card borderRadius={0}>
            <CardHeader>
                <Stack>
                    <UserInfo user={discussion.user} date={discussion.createdAt} />
                </Stack>
            </CardHeader>
            <CardBody py={0}>
                <Stack>
                    <Category category={discussion.category} />
                    <Text as="b" color="var(--coreego-blue)">{discussion.title} </Text>
                    <Text noOfLines={2}>{discussion.content} </Text>
                </Stack>
            </CardBody>
            <CardFooter>
                <Stack direction="row">
                    <NoOfComments nb={discussion.comments.length} />
                    <NoOfLikes nb={discussion.likes.length} />
                </Stack>
            </CardFooter>
        </Card>
    )

}

export default DiscussionCard