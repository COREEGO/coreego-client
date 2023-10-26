import { Stack, Box, Text, Divider, Container, Button, Flex, Heading, Spacer, Grid, GridItem, Hide, useDisclosure, FormControl, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import SearchFilter from "../components/filters/SearchFilter";
import CityFilter from "../components/filters/CityFilter";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables";
import Title from "../../components/texts/Title";
import { AddIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import ContainerSection from "../components/ContainerSection";
import AsideFeedSection from "../../components/dom-section/AsideFeedSection";
import { BsFillPlusCircleFill, BsFilter } from "react-icons/bs";
import { noEmptyValidator } from "../../utils/formValidation";


const MarketPlacePage = () => {

    return (
        <>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING}>
                <AsideFeedSection title="Market Place" buttonLabel="+ Produit" buttonUrl="/market-place/product/create" />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Stack spacing={VERTICAL_SPACING}>
                            <Stack direction="row" flexWrap={"wrap"}>
                                <Button width="fit-content" colorScheme="twitter" color="white" rightIcon={<BsFillPlusCircleFill />}>Ajouter un article</Button>
                                <CityFilter />
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