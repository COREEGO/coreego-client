import { Box, Card, CardBody, CardFooter, CardHeader, Stack, Text } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import NoOfComments from "./_NoOfComments";
import NoOfLikes from "./_NoOfLikes";
import Category from "./_Category";
import { NavLink } from "react-router-dom";
import DateBadge from "../badges/DateBadge";


interface DiscussionCardProps {
    discussion: any
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion }) => {

    return (
        <NavLink to={'/discussions/detail/' + discussion.id}>
            <Card borderRadius={0} >
                <CardBody>
                    <Stack>
                        <UserInfo user={discussion.user} size="xs" />
                        <Category category={discussion.category} />
                        <Text noOfLines={1} as="b" color="var(--coreego-blue)">{discussion.title} </Text>
                        <Text noOfLines={2}>{discussion.content} </Text>
                        <Stack direction="row">
                            <NoOfComments nb={discussion.comments.length} />
                            <NoOfLikes nb={discussion.likes.length} />
                        </Stack>
                        <Box alignSelf="end">
                            <DateBadge date={discussion.createdAt} />
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </NavLink>
    )

}

export default DiscussionCard