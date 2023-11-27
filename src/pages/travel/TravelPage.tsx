import { Button, Flex, IconButton, Stack } from "@chakra-ui/react"
import FeedList from "../components/FeedList"
import { useSelector } from "react-redux"
import ImageHeader from "../../components/headers/ImageHeader"
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { VERTICAL_SPACING } from "../../utils/variables"
import ContainerSection from "../components/ContainerSection"
import AsideFeedSection from "../../components/dom-section/AsideFeedSection"
import { BsFillPlusCircleFill } from "react-icons/bs"
import FilterModal from "../../components/Modals/FilterModal"
import SectionModal from "../../components/Modals/_SectionModal"
import LocalisationCheckbox from "../../components/inputs/LocalisationCheckbox"
import { useFilterContext } from "../../contexts/FilterProvider"
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput"
import SelectInput from "../../components/inputs/SelectInput"
import AddNewTopikButton from "../../components/buttons/AddTopicButton"
import { NavLink } from "react-router-dom"
import { NEW_TOPIC_ICON } from "../../utils/icon"

const TravelPage = () => {

    const { placeCategories, cities } = useSelector((state: any) => state.app)

    const { updateFilter, searchParams } = useFilterContext()


    return (
        <>
            <NavLink to="/voyage/place/create">
                <IconButton zIndex={10} position="fixed" bottom={3} right={3} aria-label="ajouter une discussion" icon={<NEW_TOPIC_ICON />} isRound colorScheme="whatsapp" />
            </NavLink>
            <ImageHeader imgUrl={HEADER_IMG} />
            <Stack spacing={VERTICAL_SPACING} pb={VERTICAL_SPACING}>
                <AsideFeedSection title="Voyage" />
                <Stack spacing={VERTICAL_SPACING}>
                    <ContainerSection withPadding={true}>
                        <Flex gap='2' alignItems="center" flexWrap="wrap">
                            <AddNewTopikButton label="Ajouter un lieu" url="/" />
                            <FilterModal>
                                <SectionModal title={"Localisation"}>
                                    <CityDistrictSelectInput
                                        updateCity={(e: any) => updateFilter('city', e)}
                                        cityValue={searchParams.get('city') || ''}
                                        updateDistrict={(e: any) => updateFilter('district', e)}
                                        districtValue={searchParams.get('district') || ''}
                                    />
                                </SectionModal>
                                <SectionModal title={"Catégories"}>
                                    <SelectInput
                                        options={placeCategories}
                                        value={searchParams.get('category') || ''}
                                        updateValue={(e: any) => updateFilter('category', e)}
                                        emptyOptionLabel="Toutes les catégories"
                                    />
                                </SectionModal>
                            </FilterModal>
                        </Flex>
                    </ContainerSection>
                    <ContainerSection withPadding={true}>
                        <FeedList
                            url="/places"
                            noLengthLabel="Aucun lieux trouvés"
                            buttonLabel="Voir plus"
                            cardName="place"
                            templateColumns={
                                {
                                    base: "repeat(1, 1fr)",
                                    sm: "repeat(2, 1fr)",
                                    md: "repeat(3, 1fr)",
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