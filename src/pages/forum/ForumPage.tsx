import React from "react";
import { useLocation } from "react-router-dom";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Container, Pagination, Fab, Box } from "@mui/material";
import useSWR from "swr";
import { useFilterContext } from "../../contexts/FilterProvider";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { EDIT_ICON } from "../../utils/icon";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AsideFeedSection from "../../components/dom-section/AsideFeedSection";
import FeedList from "../components/FeedList";
import LoadingPage from "../../components/LoadingPage";

const ForumPage: React.FC = () => {

    const { updateFilter, searchParams } = useFilterContext();

    const location = useLocation();

    const { data, isLoading, error } = useSWR(`/discussions${location.search}`);

    if (error) console.error('API ERROR:', error);

    const { discussionCategories } = useSelector((state: any) => state.app)

    return (
        <>
            <NavLink to="/forum/discussion/create">
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
                title={"Forum"}
                renderBody={() => (
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
                                discussionCategories.map((category: any) => {
                                    return (
                                        <FormControlLabel checked={searchParams.get('category') == category.id} key={category.id} value={category.id} control={<Radio />} label={category.label} />
                                    )
                                })
                            }
                        </RadioGroup>
                    </FormControl>
                )
                }
            />
            <Container maxWidth="lg">
                {
                    isLoading ? <Box my={5}><LoadingPage type="data" /></Box> : <FeedList
                        fetchData={data}
                        noLengthLabel="Aucune discussions"
                        cardName="discussion"
                        breackpoints={{ xs: 12, md: 6 }}
                    />
                }
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                    <Pagination
                        page={Number(searchParams.get('page')) || 1}
                        onChange={(event: React.ChangeEvent<unknown>, value: number) => updateFilter('page', value.toString())}
                        count={data?.meta.last_page || 0}
                        variant="outlined"
                        shape="rounded"
                    />
                </Box>
            </Container>
        </>
    );
};

export default ForumPage;
