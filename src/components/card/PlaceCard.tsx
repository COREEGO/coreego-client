import { Box, Card, CardBody, Stack, Text } from "@chakra-ui/react";
import Category from "./_Category";
import NoOfLikes from "./_NoOfLikes";
import NoOfComments from "./_NoOfComments";
import Galery from "./_Galery";
import Localisation from "./_Localisation";
import UserSniped from "../react-ux/UserSniped";
import Stars from "./_Stars";
import StarsAverage from "../texts/StarsAverage";

interface PlaceCardInterface {
    place: any,
}

const PlaceCard: React.FC<PlaceCardInterface> = ({ place }) => {

    return (
        <Card >
            <Box h={{ base: 200, md: 250 }} w="100%">
                <Galery images={place.images} />
            </Box>
            <CardBody>
                <Stack position="relative" w="100%">
                    <UserSniped
                        avatar={place.user.avatar}
                        pseudo={place.user.pseudo}
                        publishDate={place.createdAt}
                    />
                    <Localisation city={place.city} district={place.district} />
                    <Category category={place.category} />
                    <Text noOfLines={1} fontWeight={500}>{place.title} </Text>
                    <Text noOfLines={2}>{place.description} </Text>
                    <Stack direction="row">
                        <NoOfLikes nb={place.likes.length} />
                        <StarsAverage datas={place.reviews} />
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    )

}

export default PlaceCard