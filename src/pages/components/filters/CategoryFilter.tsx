import { Box, Text, List, ListItem, Select } from "@chakra-ui/react";
import Category from "../../../components/card/_Category";
import { useFilterContext } from "../../../contexts/FilterProvider";

interface CategoryFilterInterface {
    categories: Array<any>;
    type?: 'list' | 'input';
}

const CategoryFilter: React.FC<CategoryFilterInterface> = ({ categories, type = 'input' }) => {

    const {updateFilter, params} = useFilterContext()


    return (
        <>
            {type === 'list' ? (
                <List spacing={5}>
                    <ListItem
                        _hover={{ color: 'var(--coreego-blue)' }}
                        onClick={() => updateFilter('category', '')}
                        cursor="pointer"
                    >
                        <Text>Toutes les catégories</Text>
                    </ListItem>
                    {categories.map((cat: any) => (
                        <ListItem
                            key={cat.id}
                            _hover={{ color: 'var(--coreego-blue)' }}
                            fontWeight={params.category === cat.id ? 'bold' : undefined}
                            onClick={() => updateFilter('category', cat.id)}
                            cursor="pointer"
                        >
                            <Category category={cat} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Select bg="white" value={params.category} onChange={(e) => updateFilter('category', e.target.value)} width="fit-content">
                    <option value=''>Toutes les catégories</option>
                    {categories.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                </Select>
            )}
        </>
    );
}

export default CategoryFilter;
