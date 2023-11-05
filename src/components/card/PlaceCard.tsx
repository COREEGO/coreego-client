import { Box, Card, CardBody, Stack, Text } from "@chakra-ui/react";
import UserSniped from "../react-ux/UserSniped";
import LikeCountIcon from "../icons/LikeCountIcon";
import StarsAverageIcon from "../icons/StarsAverageIcon";
import LocalisationText from "../texts/LocalisationText";
import CategoryText from "../texts/CategoryText";
import GaleryImages from "../images/GaleryImages";

interface PlaceCardInterface {
    place: any,
}

const PlaceCard: React.FC<PlaceCardInterface> = ({ place }) => {

    return (
        <Card id={place.id}>
            <Box h={{ base: 200, md: 250 }} w="100%">
                <GaleryImages images={place.images} />
            </Box>
            <CardBody>
                <Stack position="relative" w="100%">
                    <UserSniped
                        avatar={place.user.avatar}
                        pseudo={place.user.pseudo}
                        publishDate={place.createdAt}
                    />
                    <LocalisationText city={place.city} district={place.district} />
                    <CategoryText category={place.category} />
                    <Text noOfLines={1} fontWeight={500}>{place.title} </Text>
                    <Text noOfLines={2}>{place.description} </Text>
                    <Stack direction="row">
                        <LikeCountIcon length={place.likes.length} />
                        <StarsAverageIcon datas={place.reviews} />
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    )

}

export default PlaceCard