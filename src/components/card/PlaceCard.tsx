import UserSniped from "../react-ux/UserSniped";
import LikeCountIcon from "../icons/LikeCountIcon";
import StarsAverageIcon from "../icons/StarsAverageIcon";
import LocalisationText from "../texts/LocalisationText";
import CategoryText from "../texts/CategoryText";
import GaleryImages from "../images/GaleryImages";
import { getFirstImage } from "../../utils";
import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import CommentCountIcon from "../icons/CommentCounterIcon";
import ImageCountIcon from "../icons/ImageCountIcon";

interface PlaceCardInterface {
    place: any,
    size?: 'xl' | 'sm'
}

const PlaceCard: React.FC<PlaceCardInterface> = ({ place, size = 'xl' }) => {


    const XlCard = () => {
        return (
            <Card id={place.id} sx={{ width: '100%' }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={getFirstImage(place.images) || "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"}
                    alt="Paella dish"
                />
                <CardContent>
                    <Stack spacing={2}>
                        <UserSniped
                            avatar={place.user.avatarPath}
                            pseudo={place.user.pseudo}
                            publishDate={place.created_at}
                        />
                        <CategoryText category={place.category} />
                        <LocalisationText city={place.city} district={place.district} />
                        <Stack spacing={0}>
                            <Typography fontWeight={"bold"} noWrap={true}>{place.title}</Typography>
                            <Typography noWrap={true}> {place.description}</Typography>
                        </Stack>
                        <StarsAverageIcon datas={place.reviews} />
                        <Stack direction="row" spacing={1}>
                            <CommentCountIcon length={place.comments?.length} />
                            <LikeCountIcon length={place.likes?.length} />
                            <ImageCountIcon length={place.images?.length} />
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        )
    }

    const SmCard = () => {
        return (
            <></>
            // <Card direction={"row"}>
            //     <Image
            //         w={120}
            //         borderRadius="md" objectFit="cover" src={getFirstImage(place.images)} />
            //     <CardBody>
            //         <VStack alignItems={"flex-start"} spacing={0}>
            //             <CategoryText category={place.category} />
            //             <Text as="b" noOfLines={1}> {place.title} </Text>
            //             <Text as="span" fontSize="sm" noOfLines={1}> {place.description} </Text>
            //             <LocalisationText city={place.city} district={place.district} />
            //         </VStack>
            //     </CardBody>
            // </Card>
        )
    }

    return size == 'xl' ? <XlCard /> : <SmCard />




}

export default PlaceCard