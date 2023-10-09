import { Stack, Box, Text, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Divider, GridItem, Button, Grid, Container } from "@chakra-ui/react";
import TitlePageUx from "../../components/react-ux/TitlePageUx";
import SearchInput from "../../components/inputs/SearchInput";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectInput from "../../components/inputs/SelectInput";
import RangeInput from "../../components/inputs/RangeInput";
import { useSearchParams } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import LoadingPage from "../../components/LoadingPage";
import ProductCard from "../../components/card/ProductCard";
import FeedList from "../components/FeedList";
import SearchFilter from "../components/filters/SearchFilter";
import DateFilter from "../components/filters/DateFilter";
import CityFilter from "../components/filters/CityFilter";
import FilterContainer from "../components/filters/_FilterContainer";
import PageTitle from "../../components/texts/Title";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { CONTAINER_SIZE } from "../../utils/variables";


export default function ShoppingFeedPage() {

    const { cities } = useSelector((state: any) => state.app)

    return (
        <>
            <ImageHeader imgPath={HEADER_IMG}>
                <Stack>
                    <Box>
                        <Text as="h1" fontWeight="bold" color="white" fontSize="3xl" >Espace Shopping</Text>
                        <Divider borderColor="white" opacity={1} />
                    </Box>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
                        <CityFilter cities={cities} />
                        <Box flex={1}>
                            <SearchFilter />
                        </Box>
                    </Stack>
                </Stack>
            </ImageHeader>
            <Container maxW={CONTAINER_SIZE}>
                <Box my={10}>
                    <FeedList
                        url="/products"
                        cardName="product"
                        noLengthLabel="Aucun produits trouvées"
                        buttonLabel="Voir plus"
                    />
                </Box>
            </Container>
        </>

    )

}