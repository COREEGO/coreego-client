import { Stack, Box, Text, Divider, Container, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
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


const MarketPlaceFeedPage = () => {

    const { cities } = useSelector((state: any) => state.app)

    return (
        <>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING}>
                <AsideFeedSection title="Market Place" buttonLabel="+ Produit" buttonUrl="/market-place/product/create" />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <CityFilter cities={cities} />
                    </ContainerSection>
                    <ContainerSection>
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

export default MarketPlaceFeedPage