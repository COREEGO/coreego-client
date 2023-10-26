import { Badge, Flex, Stack, Text } from "@chakra-ui/react"
import { MdLens } from "react-icons/md"


interface CategoryInterface {
    category: { color: string, label: string }
    size?: any
}

const Category: React.FC<CategoryInterface> = ({ category, size = 'md' }) => {

    return (
        <Flex gap={1} alignItems="center">
            <Text fontSize={size}>
                <MdLens color={category.color}  />
            </Text>
            <Text fontSize={size}> {category.label} </Text>
        </Flex>
    )

}

export default Category