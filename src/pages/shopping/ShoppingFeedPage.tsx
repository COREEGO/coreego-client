import { Stack, Box, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Divider, GridItem, Button, Grid } from "@chakra-ui/react";
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
import PageTitle from "../../components/texts/PageTitle";


export default function ShoppingFeedPage() {

    const { cities } = useSelector((state: any) => state.app)

    return (

        <Stack py={0}>
            <FilterContainer>
                <PageTitle>Espace shopping</PageTitle>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
                    <CityFilter cities={cities} />
                    <Box flex={1}>
                        <SearchFilter />
                    </Box>
                </Stack>
            </FilterContainer>
            <FeedList
                url="/products"
                cardName="product"
                noLengthLabel="Aucun produits trouvées"
                buttonLabel="Voir plus"
            />
        </Stack>

    )

}