import { Badge, Stack, Text } from "@chakra-ui/react"
import { MdLens } from "react-icons/md"


interface CategoryInterface {
    category: { color: string, label: string }
    size?: any
}

const Category: React.FC<CategoryInterface> = ({ category, size = 'md' }) => {

    return (
        <Stack direction="row" alignItems="center">
            <Text fontSize={size}>
                <MdLens color={category.color}  />
            </Text>
            <Text fontSize={size} color={category.color}> {category.label} </Text>
        </Stack>
    )

}

export default Category