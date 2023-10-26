import { Box, Container, Flex, Spacer, Stack, Button } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import SearchFilter from "../../pages/components/filters/SearchFilter"
import { CONTAINER_SIZE } from "../../utils/variables"
import Title from "../texts/Title"

interface AsideFeedSectionInterface {
    title: string,
    buttonLabel: string,
    buttonUrl: string
}

const AsideFeedSection: React.FC<AsideFeedSectionInterface> = ({ title, buttonLabel, buttonUrl }) => {

    return (
        <Box as="aside" bg="white" boxShadow="0 0 3px grey" py={5}>
            <Container maxW={CONTAINER_SIZE}>
                <Stack spacing={{base: 5, md: 20 }}  direction={{base: 'column', md: 'row' }} alignItems={{base: 'flex-start', md: 'center' }}>
                    <Title text={title} />
                    <Box w="100%" flex={1}>
                        <SearchFilter />
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default AsideFeedSection