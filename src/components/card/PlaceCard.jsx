import UserSniped from "../react-ux/UserSniped";
import LikeCountIcon from "../icons/LikeCountIcon";
import StarsAverageIcon from "../icons/StarsAverageIcon";
import LocalisationText from "../texts/LocalisationText";
import CategoryText from "../texts/CategoryText";
import GaleryImages from "../images/GaleryImages";
import { getFirstImage } from "../../utils";
import { Avatar, Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import CommentCountIcon from "../icons/CommentCounterIcon";
import ImageCountIcon from "../icons/ImageCountIcon";
import { AVATAR_PATH } from "../../utils/variables";
import moment from "moment";
import { MARKER_ICON } from "../../utils/icon";

const PlaceCard = ({ place }) => {

        return (
            <Card sx={{ width: '100%' }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={getFirstImage(place.images) || "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"}
                    alt="Paella dish"
                />
                <CardContent>
                    <Stack flex={1} spacing={1} >
                    <Stack flex={1} direction="row" alignItems="center">
                        <Stack flex={1} direction="row" spacing={1} alignItems="center">
                            <Avatar src={AVATAR_PATH + place.user.avatarPath} sx={{width: 30, height: 30}} />
                            <Typography flex={1} width="100%" noWrap={true} component="span"  variant="body2" fontWeight="bold">{place.user.pseudo + 'ogkj er'} </Typography>
                            <Typography  variant="body2"> {moment(place.created_at).format('D MMMM YYYY')} </Typography>
                        </Stack>
                    </Stack>
                        <CategoryText category={place.category} />
                        <Box>
                            <Typography color="var(--coreego-blue)" component="p" variant="h6" noWrap={true}>{place.title}</Typography>
                            <Typography color="var(--grey-bold)" noWrap={true}>{place.description}</Typography>
                         </Box>
                        <Typography display="flex"
                            alignItems="center">
                            <MARKER_ICON sx={{mr: 1}} />
                            <Typography component="span" flex={1} noWrap={true}>{place.city.label},
                            {place.district.label}</Typography>
                        </Typography>
                        <StarsAverageIcon datas={place.reviews} />
                        <Stack direction="row" gap={1}>
                            <CommentCountIcon length={place.comments?.length} />
                            <LikeCountIcon length={place.likes?.length} />
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        )

}

export default PlaceCard