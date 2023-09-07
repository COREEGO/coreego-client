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


export default function ShoppingFeedPage() {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectCityQuery, setSetSelectCityQuery] = useState<string>('');

    const [searchParams, setSearchParams] = useSearchParams();

    const appState = useSelector((state: any) => state.app);

    const handleSearchInputChange: any = (inputValues: any) => {
        const searchInputValue = inputValues.search?.value;
        setSearchQuery(searchInputValue);
    };

    const handleFilterChange: any = (selectedValues: any) => {
        const selectCityValue = selectedValues.city.value
        setSetSelectCityQuery(selectCityValue);
    }

    useEffect(() => {
        const params: any = {};

        if (searchQuery) params.q = searchQuery
        else searchParams.delete("q");

        if (selectCityQuery) params.city = selectCityQuery
        else searchParams.delete('city')

        setSearchParams(params);

    }, [selectCityQuery, searchQuery]);

    return (
        <Box>
            <Stack spacing={5}>
                <TitlePageUx title="Espace shopping" />
                <Stack spacing={5}>
                    <Stack direction="row" alignItems="center">

                        <Box flexGrow={1}>
                            <SearchInput
                                value={searchQuery}
                                handleInputChange={handleSearchInputChange}
                            />
                        </Box>
                        <FilterDialog handleFilterChange={handleFilterChange}>
                            <SelectInput
                                options={appState.cities}
                                name="city"
                                emptyOptionLabel="Toutes les villes"
                                label="Villes"
                                value={selectCityQuery}
                            />
                        </FilterDialog>
                    </Stack>
                </Stack>
                <Divider borderBottomWidth={1.5} borderColor="var(--coreego-blue)" />
                <FeedList
                    url="/products"
                    cardName="product"
                    noLengthLabel="Aucun produits trouvées"
                    buttonLabel="Voir plus"
                />
            </Stack>
        </Box>
    )

}