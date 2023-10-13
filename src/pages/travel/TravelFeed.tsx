import { Box, Container, Divider, Stack, Text } from "@chakra-ui/react"
import SearchFilter from "../components/filters/SearchFilter"
import FeedList from "../components/FeedList"
import CategoryFilter from "../components/filters/CategoryFilter"
import { useSelector } from "react-redux"
import CityFilter from "../components/filters/CityFilter"
import ImageHeader from "../../components/headers/ImageHeader"
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { CONTAINER_SIZE } from "../../utils/variables"


const TravelFeed = () => {

    const { placeCategories, cities } = useSelector((state: any) => state.app)

    return (
        <>
            <ImageHeader imgPath={HEADER_IMG}>
                <Stack>
                    <Text as="h1" color="white" fontSize="3xl" >Voyage</Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={0}>
                        <Box>
                            <CityFilter cities={cities} />
                        </Box>
                        <Box>
                            <CategoryFilter cateogries={placeCategories} />
                        </Box>
                        <SearchFilter />
                    </Stack>
                </Stack>
            </ImageHeader>
            <Container maxW={CONTAINER_SIZE}>
                <Box my={10}>
                    <FeedList
                        url="/places"
                        noLengthLabel="Aucun lieux trouvés"
                        buttonLabel="Voir plus"
                        cardName="place"
                    />
                </Box>
            </Container>
        </>
    )

}

export default TravelFeed