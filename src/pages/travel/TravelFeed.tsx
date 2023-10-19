import { Box, Button, Container, Divider, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react"
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
import ContainerSection from "../components/ContainerSection"
import { NavLink } from "react-router-dom"


const TravelFeed = () => {

    const { placeCategories, cities } = useSelector((state: any) => state.app)

    return (
        <>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING}>
                <Box as="aside" bg="white" boxShadow="0 0 3px grey" py={5}>
                    <ContainerSection withPadding={true}>
                        <Flex gap='2' alignItems="center" flexWrap="wrap">
                            <Heading as="h1" fontSize={{ base: 'lg', md: 'xl' }}>Voyage</Heading>
                            <Spacer />
                            <Stack direction="row" flexWrap="wrap">
                                <SearchFilter />
                                <NavLink to="/discussions/create">
                                    <Button size={{ base: 'sm', md: 'md' }} colorScheme="green">+ Lieu</Button>
                                </NavLink>
                            </Stack>
                        </Flex>
                    </ContainerSection>
                </Box>
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Flex gap='2' alignItems="center" flexWrap="wrap">
                            <CategoryFilter cateogries={placeCategories} />
                            <CityFilter cities={cities} />
                        </Flex>
                    </ContainerSection>
                    <ContainerSection>
                        <FeedList
                            url="/places"
                            noLengthLabel="Aucun lieux trouvés"
                            buttonLabel="Voir plus"
                            cardName="place"
                        />
                    </ContainerSection>
                </Stack>
            </Stack>
        </>
    )

}

export default TravelFeed