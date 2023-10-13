import { Box, Container, Divider, Stack, Text } from "@chakra-ui/react"
import SearchFilter from "../components/filters/SearchFilter"
import FeedList from "../components/FeedList"
import CategoryFilter from "../components/filters/CategoryFilter"
import { useSelector } from "react-redux"
import CityFilter from "../components/filters/CityFilter"
import ImageHeader from "../../components/headers/ImageHeader"
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import AddButton from "../../components/buttons/AddButton"
import Title from "../../components/texts/Title"


const TravelFeed = () => {

    const { placeCategories, cities } = useSelector((state: any) => state.app)

    return (
        <Box py={VERTICAL_SPACING}>
            <Container maxW={CONTAINER_SIZE}>
                <Stack spacing={VERTICAL_SPACING}>
                    <Stack direction="row" alignItems="center">
                        <Title>Voyage</Title>
                        <AddButton />
                    </Stack>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={0}>
                        <Box>
                            <CityFilter cities={cities} />
                        </Box>
                        <Box>
                            <CategoryFilter cateogries={placeCategories} />
                        </Box>
                        <SearchFilter />
                    </Stack>
                    <Divider opacity={1} borderColor="black" />
                    <Box>
                        <FeedList
                            url="/places"
                            noLengthLabel="Aucun lieux trouvés"
                            buttonLabel="Voir plus"
                            cardName="place"
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    )

}

export default TravelFeed