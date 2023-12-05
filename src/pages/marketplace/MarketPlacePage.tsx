import { Stack, Box, Text, Divider, Container, Button, Flex, Heading, Spacer, Grid, GridItem, Hide, useDisclosure, FormControl, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, IconButton, Show, HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import SearchFilter from "../components/filters/SearchFilter";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { VERTICAL_SPACING } from "../../utils/variables";
import ContainerSection from "../components/ContainerSection";
import AsideFeedSection from "../../components/dom-section/AsideFeedSection";
import { BsFillPlusCircleFill, BsFilter } from "react-icons/bs";
import FilterModal from "../../components/Modals/FilterModal";
import SectionModal from "../../components/Modals/_SectionModal";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import SelectInput from "../../components/inputs/SelectInput";
import { useFilterContext } from "../../contexts/FilterProvider";
import ModalWrapper from "../../components/Modals/ModalWraper";
import RadioGroupInput from "../../components/inputs/RadioGroupInput";
import { FILTER_ICON, NEW_TOPIC_ICON } from "../../utils/icon";
import TitleText from "../../components/texts/TitleText";
import { NavLink } from "react-router-dom";

const FiltresSection = () => {
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
                <Text as="b">Localisation</Text>
                <CityDistrictSelectInput
                    showMap={true}
                    updateCity={(e: any) => updateFilter('city', e)}
                    cityValue={searchParams.get('city') || ''}
                    updateDistrict={(e: any) => updateFilter('district', e)}
                    districtValue={searchParams.get('district') || ''}
                />
            </Stack>
        </ModalWrapper>
    )
}

const MarketPlacePage = () => {
    return (
        <>
            <NavLink to="/market-place/product/create">
                <IconButton zIndex={10} position="fixed" bottom={3} right={3} aria-label="ajouter une discussion" icon={<NEW_TOPIC_ICON />} isRound colorScheme="whatsapp" />
            </NavLink>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING} pb={VERTICAL_SPACING}>
                <Box as="aside" bg="white" boxShadow="0 0 3px grey" py={5}>
                    <ContainerSection withPadding={true}>
                        <Stack spacing={{ base: 5, md: 20 }} direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}>
                            <TitleText text="Market Place" />
                            <HStack w="100%" flex={1}>
                                <Box flex={1}>
                                    <SearchFilter />
                                </Box>
                                <FiltresSection />
                            </HStack>
                        </Stack>
                    </ContainerSection>
                </Box>
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <FeedList
                            url="/products"
                            cardName="product"
                            noLengthLabel="Aucun produits trouvées"
                            buttonLabel="Voir plus"
                        />
                    </ContainerSection>
                </Stack>
            </Stack>
        </>
    )

}

export default MarketPlacePage