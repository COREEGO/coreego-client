import { Box, Card, CardBody, CardFooter, CardHeader, Stack, Text } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import NoOfComments from "./_NoOfComments";
import NoOfLikes from "./_NoOfLikes";
import Category from "./_Category";
import { NavLink } from "react-router-dom";
import PublishDateBadge from "../badges/PublishDateBadge";
import PublishDateText from "../texts/PublichDateText";


interface DiscussionCardProps {
    discussion: any
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion }) => {

    return (
        <Card borderRadius={0} >
            <CardBody>
                <Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <UserInfo user={discussion.user} size="xs" />
                        <PublishDateText size="xs" date={discussion.createdAt} />
                    </Stack>
                    <Category size="md" category={discussion.category} />
                    <Text noOfLines={1} as="b">{discussion.title} </Text>
                    <Text noOfLines={2}>{discussion.content}</Text>
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