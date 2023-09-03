import { Box, Button, FormControl, Input, InputGroup, Text, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { MdClose, MdSearch } from "react-icons/md"

interface SearchInputInterface {
    handleInputChange: (e: any) => {}
    value: string
}

const SearchInput: React.FC<SearchInputInterface> = ({ handleInputChange, value }) => {

    const [defaultValue, setDefaultValue] = useState<string>(value ? value : '')

    function onSubmit(e: any) {
        e.preventDefault()
        handleInputChange(e.target.elements)

    }

    return (
        <Box as="form" onSubmit={onSubmit}>
            <FormControl>
                <InputGroup size="lg">
                    <Input
                        color="grey"
                        id="search"
                        name="search"
                        fontWeight={600}
                        value={defaultValue}
                        onChange={(e: any) => setDefaultValue(e.target.value)}
                        borderRadius={0}
                        _focus={{ outline: 'none', border: '0px solid white' }}
                        _placeholder={{ fontWeight: 'normal' }}
                        placeholder='Rechercher une discussion...' />
                    <InputRightElement width='fit-content' height="100%">
                        {

                            defaultValue.trim().length > 0 && <Text as="span" me={3} cursor="pointer"
                                onClick={() => setDefaultValue('')}
                            >
                                <MdClose />
                            </Text>
                        }
                        <Button height="100%" type="submit" colorScheme="blue" borderRadius={0}>
                            <MdSearch />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </Box>
    )
}

export default SearchInput