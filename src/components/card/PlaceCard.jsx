import LikeCountIcon from "../icons/LikeCountIcon";
import StarsAverageIcon from "../icons/StarsAverageIcon";
import CategoryText from "../texts/CategoryText";
import { getFirstImage } from "../../utils";
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import CommentCountIcon from "../icons/CommentCounterIcon";
import ImageCountIcon from "../icons/ImageCountIcon";
import { AVATAR_PATH } from "../../utils/variables";
import moment from "moment";
import { MARKER_ICON } from "../../utils/icon";

const PlaceCard = ({ place }) => {

        return (
            <Card elevation={3}>
                <CardActionArea component="div">

                <CardMedia
                    component="img"
                    height="194"
                    image={getFirstImage(place.images) || "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"}
                    alt={place.title}
                    />
                <CardContent>
                    <Stack flex={1} spacing={1} >
                    <Stack flex={1} direction="row" alignItems="center">
                        <Stack flex={1} direction="row" spacing={1} alignItems="center">
                            <Avatar src={AVATAR_PATH + place.user.avatar} sx={{width: 30, height: 30}} />
                            <Typography flex={1} width="100%" noWrap={true} component="span"  variant="body2" fontWeight="bold">{place.user.pseudo}</Typography>
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
                            <Typography component="span" flex={1} noWrap={true}>{place?.city?.label},
                            {place?.district?.label}</Typography>
                        </Typography>
                        <StarsAverageIcon datas={place.reviews} />
                        <Stack direction="row" gap={1}>
                            <CommentCountIcon length={place.comments?.length} />
                            <LikeCountIcon length={place.likes?.length} />
                        </Stack>
                    </Stack>
                </CardContent>
                                </CardActionArea>
            </Card>
        )

}

export default PlaceCard