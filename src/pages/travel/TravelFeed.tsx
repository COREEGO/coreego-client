import { Box, Container, Divider, Stack, Text } from "@chakra-ui/react"
import TitlePageUx from "../../components/react-ux/TitlePageUx"
import SearchFilter from "../components/filters/SearchFilter"
import FeedList from "../components/FeedList"
import CategoryFilter from "../components/filters/CategoryFilter"
import { useSelector } from "react-redux"
import CityFilter from "../components/filters/CityFilter"
import FilterContainer from "../components/filters/_FilterContainer"
import PageTitle from "../../components/texts/Title"
import ImageHeader from "../../components/headers/ImageHeader"
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { CONTAINER_SIZE } from "../../utils/variables"


const TravelFeed = () => {

    const { placeCategories, cities } = useSelector((state: any) => state.app)

    return (
        <>
            <ImageHeader imgPath={HEADER_IMG}>
                <Stack>
                    <Box>
                        <Text as="h1" fontWeight="bold" color="white" fontSize="3xl" >Espace Voyage</Text>
                        <Divider borderColor="white" opacity={1} />
                    </Box>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
                        <Stack direction={{ md: 'row' }} spacing={2}>
                            <CityFilter cities={cities} />
                            <CategoryFilter cateogries={placeCategories} />
                        </Stack>
                        <Box flex={1}>
                            <SearchFilter />
                        </Box>
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
        // <Stack py={0}>
        //     <FilterContainer>
        //         <PageTitle>Espace voyage</PageTitle>
        //         <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
        //             <Stack direction={{  md: 'row' }} spacing={2}>
        //                 <CityFilter cities={cities} />
        //                 <CategoryFilter cateogries={placeCategories} />
        //             </Stack>
        //             <Box flex={1}>
        //                 <SearchFilter />
        //             </Box>
        //         </Stack>
        //     </FilterContainer>
        //     <FeedList
        //         url="/places"
        //         cardName="place"
        //         noLengthLabel="Aucune place trouvées"
        //         buttonLabel="Voir plus"
        //     />
        // </Stack>
    )

}

export default TravelFeed