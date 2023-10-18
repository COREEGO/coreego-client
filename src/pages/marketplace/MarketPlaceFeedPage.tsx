import { Stack, Box, Text, Divider, Container, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import SearchFilter from "../components/filters/SearchFilter";
import CityFilter from "../components/filters/CityFilter";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables";
import Title from "../../components/texts/Title";
import { AddIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import AddButton from "../../components/buttons/AddButton";


const MarketPlaceFeedPage = () => {

    const { cities } = useSelector((state: any) => state.app)

    return (
        <Box py={VERTICAL_SPACING}>
            <Container maxW={CONTAINER_SIZE}>
                <Stack spacing={VERTICAL_SPACING}>
                    <Stack direction="row" alignItems="center">
                        <Title>Market place</Title>
                        <NavLink to="/market-place/product/create">
                            <AddButton />
                        </NavLink>
                    </Stack>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={0}>
                        <Box>
                            <CityFilter cities={cities} />
                        </Box>
                        <SearchFilter />
                    </Stack>
                    <Divider opacity={1} borderColor="black" />
                    <Box>
                        <FeedList
                            url="/products"
                            cardName="product"
                            noLengthLabel="Aucun produits trouvées"
                            buttonLabel="Voir plus"
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>

    )

}

export default MarketPlaceFeedPage