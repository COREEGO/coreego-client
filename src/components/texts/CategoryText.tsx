import { Badge, Box, Card, CardContent, Paper, Typography } from "@mui/material"


interface CategoryInterface {
    category: { color: string, label: string }
}

const CategoryText: React.FC<CategoryInterface> = ({ category }) => {

    return (
        <Paper
        elevation={0}
        sx={{
            height: 'auto',
            width: 'fit-content',
            backgroundColor: category.color,
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
            color: 'white'
            }}>
            {category.label}
        </Paper>
    )

}

export default CategoryText