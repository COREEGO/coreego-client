import React from "react";
import { Box, Container, Divider, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import CategoryFilter from "../components/filters/CategoryFilter";
import SearchFilter from "../components/filters/SearchFilter";
import PageTitle from "../../components/texts/PageTitle";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { CONTAINER_SIZE } from "../../utils/variables";

const DiscussionFeed: React.FC<any> = () => {

    const { discussionCategories } = useSelector((state: any) => state.app);

    return (
        <>
            <ImageHeader imgPath={HEADER_IMG}>
                <Stack>
                    <Box>
                        <Text as="h1" fontWeight="bold" color="white" fontSize="3xl" >Espace Discussion</Text>
                        <Divider borderColor="white" opacity={1} />
                    </Box>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
                        <CategoryFilter cateogries={discussionCategories} />
                        <Box flex={1}>
                            <SearchFilter />
                        </Box>
                    </Stack>
                </Stack>
            </ImageHeader>
            <Container maxW={CONTAINER_SIZE}>
                <Box my={10}>
                    <FeedList
                        url="/discussions"
                        noLengthLabel="Aucune discussions trouvées"
                        buttonLabel="Voir plus"
                        cardName="discussion"
                    />
                </Box>
            </Container>
        </>

    );
};

export default DiscussionFeed;
