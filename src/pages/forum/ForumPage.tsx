import React, { Suspense, useEffect } from "react";
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
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import { Button, Container, Fab, IconButton, Stack, Box, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel } from "@mui/material";
import FeedPageTemplate from "../components/templates/FeedPageTemplate";


const DiscussionList: React.FC<any> = () => {
    const { updateFilter, searchParams } = useFilterContext()

    const { data, error } = useSWR('/discussions', { suspense: true })

    if (error) console.error('API ERROR : ', error)

    return (
        <FeedPageTemplate
            title="Forum"
            addTopicLink={"/"}
            renderFilterBody={() => (
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={searchParams.get('category') || ''}
                        onChange={(e: any) => updateFilter('category', e)}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>
            )}
            imgUrl={HEADER_IMG}
            fetchData={data}
            noLengthLabel={"Aucun lieu"}
            cardName={"discussion"}
            breackpoints={{xs:12, md: 6}}
        />
    );
};

const ForumPage = () => {
    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <DiscussionList />
        </Suspense>
    )
}

export default ForumPage;
