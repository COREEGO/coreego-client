import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Stack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TitlePageUx from "../../components/react-ux/TitlePageUx";
import SelectInput from "../../components/inputs/SelectInput";
import SearchInput from "../../components/inputs/SearchInput";
import FilterDialog from "../../components/dialogs/FilterDialog";
import { filterDateOptions } from "../../utils/variables";
import FeedList from "../components/FeedList";
import { useFilterContext } from "../../contexts/FilterProvider";
import CategoryFilter from "../components/filters/CategoryFilter";
import SearchFilter from "../components/filters/SearchFilter";
import DateFilter from "../components/filters/DateFilter";


const DiscussionFeed: React.FC<any> = () => {

    const { discussionCategories } = useSelector((state: any) => state.app);


    return (
        <Box>
            <Stack spacing={5}>
                <TitlePageUx title="Espace discussion" />
                <Stack spacing={2}>
                    <SearchFilter />
                    <CategoryFilter cateogries={discussionCategories} />
                    <DateFilter />
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
