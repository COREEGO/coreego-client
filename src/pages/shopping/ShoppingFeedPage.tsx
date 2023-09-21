import { Stack, Box, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Divider, GridItem, Button, Grid } from "@chakra-ui/react";
import TitlePageUx from "../../components/react-ux/TitlePageUx";
import SearchInput from "../../components/inputs/SearchInput";
import { useEffect, useState } from "react";
import FilterDialog from "../../components/dialogs/FilterDialog";
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


export default function ShoppingFeedPage() {

    const { cities } = useSelector((state: any) => state.app)

    return (

        <Stack spacing={5}>
            <TitlePageUx title="Espace shopping" />
            <Stack spacing={2}>
                <SearchFilter />
                <CityFilter cities={cities} />
                <DateFilter />
            </Stack>
            <Divider borderBottomWidth={1.5} borderColor="var(--coreego-blue)" />
            <FeedList
                url="/products"
                cardName="product"
                noLengthLabel="Aucun produits trouvées"
                buttonLabel="Voir plus"
            />
        </Stack>

    )

}