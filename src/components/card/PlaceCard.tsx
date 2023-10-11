import { Box, Card, CardBody, CardFooter, CardHeader, Image, Stack, Text, background } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import { useEffect } from "react";
import City from "./_City";
import Category from "./_Category";
import NoOfLikes from "./_NoOfLikes";
import NoOfComments from "./_NoOfComments";
import { NavLink } from "react-router-dom";
import DefaultSwiper from "../swipers/DefaultSwiper";
import DateBadge from "../badges/DateBadge";

interface PlaceCardInterface {
    place: any
}

const PlaceCard: React.FC<PlaceCardInterface> = ({ place }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const imageUrl = BASE_URL + place.images[0].filePath

    return (
        <NavLink to={'/voyage/place/detail/' + place.id}>
            <Card borderRadius={0} >
                <CardBody>
                    <Stack position="relative" w="100%">
                        <Box h={250}
                            w="100%">
                            <DefaultSwiper images={place.images} />
                        </Box>
                        <UserInfo size="xs" user={place.user} />
                        <Category category={place.category} />
                        <Text noOfLines={1} as="b" color="var(--coreego-blue)">{place.title} </Text>
                        <Text noOfLines={2}>{place.description} </Text>
                        <City city={place.city} />
                        <Stack direction="row">
                            <NoOfLikes nb={place.likes.length} />
                            <NoOfComments nb={place.comments.length} />
                        </Stack>
                        <Box alignSelf="end">
                                <DateBadge date={place.createdAt} />
                            </Box>
                    </Stack>
                </CardBody>
            </Card>
        </NavLink>
    )

}

export default PlaceCard