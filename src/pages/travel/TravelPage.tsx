import FeedList from "../components/FeedList"
import { useSelector } from "react-redux"
import ImageHeader from "../../components/headers/ImageHeader"
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import AsideFeedSection from "../../components/dom-section/AsideFeedSection"
import { BsFillPlusCircleFill } from "react-icons/bs"
import FilterModal from "../../components/Modals/FilterModal"
import SectionModal from "../../components/Modals/_SectionModal"
import LocalisationCheckbox from "../../components/inputs/LocalisationCheckbox"
import { useFilterContext } from "../../contexts/FilterProvider"
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput"
import SelectInput from "../../components/inputs/SelectInput"
import AddNewTopikButton from "../../components/buttons/AddTopicButton"
import { NavLink, useLocation } from "react-router-dom"
import { EDIT_ICON } from "../../utils/icon"
import { Box, Container, Fab, FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup, Stack } from "@mui/material"
import useSWR from "swr"
import LoadingPage from "../../components/LoadingPage"

const TravelPage = () => {

    const { placeCategories, cities } = useSelector((state: any) => state.app)

    const { updateFilter, searchParams } = useFilterContext();
    const location = useLocation();

    const { data, isLoading, error } = useSWR(`/places${location.search}`);

    if (error) console.error('API ERROR:', error);

    return (
        <>
            <NavLink to="/voyage/place/create">
                <Fab sx={{ position: 'fixed', bottom: 10, right: 10 }} color="success" aria-label="add">
                    <EDIT_ICON />
                </Fab>
            </NavLink>
            <Box
                sx={{
                    backgroundImage: `url(${HEADER_IMG})`,
                    height: { xs: 150, md: 300 }, backgroundPosition: 'bottom', position: 'relative', backgroundSize: 'cover'
                }}>
            </Box>
            <AsideFeedSection
                title="Voyage"
                renderBody={() => (
                    <Stack spacing={2} sx={{ width: 500, maxWidth: '100%' }}>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 2 }}>Localisation</FormLabel>
                            <CityDistrictSelectInput
                                cityValue={searchParams.get('city') || ''}
                                districtValue={searchParams.get('district') || ''}
                                updateCity={(e: any) => updateFilter('city', e.toString())}
                                updateDistrict={(e: any) => updateFilter('district', e.toString())}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Catégories</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                onChange={(event: any) => updateFilter('category', event.target.value)}
                            >
                                <FormControlLabel checked={!searchParams.get('category')} value={''} control={<Radio />} label="Toutes les catégories" />
                                {
                                    placeCategories.map((category: any) => {
                                        return (
                                            <FormControlLabel checked={searchParams.get('category') == category.id} key={category.id} value={category.id} control={<Radio />} label={category.label} />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                )}
            />
            <Container maxWidth="lg">
                {
                    !isLoading ? <FeedList
                        fetchData={data}
                        noLengthLabel="Aucun lieu"
                        cardName="place"
                        breackpoints={{ xs: 12, sm: 6, md: 4 }}
                    /> : <Box my={5}><LoadingPage type="data" /></Box>
                }
            </Container>
            <Container maxWidth="lg" sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    page={Number(searchParams.get('page')) || 1}
                    onChange={(event: React.ChangeEvent<unknown>, value: number) => updateFilter('page', value.toString())}
                    count={data?.meta.last_page || 0}
                    variant="outlined"
                    shape="rounded"
                />
            </Container>
        </>
    )

}

export default TravelPage