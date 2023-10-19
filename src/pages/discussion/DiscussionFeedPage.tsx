import React from "react";
import { Box, Button, Card, Container, Divider, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
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
import AddButton from "../../components/buttons/AddButton";
import { NavLink } from "react-router-dom";
import ContainerSection from "../components/ContainerSection";
import AsideFeedSection from "../../components/dom-section/AsideFeedSection";

const DiscussionFeed: React.FC<any> = () => {

    const { discussionCategories } = useSelector((state: any) => state.app);

    return (
        <>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING}>
                <AsideFeedSection title="Forum" buttonLabel="+ Discussion" buttonUrl="/discussions/create"  />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <CategoryFilter cateogries={discussionCategories} />
                    </ContainerSection>
                    <ContainerSection>
                        <FeedList
                            url="/discussions"
                            noLengthLabel="Aucune discussions trouvées"
                            buttonLabel="Voir plus"
                            cardName="discussion"
                        />
                    </ContainerSection>
                </Stack>
            </Stack>
        </>
    );
};

export default DiscussionFeed;
