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
                <Flex gap='2' alignItems="center" flexWrap="wrap">
                    <Title text={title} />
                    <Spacer />
                    <Stack direction="row" flexWrap="wrap">
                        <SearchFilter />
                        <NavLink to={buttonUrl}>
                            <Button colorScheme="green">{buttonLabel}</Button>
                        </NavLink>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    )
}

export default AsideFeedSection