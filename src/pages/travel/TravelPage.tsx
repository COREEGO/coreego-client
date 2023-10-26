import {Flex, Stack } from "@chakra-ui/react"
import FeedList from "../components/FeedList"
import CategoryFilter from "../components/filters/CategoryFilter"
import { useSelector } from "react-redux"
import CityFilter from "../components/filters/CityFilter"
import ImageHeader from "../../components/headers/ImageHeader"
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { VERTICAL_SPACING } from "../../utils/variables"
import ContainerSection from "../components/ContainerSection"
import { NavLink } from "react-router-dom"
import AsideFeedSection from "../../components/dom-section/AsideFeedSection"


const TravelPage = () => {

    const { placeCategories, cities } = useSelector((state: any) => state.app)

    return (
        <>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING}>
                <AsideFeedSection title="Voyage" buttonLabel="+ Lieu" buttonUrl="/voyage/place/create" />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Flex gap='2' alignItems="center" flexWrap="wrap">
                            <CategoryFilter categories={placeCategories} />
                            <CityFilter />
                        </Flex>
                    </ContainerSection>
                    <ContainerSection>
                        <FeedList
                            url="/places"
                            noLengthLabel="Aucun lieux trouvés"
                            buttonLabel="Voir plus"
                            cardName="place"
                            templateColumns={
                                {
                                    base: "repeat(1, 1fr)",
                                    sm: "repeat(1, 1fr)",
                                    md: "repeat(1, 1fr)",
                                    lg: "repeat(5, 1fr)"
                                }
                            }
                        />
                    </ContainerSection>
                </Stack>
            </Stack>
        </>
    )

}

export default TravelPage