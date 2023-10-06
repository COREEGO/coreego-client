import { Badge } from "@chakra-ui/react"


interface CategoryInterface {
    category: {color: string, label: string}
}

const Category: React.FC<CategoryInterface> = ({ category }) => {

    return (
        <Badge bg={category.color} p={1} width="fit-content" color="white" >
            {category.label}
        </Badge>
    )

}

export default Category