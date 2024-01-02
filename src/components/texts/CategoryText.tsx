import { Badge, Box, Typography } from "@mui/material"


interface CategoryInterface {
    category: { color: string, label: string }
}

const CategoryText: React.FC<CategoryInterface> = ({ category }) => {

    return (
        <Typography width={"fit-content"} component="span" fontSize={12} fontWeight="bold" p={0.5} borderRadius={1} sx={{ backgroundColor: category.color, color: 'white' }}> {category.label} </Typography>
    )

}

export default CategoryText