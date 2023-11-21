import React from "react";
import { Box, Button, Card, Container, Divider, Flex, Grid, GridItem, Heading, Hide, Show, Spacer, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { VERTICAL_SPACING } from "../../utils/variables";
import ContainerSection from "../components/ContainerSection";
import { BsFillPlusCircleFill } from "react-icons/bs";
import FilterModal from "../../components/Modals/FilterModal";
import SectionModal from "../../components/Modals/_SectionModal";
import SelectInput from "../../components/inputs/SelectInput";
import { useFilterContext } from "../../contexts/FilterProvider";
import AsideFeedSection from "../../components/dom-section/AsideFeedSection";
import AddNewTopikButton from "../../components/buttons/AddTopicButton";
import { NavLink, useSearchParams } from "react-router-dom";

const ForumPage: React.FC<any> = () => {

    const { discussionCategories } = useSelector((state: any) => state.app);
    const { updateFilter } = useFilterContext()
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING} pb={VERTICAL_SPACING}>
                <AsideFeedSection title="Forum" />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Flex gap='2' alignItems="center" flexWrap="wrap">
                                <AddNewTopikButton label="Nouveau sujet" url="/forum/discussion/create" />
                            <FilterModal>
                                <SectionModal title={"Catégories"}>
                                    <SelectInput
                                        options={discussionCategories}
                                        value={Number(searchParams.get('category')) || ''}
                                        updateValue={(e: any) => setSearchParams({
                                            ...searchParams,
                                            category: e
                                        })}
                                        emptyOptionLabel="Toutes les catégories"
                                    />
                                </SectionModal>
                            </FilterModal>
                        </Flex>
                    </ContainerSection>
                    <ContainerSection withPadding={true}>
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
                    </ContainerSection>
                </Stack>
            </Stack>
        </>
    );
};

export default ForumPage;
