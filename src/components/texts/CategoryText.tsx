import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react"
import { MdLens } from "react-icons/md"


interface CategoryInterface {
    category: { color: string, label: string }
}

const CategoryText: React.FC<CategoryInterface> = ({ category }) => {

    return (
        <Box>
            <Badge color="white" bg={category.color}> {category.label} </Badge>
        </Box>
    )

}

export default CategoryText