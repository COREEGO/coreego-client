import { Flex, Stack, Text } from "@chakra-ui/react"
import { Badge, Box } from "@mui/material"
import { MdLens } from "react-icons/md"


interface CategoryInterface {
    category: { color: string, label: string }
}

const CategoryText: React.FC<CategoryInterface> = ({ category }) => {

    return (
        <Box width={"fit-content"} px={1} py={0.5} borderRadius={1} sx={{ backgroundColor: category.color, color: 'white' }}> {category.label} </Box>
    )

}

export default CategoryText