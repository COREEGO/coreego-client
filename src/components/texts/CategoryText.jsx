import { Badge, Box, Card, CardContent, Chip, Paper, Typography } from "@mui/material"



const CategoryText = ({ category, ...props }) => {

    return (
        <Chip {...props} label={category.label} sx={{backgroundColor: category.color, color: 'white', width: 'fit-content'}} />
    )

}

export default CategoryText