import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Stack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TitlePageUx from "../../components/react-ux/TitlePageUx";
import SelectInput from "../../components/inputs/SelectInput";
import SearchInput from "../../components/inputs/SearchInput";
import { filterDateOptions } from "../../utils/variables";
import FeedList from "../components/FeedList";
import { useFilterContext } from "../../contexts/FilterProvider";
import CategoryFilter from "../components/filters/CategoryFilter";
import SearchFilter from "../components/filters/SearchFilter";
import DateFilter from "../components/filters/DateFilter";


const DiscussionFeed: React.FC<any> = () => {

    const { discussionCategories } = useSelector((state: any) => state.app);

    return (

        <Stack py={0}>
            <Stack bg="var(--coreego-blue-light)" p={3} >
                <TitlePageUx title="Espace discussion" />
                <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
                    <CategoryFilter cateogries={discussionCategories} />
                    <Box flex={1}>
                        <SearchFilter />
                    </Box>
                </Stack>
            </Stack>
            <FeedList
                url="/discussions"
                noLengthLabel="Aucune discussions trouvées"
                buttonLabel="Voir plus"
                cardName="discussion"
            />
        </Stack>

    );
};

export default DiscussionFeed;
