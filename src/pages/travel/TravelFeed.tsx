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


const TravelFeed = () => {

    const { placeCategories, cities } = useSelector((state: any) => state.app)

    return (
        <>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING}>
                <AsideFeedSection title="Voyage" buttonLabel="+ Lieu" buttonUrl="/place/create" />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Flex gap='2' alignItems="center" flexWrap="wrap">
                            <CategoryFilter cateogries={placeCategories} />
                            <CityFilter cities={cities} />
                        </Flex>
                    </ContainerSection>
                    <ContainerSection>
                        <FeedList
                            url="/places"
                            noLengthLabel="Aucun lieux trouvés"
                            buttonLabel="Voir plus"
                            cardName="place"
                        />
                    </ContainerSection>
                </Stack>
            </Stack>
        </>
    )

}

export default TravelFeed