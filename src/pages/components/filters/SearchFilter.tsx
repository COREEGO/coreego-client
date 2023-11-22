import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Input, InputGroup, InputRightAddon, InputRightElement, Stack } from "@chakra-ui/react";
import { useFilterContext } from "../../../contexts/FilterProvider";


export default function SearchFilter() {

    const {updateFilter} = useFilterContext()


    const handleSubmit = (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        updateFilter('q', element.search.value)
    }

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <InputGroup>
                <Input focusBorderColor="transparent" bg="gray.100" id="search" placeholder='Rechercher...' type="search" />
                <InputRightAddon as="button" type="submit" bg="var(--coreego-blue)">
                    <SearchIcon color="white" />
                </InputRightAddon>
            </InputGroup>
        </Box>
    )

}