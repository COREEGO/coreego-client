import { Box, Card, CardBody, Stack, Text } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import City from "./_City";
import Category from "./_Category";
import NoOfLikes from "./_NoOfLikes";
import NoOfComments from "./_NoOfComments";
import SlideSwiper from "../swipers/SlideSwiper";
import PublishDateBadge from "../badges/PublishDateBadge";
import PublishDateText from "../texts/PublichDateText";
import Galery from "./_Galery";

interface PlaceCardInterface {
    place: any,
    mode: 'feed' | 'detail',
    children?: React.ReactNode
}

const PlaceCard: React.FC<PlaceCardInterface> = ({ place, mode, children }) => {

    return (
        <Card >
            {
                mode === 'feed' && <Box h={{ base: 200, md: 250 }} w="100%">
                    <Galery images={place.images} />
                </Box>
            }
            <CardBody>
                <Stack position="relative" w="100%">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <UserInfo user={place.user} size="sm" />
                        <PublishDateText size="xs" date={place.createdAt} />
                    </Stack>
                    <City city={place.city} />
                    <Category category={place.category} />
                    <Text noOfLines={1} fontWeight={500}>{place.title} </Text>
                    <Text noOfLines={2}>{place.description} </Text>
                    {
                        mode === 'feed' ? <Stack direction="row">
                            <NoOfLikes nb={place.likes.length} />
                            <NoOfComments nb={place.comments.length} />
                        </Stack> : <>
                            {children}
                        </>
                    }

                </Stack>
            </CardBody>
        </Card>
    )

}

export default PlaceCard