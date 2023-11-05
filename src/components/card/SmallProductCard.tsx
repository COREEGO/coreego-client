import { Card, HStack, Image, VStack, Text, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { BASE_URL } from "../../utils/variables"
import { getFirstImage } from "../../utils"
import { MdMoreVert, MdBorderColor, MdDelete, MdRemoveRedEye } from "react-icons/md"
import { NavLink } from "react-router-dom"




interface PropsInterface {
    product: any
}

const SmallProductCard: React.FC<PropsInterface> = ({ product }) => {
    return (
        <Card variant="unstyled" bg="transparent">
            <HStack alignItems={"flex-start"}>
                <HStack flex={1}>
                    <Image
                        h={90} w={90}
                        borderRadius="md" objectFit="cover" src={getFirstImage(product.images)} />
                    <VStack alignItems={"flex-start"} spacing={0}>
                        <Text as="b"> {product.price} ₩</Text>
                        <Text noOfLines={1}> {product.title} </Text>
                        <Text noOfLines={1} fontSize="sm"> {product.description} </Text>
                    </VStack>
                </HStack>
                <Menu>
                    <MenuButton>
                        <MdMoreVert />
                    </MenuButton>
                    <MenuList>
                        <NavLink to={`/market-place/product/detail/${product.id}`}>
                            <MenuItem icon={<MdRemoveRedEye />}>Voir détail</MenuItem>
                        </NavLink>
                        <MenuItem icon={<MdBorderColor />}>Modifier</MenuItem>
                        <MenuItem icon={<MdDelete />}>Supprimer</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Card>
    )
}

export default SmallProductCard