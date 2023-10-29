import { Stack, Box, Text, Divider, Container, Button, Flex, Heading, Spacer, Grid, GridItem, Hide, useDisclosure, FormControl, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/react";
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
import AddNewTopikButton from "../../components/buttons/AddTopicButton";


const MarketPlacePage = () => {

    const { updateFilter, params } = useFilterContext()

    return (
        <>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING}>
                <AsideFeedSection title="Market Place" buttonLabel="+ Produit" buttonUrl="/market-place/product/create" />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Stack spacing={VERTICAL_SPACING}>
                            <Stack direction="row" flexWrap={"wrap"}>
                                <AddNewTopikButton label="Ajouter un article" url="/" />
                                <FilterModal>
                                    <SectionModal title={"Localisation"}>
                                        <CityDistrictSelectInput
                                            updateCity={(e: any) => updateFilter('city', e)}
                                            cityValue={params.city}
                                            updateDistrict={(e: any) => updateFilter('district', e)}
                                            districtValue={params.district}
                                        />
                                    </SectionModal>
                                </FilterModal>
                            </Stack>
                            <FeedList
                                url="/products"
                                cardName="product"
                                noLengthLabel="Aucun produits trouvées"
                                buttonLabel="Voir plus"
                                templateColumns={
                                    {
                                        base: "repeat(1, 1fr)",
                                        sm: "repeat(2, 1fr)",
                                        md: "repeat(3, 1fr)",
                                        lg: "repeat(4, 1fr)"
                                    }
                                }
                            />
                        </Stack>
                    </ContainerSection>
                </Stack>
            </Stack>
        </>
    )

}

export default MarketPlacePage