import { useSelector } from "react-redux";
import { useFilterContext } from "../../../contexts/FilterProvider";
import { Button, Stack } from "@chakra-ui/react";

interface CategoryFilterInterface{
    cateogries: Array<any>
}

const CategoryFilter : React.FC<CategoryFilterInterface> = ({cateogries}) => {

    const { setCategory, category } = useFilterContext()

    return (
        <Stack pb={3} direction="row" sx={{ overflowX: 'auto' }}>
            <Button minWidth='fit-content' onClick={() => setCategory('')} size="sm" >Tous</Button>
            {
                cateogries.map((item: any) => {
                    return (category && category === item.id) ? (
                        <Button key={item.id} minWidth='fit-content' onClick={() => setCategory(item.id)} size="sm" color="white" bg={item.color}> {item.label} </Button>
                    ) : <Button key={item.id} minWidth='fit-content' variant="outline" borderColor={item.color} onClick={() => setCategory(item.id)} size="sm" color={item.color}> {item.label} </Button>
                })
            }
        </Stack>
    )
}

export default CategoryFilter