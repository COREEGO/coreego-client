import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import CategoryFilter from "../components/filters/CategoryFilter";
import SearchFilter from "../components/filters/SearchFilter";
import PageTitle from "../../components/texts/PageTitle";


const DiscussionFeed: React.FC<any> = () => {

    const { discussionCategories } = useSelector((state: any) => state.app);

    return (

        <Stack py={0}>
            <Stack bg="var(--coreego-blue-light)" p={3} >
                <PageTitle>Espace discussion</PageTitle>
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
