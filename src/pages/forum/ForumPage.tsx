import React, { useEffect } from "react";
import { Box, Button, Flex, IconButton, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { VERTICAL_SPACING } from "../../utils/variables";
import ContainerSection from "../components/ContainerSection";
import FilterModal from "../../components/Modals/FilterModal";
import SectionModal from "../../components/Modals/_SectionModal";
import SelectInput from "../../components/inputs/SelectInput";
import { useFilterContext } from "../../contexts/FilterProvider";
import AsideFeedSection from "../../components/dom-section/AsideFeedSection";
import AddNewTopikButton from "../../components/buttons/AddTopicButton";
import RadioGroupInput from "../../components/inputs/RadioGroupInput";
import { NEW_TOPIC_ICON } from "../../utils/icon";
import { NavLink } from "react-router-dom";

const ForumPage: React.FC<any> = () => {

    const { discussionCategories } = useSelector((state: any) => state.app);
    const { updateFilter, searchParams } = useFilterContext()

    return (
        <>
            <NavLink to="/forum/discussion/create">
                <IconButton zIndex={10} position="fixed" bottom={3} right={3} aria-label="ajouter une discussion" icon={<NEW_TOPIC_ICON />} isRound colorScheme="whatsapp" />
            </NavLink>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING} pb={VERTICAL_SPACING} overflowX={"hidden"}>
                <AsideFeedSection title="Forum" />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Box overflowX="auto" className="scrollbar" minWidth={"100%"}>
                            <RadioGroupInput
                                name="categories"
                                value={searchParams.get('category') || ''}
                                onChange={(e: any) => updateFilter('category', e)}
                                labelEmptyBox="Tout"
                                datas={discussionCategories}
                                options={{
                                    borderWidth: 1,
                                    borderRadius: 'md',
                                    px: 3,
                                    py: 2,
                                    _checked: {
                                        bg: 'var(--coreego-blue)',
                                        color: 'white',
                                        borderColor: 'teal.600',
                                    }
                                }}
                            />
                        </Box>
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
