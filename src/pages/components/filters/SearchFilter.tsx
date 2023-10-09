import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Input, InputGroup, InputRightAddon, InputRightElement, Stack } from "@chakra-ui/react";
import { useFilterContext } from "../../../contexts/FilterProvider";


export default function SearchFilter() {

    const { setSearch } = useFilterContext()


    const handleSubmit = (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        setSearch(element.search.value)
    }

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <InputGroup >
                <Input bg="white" fontWeight={"bold"} color="var(--coreego-blue)" id="search" placeholder='Rechercher...' type="search" />
                <InputRightElement width="fit-content">
                    <IconButton
                        type="submit"
                        colorScheme='blue'
                        aria-label='Search database'
                        icon={<SearchIcon />}
                    />
                </InputRightElement>
            </InputGroup>
        </Box>
    )

}