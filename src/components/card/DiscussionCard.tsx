import { Box, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Show, Stack, Text } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import NoOfComments from "./_NoOfComments";
import NoOfLikes from "./_NoOfLikes";
import Category from "./_Category";
import { NavLink } from "react-router-dom";
import PublishDateBadge from "../badges/PublishDateBadge";
import PublishDateText from "../texts/PublichDateText";
import LikeButton from "../buttons/LikeButton";
import Content from "./_Content";
import AvatarUx from "../react-ux/AvatarUx";
import { dateParse } from "../../utils";
import NoOfImage from "./_NoOfImage";


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
                        <Stack direction="row" alignItems="center">
                            <AvatarUx size="sm" user={discussion.user} />
                            <Stack spacing={0}>
                                <Text as="span" noOfLines={1}>{discussion.user.pseudo}</Text>
                                <Text as="small" color="gray">{dateParse(discussion.createdAt)}</Text>
                            </Stack>
                        </Stack>
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