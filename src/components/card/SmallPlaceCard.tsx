import { Card, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, Text, Image, CardBody } from "@chakra-ui/react"
import { MdMoreVert, MdBorderColor, MdDelete, MdRemoveRedEye } from "react-icons/md"
import { getFirstImage } from "../../utils"
import { NavLink } from "react-router-dom"
import LocalisationText from "../texts/LocalisationText"
import CategoryText from "../texts/CategoryText"


interface PropsInterface {
    place: any
}


const SmallPlaceCard: React.FC<PropsInterface> = ({ place }) => {

    return (
        <Card direction={"row"}>
            <Image
                w={120}
                borderRadius="md" objectFit="cover" src={getFirstImage(place.images)} />
            <CardBody>
                <HStack alignItems={"flex-start"}>
                    <HStack flex={1}>
                        <VStack alignItems={"flex-start"} spacing={0}>
                            <CategoryText category={place.category} />
                            <Text as="b" noOfLines={1}> {place.title} </Text>
                            <Text as="span" fontSize="sm" noOfLines={1}> {place.description} </Text>
                            <LocalisationText city={place.city} district={place.district} />
                        </VStack>
                    </HStack>
                    <Menu>
                        <MenuButton>
                            <MdMoreVert />
                        </MenuButton>
                        <MenuList>
                            <NavLink to={`/voyage/place/detail/${place.id}`}>
                                <MenuItem icon={<MdRemoveRedEye />}>Voir détail</MenuItem>
                            </NavLink>
                            <MenuItem icon={<MdBorderColor />}>Modifier</MenuItem>
                            <MenuItem icon={<MdDelete />}>Supprimer</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </CardBody>
        </Card>
    )

}

export default SmallPlaceCard