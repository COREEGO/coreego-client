import { Card, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, Text, Image } from "@chakra-ui/react"
import { MdMoreVert, MdBorderColor, MdDelete } from "react-icons/md"
import { getFirstImage } from "../../utils"
import Category from "./_Category"
import Localisation from "./_Localisation"


interface PropsInterface {
    place: any
}


const SmallPlaceCard : React.FC<PropsInterface> = ({place}) => {

    return (
        <Card variant="unstyled" bg="transparent">
            <HStack alignItems={"flex-start"}>
                <HStack flex={1}>
                    <Image
                        h={90} w={90}
                        borderRadius="md" objectFit="cover" src={getFirstImage(place.images)} />
                    <VStack alignItems={"flex-start"} spacing={0}>
                        <Category category={place.category} />
                        <Text as="b" noOfLines={1}> {place.title} </Text>
                        <Text as="span" fontSize="sm" noOfLines={1}> {place.description} </Text>
                        <Localisation city={place.city} district={place.district} />
                    </VStack>
                </HStack>
                <Menu>
                    <MenuButton>
                        <MdMoreVert />
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<MdBorderColor />}>Appercu</MenuItem>
                        <MenuItem icon={<MdBorderColor />}>Modifier</MenuItem>
                        <MenuItem icon={<MdDelete />}>Supprimer</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Card>
    )

}

export default SmallPlaceCard