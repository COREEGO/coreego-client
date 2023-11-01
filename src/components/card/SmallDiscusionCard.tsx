import { Box, Card, CardBody, Flex, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react"
import Category from "./_Category"
import { MdMoreVert, MdBorderColor, MdDelete } from "react-icons/md"



interface PropsInterface {
    discussion: any
}

const SmallDiscussionCard: React.FC<PropsInterface> = ({ discussion }) => {

    return (
        <Card>
            <CardBody>
                <Flex alignItems={"flex-start"}>
                    <Box>
                        <Category category={discussion.category} />
                        <Text as="b" noOfLines={1}> {discussion.title} </Text>
                        <Text as="span" fontSize="sm" noOfLines={1}> {discussion.content} </Text>
                    </Box>
                    <Menu>
                        <MenuButton>
                            <MdMoreVert />
                        </MenuButton>
                        <MenuList>
                            <MenuItem  icon={<MdBorderColor />}>Appercu</MenuItem>
                            <MenuItem  icon={<MdBorderColor />}>Modifier</MenuItem>
                            <MenuItem  icon={<MdDelete />}>Supprimer</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </CardBody>
        </Card>
    )

}

export default SmallDiscussionCard