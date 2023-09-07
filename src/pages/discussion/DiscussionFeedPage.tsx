import React, { useState, useEffect } from "react";
import { Box, Divider, Stack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TitlePageUx from "../../components/react-ux/TitlePageUx";
import SelectInput from "../../components/inputs/SelectInput";
import SearchInput from "../../components/inputs/SearchInput";
import FilterDialog from "../../components/dialogs/FilterDialog";
import { filterDateOptions } from "../../utils/variables";
import FeedList from "../components/FeedList";


const DiscussionFeed: React.FC<any> = () => {
    const [selectedCategory, setSelectedCategory] = useState<any>("");
    const [selectedOrderBy, setSelectedOrderBy] = useState<any>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const params: any = {};

        if (searchQuery) {
            params.q = searchQuery;
        } else {
            searchParams.delete("q");
        }

        if (selectedCategory) {
            params.category = selectedCategory;
        } else {
            searchParams.delete("category");
            setSelectedCategory("");
        }

        if (selectedOrderBy) {
            params.orderby = selectedOrderBy;
        } else {
            searchParams.delete("orderby");
            setSelectedOrderBy("");
        }

        setSearchParams(params);

    }, [selectedCategory, selectedOrderBy, searchQuery]);

    const appState = useSelector((state: any) => state.app);

    const handleSearchInputChange: any = (inputValues: any) => {
        const searchInputValue = inputValues.search?.value;
        setSearchQuery(searchInputValue);
    };

    const handleFilterChange: any = (selectedValues: any) => {
        const selectedOrderByValue = selectedValues.orderby.value
        const selectedCategoryValue = selectedValues.category.value;

        setSelectedCategory(selectedCategoryValue);
        setSelectedOrderBy(selectedOrderByValue);
    }

    return (
        <Box>
            <Stack spacing={5}>
                <TitlePageUx title="Espace discussion" />
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
                                options={appState.discussionCategories}
                                name="category"
                                emptyOptionLabel="Tous"
                                label="Catégorie"
                                value={selectedCategory}
                            />
                            <SelectInput
                                name="orderby"
                                options={filterDateOptions}
                                label="Date"
                                value={selectedOrderBy}
                            />
                        </FilterDialog>
                    </Stack>
                </Stack>
                <Divider borderBottomWidth={1.5} borderColor="var(--coreego-blue)" />
                <FeedList
                    url="/discussions"
                    noLengthLabel="Aucune discussions trouvées"
                    buttonLabel="Voir plus"
                    cardName="discussion"
                />
            </Stack>
        </Box>
    );
};

export default DiscussionFeed;
