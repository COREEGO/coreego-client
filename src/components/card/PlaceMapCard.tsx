import { getFirstImage } from "../../utils";
import LocalisationText from "../texts/LocalisationText";
import { BiCloset } from "react-icons/bi";
import { CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { Box, Button, Card, CardContent, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import { CLOSE_ICON } from "../../utils/icon";
import { CardBody } from "@chakra-ui/react";
import CategoryText from "../texts/CategoryText";




const PlaceMapCard: React.FC<{ place: any, onClose: () => void }> = ({ place, onClose }) => {

    return (
        <Card sx={{ width: '100%', height: '100%' }}>
            <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', right: 1, top: 1 }}>
                <CLOSE_ICON />
            </IconButton>
            <CardMedia
                component="img"
                height="194"
                image={getFirstImage(place.images) || "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"}
                alt="Paella dish"
            />
            <CardContent>
                <Stack spacing={2}>
                    <CategoryText category={place.category} />
                    <LocalisationText city={place.city} district={place.district} />
                    <Stack spacing={0}>
                        <Typography fontWeight={"bold"} noWrap={true}>{place.title}</Typography>
                        <Typography noWrap={true}> {place.description}</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2} mt={3} >
                    <NavLink to={`/voyage/place/detail/${place.id}`}>
                        <Button size="small" variant="outlined">Détail</Button>
                    </NavLink>
                    <NavLink target="_blank" to={`https://map.kakao.com/link/to/${place.title},${place.latitude},${place.longitude}`}>
                        <Button size="small" variant="outlined">Naviguer</Button>
                    </NavLink>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default PlaceMapCard;