import { Box, Card, CardBody, Stack, Text } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import City from "./_City";
import Category from "./_Category";
import NoOfLikes from "./_NoOfLikes";
import NoOfComments from "./_NoOfComments";
import SlideSwiper from "../swipers/SlideSwiper";
import PublishDateBadge from "../badges/PublishDateBadge";
import PublishDateText from "../texts/PublichDateText";

interface PlaceCardInterface {
    place: any
}

const PlaceCard: React.FC<PlaceCardInterface> = ({ place }) => {

    return (
        <Card borderRadius={0} >
            <Box h={{ base: 200, md: 250 }} w="100%">
                <SlideSwiper images={place.images} />
            </Box>
            <CardBody>
                <Stack position="relative" w="100%">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <UserInfo user={place.user} size="xs" />
                        <PublishDateText size="xs" date={place.createdAt} />
                    </Stack>
                    <City city={place.city} />
                    <Category category={place.category} />
                    <Text noOfLines={1} as="b">{place.title} </Text>
                    <Text noOfLines={2}>{place.description} </Text>
                    <Stack direction="row">
                        <NoOfLikes nb={place.likes.length} />
                        <NoOfComments nb={place.comments.length} />
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    )

}

export default PlaceCard