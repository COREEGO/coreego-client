import React from "react";
import { useLocation } from "react-router-dom";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Container, Pagination } from "@mui/material";
import useSWR from "swr";
import FeedPageTemplate from "../components/templates/FeedPageTemplate";
import { useFilterContext } from "../../contexts/FilterProvider";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { VERTICAL_SPACING } from "../../utils/variables";
import { FILTER_ICON, NEW_TOPIC_ICON } from "../../utils/icon";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ForumPage: React.FC = () => {
    const { updateFilter, searchParams } = useFilterContext();
    const location = useLocation();
    const { data, isLoading, error } = useSWR(`/discussions${location.search}`);

    if (error) console.error('API ERROR:', error);

    const {discussionCategories} = useSelector((state:any) => state.app)

    return (
        <>
            <FeedPageTemplate
                title="Forum"
                addTopicLink="/forum/discussion/create"
                renderFilterBody={() => (
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Catégory</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={(event:any) => updateFilter('category', event.target.value )}

                        >
                            {
                                discussionCategories.map((category:any) => {
                                    return (
                                        <FormControlLabel checked={searchParams.get('category') == category.id} key={category.id} value={category.id} control={<Radio />} label={category.label} />
                                    )
                                })
                            }
                        </RadioGroup>
                    </FormControl>
                )}
                imgUrl={HEADER_IMG}
                fetchData={data}
                isLoading={isLoading}
                noLengthLabel="Aucun lieu"
                cardName="discussion"
                breackpoints={{ xs: 12, md: 6 }}
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
};

export default ForumPage;
