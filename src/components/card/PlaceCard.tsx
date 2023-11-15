import { Box, Card, CardBody, HStack, Stack, Text, VStack, Image } from "@chakra-ui/react";
import UserSniped from "../react-ux/UserSniped";
import LikeCountIcon from "../icons/LikeCountIcon";
import StarsAverageIcon from "../icons/StarsAverageIcon";
import LocalisationText from "../texts/LocalisationText";
import CategoryText from "../texts/CategoryText";
import GaleryImages from "../images/GaleryImages";
import { getFirstImage } from "../../utils";

interface PlaceCardInterface {
    place: any,
    size: 'xl' | 'sm'
}

const PlaceCard: React.FC<PlaceCardInterface> = ({ place, size = 'xl' }) => {


    const XlCard = () => {
        return (
            <Card id={place.id} w="100%">
                <Box h={{ base: 200, md: 250 }} w="100%">
                    <GaleryImages images={place.images} />
                </Box>
                <CardBody>
                    <VStack alignItems={"flex-start"} position="relative">
                        <UserSniped
                            avatar={place.user.avatarUrl}
                            pseudo={place.user.pseudo}
                            publishDate={place.createdAt}
                        />
                        <LocalisationText city={place.city} district={place.district} />
                        <CategoryText category={place.category} />
                        <Text noOfLines={1} fontWeight={500}>{place.title} </Text>
                        <Text noOfLines={2}>{place.description} </Text>
                        {
                            (place.likes || place.reviews) && <HStack>
                                {place.likes && <LikeCountIcon length={place.likes.length} />}
                                {place.reviews && <StarsAverageIcon datas={place.reviews} />}
                            </HStack>
                        }
                    </VStack>
                </CardBody>
            </Card>
        )
    }

    const SmCard = () => {
        return (
            <Card direction={"row"}>
                <Image
                    w={120}
                    borderRadius="md" objectFit="cover" src={getFirstImage(place.images)} />
                <CardBody>
                    <VStack alignItems={"flex-start"} spacing={0}>
                        <CategoryText category={place.category} />
                        <Text as="b" noOfLines={1}> {place.title} </Text>
                        <Text as="span" fontSize="sm" noOfLines={1}> {place.description} </Text>
                        <LocalisationText city={place.city} district={place.district} />
                    </VStack>
                </CardBody>
            </Card>
        )
    }

    return size == 'xl' ?  <XlCard /> : <SmCard />




}

export default PlaceCard