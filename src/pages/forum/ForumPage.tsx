import React, { useEffect } from "react";
import { Box, Button, Text, HStack, IconButton, Stack, Show } from "@chakra-ui/react";
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
import { FILTER_ICON, NEW_TOPIC_ICON } from "../../utils/icon";
import { NavLink } from "react-router-dom";
import SwiperComponant from "../../components/swipers/SwiperComponant";
import SearchFilter from "../components/filters/SearchFilter";
import TitleText from "../../components/texts/TitleText";
import ModalWrapper from "../../components/Modals/ModalWraper";

const FiltresSection = () => {
    const { discussionCategories } = useSelector((state: any) => state.app);
    const { updateFilter, searchParams } = useFilterContext()

    return (
        <ModalWrapper
            id="filtres"
            title={<><FILTER_ICON /> Filtres</>}
            renderButton={(onOpen) => (
                <>
                    <Show above={"md"}><Button onClick={onOpen} leftIcon={<FILTER_ICON />} variant={"outline"}>Filtres</Button></Show>
                    <Show below={"md"}><IconButton onClick={onOpen} isRound aria-label="boutton open modal filter" icon={<FILTER_ICON />} variant={"outline"} /></Show>
                </>
            )}
        >
            <Stack>
                <Text as="b">Catégories</Text>
                <RadioGroupInput
                    name="categories"
                    value={searchParams.get('category') || ''}
                    onChange={(e: any) => updateFilter('category', e)}
                    labelEmptyBox="Tout"
                    datas={discussionCategories}
                    options={{
                        overflowX: 'hidden',
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
            </Stack>
        </ModalWrapper>
    )
}


const ForumPage: React.FC<any> = () => {

    return (
        <>
            <NavLink to="/forum/discussion/create">
                <IconButton zIndex={10} position="fixed" bottom={3} right={3} aria-label="ajouter une discussion" icon={<NEW_TOPIC_ICON />} isRound colorScheme="whatsapp" />
            </NavLink>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING} pb={VERTICAL_SPACING}>
                <Box as="aside" bg="white" boxShadow="0 0 3px grey" py={5}>
                    <ContainerSection withPadding={true}>
                        <Stack spacing={{ base: 5, md: 20 }} direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}>
                            <TitleText text="Forum" />
                            <HStack w="100%" flex={1}>
                                <Box flex={1}>
                                    <SearchFilter />
                                </Box>
                                <FiltresSection />
                            </HStack>
                        </Stack>
                    </ContainerSection>
                </Box>
                <ContainerSection withPadding={true}>
                    <FeedList
                        url="/discussions"
                        noLengthLabel="Aucune discussions trouvées"
                        buttonLabel="Voir plus"
                        cardName="discussion"
                        templateColumns={
                            {
                                base: "repeat(1, 1fr)",
                                sm: "repeat(1, 1fr)",
                                md: "repeat(2, 1fr)",
                            }
                        }
                    />
                </ContainerSection>
            </Stack>
        </>
    );
};

export default ForumPage;
