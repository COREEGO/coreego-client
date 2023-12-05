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

const ForumPage: React.FC = () => {
    const { updateFilter, searchParams } = useFilterContext();
    const location = useLocation();
    const { data, isLoading, error } = useSWR(`/discussions${location.search}`);

    if (error) console.error('API ERROR:', error);
    if (isLoading) console.log('Loading...');

    return (
        <>
            <FeedPageTemplate
                title="Forum"
                addTopicLink="/"
                renderFilterBody={() => (
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={searchParams.get('category') || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('category', e.target.value)}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
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
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Pagination
                    page={Number(searchParams.get('page')) || 0}
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
