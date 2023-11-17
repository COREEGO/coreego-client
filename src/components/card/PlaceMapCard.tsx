import { Card, CardBody, Text, Image, IconButton, CardFooter, Button, Box } from "@chakra-ui/react"
import { getFirstImage } from "../../utils";
import LocalisationText from "../texts/LocalisationText";
import { BiCloset } from "react-icons/bi";
import { CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";




const PlaceMapCard: React.FC<{ place: any, onClose: () => void }> = ({ place, onClose }) => {

    return (
        <Card w={200} h="100%">
            <IconButton onClick={onClose} size="sm" position={"absolute"} right={1} top={1} aria-label={"close card"} icon={<CloseIcon />} />
            <Image objectFit={"cover"} borderRadius={"md"} w={"100%"} h={100} src={getFirstImage(place.images)} />
            <CardBody w="100%">
                <Text noOfLines={1} as="b"> {place.title} </Text>
                <LocalisationText city={place.city} district={place.district} />
                <Box mt={3}>
                    <NavLink target="_blank" to={`https://map.kakao.com/link/to/${place.title},${place.latitude},${place.longitude}`}>
                        <Button size="sm" colorScheme="twitter">voir</Button>
                    </NavLink>
                </Box>
            </CardBody>
        </Card>
    )
}

export default PlaceMapCard;