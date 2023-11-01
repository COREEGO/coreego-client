import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react"
import { MdLens } from "react-icons/md"


interface CategoryInterface {
    category: { color: string, label: string }
    size?: any
}

const Category: React.FC<CategoryInterface> = ({ category, size = 'md' }) => {

    return (
        <Box>
            <Badge color="white" bg={category.color}> {category.label} </Badge>
        </Box>
        // <Flex gap={1} alignItems="center">
        //     <Text fontSize={size}>
        //         <MdLens color={category.color}  />
        //     </Text>
        //     <Text fontSize={size}> {category.label} </Text>
        // </Flex>
    )

}

export default Category