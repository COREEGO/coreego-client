import { Box, Card, CardBody, CardFooter, CardHeader, Stack, Text } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import NoOfComments from "./_NoOfComments";
import NoOfLikes from "./_NoOfLikes";
import Category from "./_Category";
import { NavLink } from "react-router-dom";
import PublishDateBadge from "../badges/PublishDateBadge";
import PublishDateText from "../texts/PublichDateText";
import LikeButton from "../buttons/LikeButton";
import Content from "./_Content";


interface DiscussionCardProps {
    discussion: any,
    mode: 'feed' | 'detail',
    children?: React.ReactNode
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, mode, children }) => {

    return (
        <Card borderRadius={0} >
            <CardBody>
                <Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <UserInfo user={discussion.user} size="sm" />
                        <PublishDateText size="xs" date={discussion.createdAt} />
                    </Stack>
                    <Category size="md" category={discussion.category} />
                    <Content text={discussion.title} type="title" mode={mode}  />
                    <Content text={discussion.content} type="content" mode={mode}  />
                    {
                        mode === 'feed' ? <Stack direction="row">
                            <NoOfComments nb={discussion.comments.length} />
                            <NoOfLikes nb={discussion.likes.length} />
                        </Stack> : <>
                            {children}
                        </>
                    }
                </Stack>
            </CardBody>
        </Card>
    )

}

export default DiscussionCard