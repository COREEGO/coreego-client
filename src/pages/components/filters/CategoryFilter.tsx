import { useSelector } from "react-redux";
import { useFilterContext } from "../../../contexts/FilterProvider";
import { Box, Button, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

interface CategoryFilterInterface {
    cateogries: Array<any>
}

const CategoryFilter: React.FC<CategoryFilterInterface> = ({ cateogries }) => {

    const { setCategory, category } = useFilterContext()

    const categoryColor = () => {
        let color = null
        console.log(cateogries)
        if (category != '') {
            const findCategory = cateogries.find((cat: any) => cat.id == category)
            if (findCategory) {
                color = findCategory.color
            }
        } else {
            color = null
        }

        return color
    }

    useEffect(() => {
        categoryColor()
    }, [category])


    return (
        <FormControl width="fit-content">
            <FormLabel>Catégories</FormLabel>
            <Stack direction="row" alignItems="center">
                {
                    categoryColor() && <Box height={30} width={30} borderRadius={90} sx={{ backgroundColor: categoryColor() }}></Box>
                }
                <Select value={category} onChange={(e) => setCategory(e.target.value)} width="fit-content">
                    <option value=''>Toutes les catégories</option>
                    {
                        cateogries.map((cat: any) => {
                            return (
                                <option key={cat.id} value={cat.id}>
                                    {cat.label} </option>
                            )
                        })
                    }
                </Select>
            </Stack>
        </FormControl>
    )
}

export default CategoryFilter