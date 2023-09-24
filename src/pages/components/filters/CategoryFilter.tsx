import { useSelector } from "react-redux";
import { useFilterContext } from "../../../contexts/FilterProvider";
import { Box, Button, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

interface CategoryFilterInterface {
    cateogries: Array<any>
}

const CategoryFilter: React.FC<CategoryFilterInterface> = ({ cateogries }) => {

    const { setCategory, category } = useFilterContext()



    return (
        <Select bg="white" fontWeight="bold" borderRadius={0} value={category} onChange={(e) => setCategory(e.target.value)} width="fit-content">
            <option value=''>Toutes les catégories</option>
            {
                cateogries.map((cat: any) => {
                    return (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                    )
                })
            }
        </Select>
    )
}

export default CategoryFilter