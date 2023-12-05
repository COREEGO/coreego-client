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
import { FILTER_ICON, EDIT_ICON } from "../../utils/icon";
import TitleText from "../../components/texts/TitleText";
import { NavLink, useLocation } from "react-router-dom";
import useSWR from "swr";
import FeedPageTemplate from "../components/templates/FeedPageTemplate";
import { Container, Pagination } from "@mui/material";


const MarketPlacePage = () => {
    const { updateFilter, searchParams } = useFilterContext();
    const location = useLocation();
    const { data, isLoading, error } = useSWR(`/products${location.search}`);

    if (error) console.error('API ERROR:', error);

    // const { discussionCategories } = useSelector((state: any) => state.app)

    return (
        <>
            <FeedPageTemplate
                title="Market-place"
                addTopicLink="/market-place/product/create"
                renderFilterBody={() => null}
                imgUrl={HEADER_IMG}
                fetchData={data}
                isLoading={isLoading}
                noLengthLabel="Aucun produit"
                cardName="product"
                breackpoints={{ xs: 12, sm: 6, md: 3 }}
            />
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
    );

}

export default MarketPlacePage