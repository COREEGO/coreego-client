import { Divider, Stack } from "@chakra-ui/react"
import TitlePageUx from "../../components/react-ux/TitlePageUx"
import SearchFilter from "../components/filters/SearchFilter"
import FeedList from "../components/FeedList"
import CategoryFilter from "../components/filters/CategoryFilter"
import { useSelector } from "react-redux"
import CityFilter from "../components/filters/CityFilter"


const TravelFeed = () => {

    const {placeCategories, cities} = useSelector((state:any) => state.app)

    return (
        <Stack spacing={5}>
            <TitlePageUx title="Espace voyage" />
            <Stack>
                <SearchFilter />
                <Stack direction="row" flexWrap="wrap">
                <CategoryFilter cateogries={placeCategories} />
                <CityFilter cities={cities} />
                </Stack>
            </Stack>
            <Divider borderBottomWidth={1.5} borderColor="var(--coreego-blue)" />
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