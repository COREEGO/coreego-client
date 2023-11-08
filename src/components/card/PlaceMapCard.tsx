import { Card, CardBody, Text, Image, IconButton } from "@chakra-ui/react"
import { getFirstImage } from "../../utils";
import LocalisationText from "../texts/LocalisationText";
import { BiCloset } from "react-icons/bi";
import { CloseIcon } from "@chakra-ui/icons";




const PlaceMapCard : React.FC<{ place: any, onClose: () => void }> = ({ place, onClose }) => {

    return (
        <Card w={200} h="100%">
            <IconButton onClick={onClose} size="sm" position={"absolute"} right={1} top={1} aria-label={"close card"} icon={<CloseIcon />} />
            <Image borderRadius={"md"} w={"100%"} h={100} src={getFirstImage(place.images)} />
            <CardBody w="100%">
                <Text noOfLines={1} as="b"> {place.title} </Text>
                <LocalisationText city={place.city} district={place.district} />
            </CardBody>
        </Card>
    )
}

export default PlaceMapCard;