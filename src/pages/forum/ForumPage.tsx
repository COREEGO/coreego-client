import React from "react";
import { Box, Button, Card, Container, Divider, Flex, Grid, GridItem, Heading, Hide, Show, Spacer, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import CategoryFilter from "../components/filters/CategoryFilter";
import SearchFilter from "../components/filters/SearchFilter";
import PageTitle from "../../components/texts/Title";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables";
import Title from "../../components/texts/Title";
import { AddIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import ContainerSection from "../components/ContainerSection";
import AsideFeedSection from "../../components/dom-section/AsideFeedSection";
import { BsFillPlusCircleFill } from "react-icons/bs";

const ForumPage: React.FC<any> = () => {

    const { discussionCategories } = useSelector((state: any) => state.app);

    return (
        <>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING}>
                <AsideFeedSection title="Forum" buttonLabel="+ Discussion" buttonUrl="/discussions/create" />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Grid gap={5} templateColumns={
                            {
                                base: "repeat(1, 1fr)",
                                sm: "repeat(1, 1fr)",
                                md: "repeat(10, 1fr)",
                            }
                        }>
                            <GridItem colSpan={{ base: 10, md: 2 }}>
                                <Stack position="sticky" top="90px">
                                    <Button width="fit-content" colorScheme="twitter" color="white" rightIcon={<BsFillPlusCircleFill/>}>Nouveau sujet</Button>
                                    <Hide above="md">
                                        <CategoryFilter type="input" categories={discussionCategories} />
                                    </Hide>
                                    <Hide below="md">
                                        <CategoryFilter type="list" categories={discussionCategories} />
                                    </Hide>
                                </Stack>
                            </GridItem>
                            <GridItem colSpan={{ base: 10, md: 8 }}>
                                <FeedList
                                    url="/discussions"
                                    noLengthLabel="Aucune discussions trouvées"
                                    buttonLabel="Voir plus"
                                    cardName="discussion"
                                    templateColumns={
                                        {
                                            base: "repeat(1, 1fr)"
                                        }
                                    }
                                />
                            </GridItem>
                        </Grid>
                    </ContainerSection>
                </Stack>
            </Stack>
        </>
    );
};

export default ForumPage;
