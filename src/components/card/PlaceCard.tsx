import { Box, Card, CardBody, CardFooter, CardHeader, Image, Stack, Text, background } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import { useEffect } from "react";
import City from "./_City";
import Category from "./_Category";
import NoOfLikes from "./_NoOfLikes";
import NoOfComments from "./_NoOfComments";
import { NavLink } from "react-router-dom";
import DefaultSwiper from "../swipers/DefaultSwiper";

interface PlaceCardInterface {
    place: any
}

const PlaceCard: React.FC<PlaceCardInterface> = ({ place }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const imageUrl = BASE_URL + place.images[0].filePath

    return (
        <NavLink to="/">
            <Card borderRadius={0} className="feed__card" >
                <CardBody>
                    <Stack position="relative" w="100%">
                        <UserInfo user={place.user} date={place.createdAt} />
                        <Box sx={{ height: { base: 150, sm: 200, md: 250 }}}>
                            <DefaultSwiper images={place.images} />
                        </Box>
                        <Text noOfLines={1} as="b" color="var(--coreego-blue)">{place.title} </Text>
                        <Text noOfLines={2}>{place.description} </Text>
                        <Stack direction="row">
                            <Category category={place.category} />
                            <City city={place.city} />
                        </Stack>
                        <Stack direction="row">
                            <NoOfLikes nb={place.likes.length} />
                            <NoOfComments nb={place.comments.length} />
                        </Stack>
                    </Stack>
                </CardBody>
            </Card>
        </NavLink>
    )

}

export default PlaceCard