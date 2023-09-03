import React, { useState, useEffect } from "react";
import { Box, Divider, Stack, Grid, GridItem, Button } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TitlePageUx from "../../components/react-ux/TitlePageUx";
import DiscussionCard from "../../components/card/DiscussionCard";
import SelectInput from "../../components/inputs/SelectInput";
import SearchInput from "../../components/inputs/SearchInput";
import FilterDialog from "../../components/dialogs/FilterDialog";
import LoadingPage from "../../components/LoadingPage";
import { usePagination } from "../../hooks/usePagination";
import { filterDateOptions } from "../../utils/variables";

const DiscussionList = () => {
    const {
        paginationData: discussions,
        isReachedEnd,
        loadingMore,
        size,
        setSize,
        error,
        isLoading,
    } = usePagination<any>("/discussions");

    const handleLoadMore = () => {
        setSize(size + 1);
    };

    if (error) return <p>Une erreur est survenue</p>;

    if (!discussions.length) return <p>Aucune discussion trouvée</p>;

    if (isLoading) return <LoadingPage type="data" />;

    return (
        <>
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={6}
            >
                {discussions?.map((discussion: any) => (
                    <GridItem w="100%" key={discussion.id}>
                        <DiscussionCard discussion={discussion} />
                    </GridItem>
                ))}
            </Grid>
            {loadingMore && <LoadingPage type="data" />}
            {!isReachedEnd && (
                <Button onClick={handleLoadMore} colorScheme="blue">
                    Plus de discussions
                </Button>
            )}
        </>
    );
};

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
        <Box width="100%">
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
                <DiscussionList />
            </Stack>
        </Box>
    );
};

export default DiscussionFeed;
