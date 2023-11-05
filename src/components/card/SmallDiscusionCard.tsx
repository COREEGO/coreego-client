import { Box, Card, CardBody, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { MdMoreVert, MdBorderColor, MdDelete, MdRemoveRedEye } from "react-icons/md"
import { NavLink } from "react-router-dom"
import CategoryText from "../texts/CategoryText"



interface PropsInterface {
    discussion: any
}

const SmallDiscussionCard: React.FC<PropsInterface> = ({ discussion }) => {

    return (
        <Card>
            <CardBody>
                <Flex alignItems={"flex-start"}>
                    <Box>
                        <CategoryText category={discussion.category} />
                        <Text as="b" noOfLines={1}> {discussion.title} </Text>
                        <Text as="span" fontSize="sm" noOfLines={1}> {discussion.content} </Text>
                    </Box>
                    <Menu>
                        <MenuButton>
                            <MdMoreVert />
                        </MenuButton>
                        <MenuList>
                            <NavLink to={`/forum/discussion/detail/${discussion.id}`}>
                                <MenuItem icon={<MdRemoveRedEye />}>Voir détail</MenuItem>
                            </NavLink>
                            <MenuItem icon={<MdBorderColor />}>Modifier</MenuItem>
                            <MenuItem icon={<MdDelete />}>Supprimer</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </CardBody>
        </Card>
    )

}

export default SmallDiscussionCard