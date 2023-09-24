import { Box, Divider, Stack } from "@chakra-ui/react"
import TitlePageUx from "../../components/react-ux/TitlePageUx"
import SearchFilter from "../components/filters/SearchFilter"
import FeedList from "../components/FeedList"
import CategoryFilter from "../components/filters/CategoryFilter"
import { useSelector } from "react-redux"
import CityFilter from "../components/filters/CityFilter"
import FilterContainer from "../components/filters/_FilterContainer"


const TravelFeed = () => {

    const { placeCategories, cities } = useSelector((state: any) => state.app)

    return (
        <Stack py={0}>
            <FilterContainer>
                <TitlePageUx title="Espace voyage" />
                <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
                    <Stack direction={{  md: 'row' }} spacing={2}>
                        <CityFilter cities={cities} />
                        <CategoryFilter cateogries={placeCategories} />
                    </Stack>
                    <Box flex={1}>
                        <SearchFilter />
                    </Box>
                </Stack>
            </FilterContainer>
            <FeedList
                url="/places"
                cardName="place"
                noLengthLabel="Aucune place trouvées"
                buttonLabel="Voir plus"
            />
        </Stack>
    )

}

export default TravelFeed