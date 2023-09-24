import { Box, Card, CardBody, CardFooter, CardHeader, Image, Stack, Text } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import { useEffect } from "react";
import City from "./_City";
import Category from "./_Category";
import NoOfLikes from "./_NoOfLikes";
import NoOfComments from "./_NoOfComments";

interface PlaceCardInterface {
    place: any
}

const PlaceCard: React.FC<PlaceCardInterface> = ({ place }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const imageUrl = BASE_URL + place.images[0].filePath

    return (
        <Card borderRadius={0}>
            <CardHeader>
                <UserInfo user={place.user} date={place.createdAt} />
            </CardHeader>
            <Image
                sx={{ height: { base: 200, sm: 300, md: 200 } }}
                objectFit='cover'
                objectPosition="center"
                src={imageUrl}
                alt='Green double couch with wooden legs'
            />
            <CardBody>
                <Stack>
                    <Stack>
                        <Text noOfLines={1} as="b" color="var(--coreego-blue)">{place.title} </Text>
                        <Text noOfLines={2}>{place.description} </Text>
                    </Stack>
                    <Stack direction="row">
                        <Category category={place.category} />
                        <City city={place.city} />
                    </Stack>
                </Stack>
            </CardBody>
            <CardFooter pt={0}>
                <Stack direction="row">
                    <NoOfLikes nb={place.likes.length} />
                    <NoOfComments nb={place.comments.length} />
                </Stack>
            </CardFooter>
        </Card>
    )

}

export default PlaceCard