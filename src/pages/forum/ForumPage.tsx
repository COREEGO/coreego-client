import React from "react";
import { useLocation } from "react-router-dom";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Container, Pagination, Fab, Box, Grid, Typography, Button, Stack, IconButton, PaginationItem } from "@mui/material";
import useSWR from "swr";
import { useFilterContext } from "../../contexts/FilterProvider";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { ADD_ICON, EDIT_ICON, FILTER_ICON, FORUM_ICON } from "../../utils/icon";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import LoadingPage from "../../components/LoadingPage";
import { ButtonBlueUx } from "../../components/buttons/ButtonBlueUx";
import blob from '../../images/svgs/forum-blob.svg'
import { FORUM_RESUME } from "../../utils/variables";
import SearchFilter from "../components/filters/SearchFilter";
import ModalWrapper from "../../components/Modals/ModalWraper";
import FilterButton from "../../components/buttons/FilterButton";
import DefaultButton from "../../components/buttons/DefaultButton";


const ForumPage: React.FC = () => {

    const { updateFilter, searchParams } = useFilterContext();

    const location = useLocation();

    const { data, isLoading, error } = useSWR(`/discussions${location.search}`);

    if (error) console.error('API ERROR:', error);

    const { discussionCategories } = useSelector((state: any) => state.app)

    return (
        <Container>
            <Stack>
                <Box role="header" py={5} height={{ xs: 'auto', md: 400 }}>
                    <Grid container sx={{ height: '100%' }} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" fontWeight="bold" component="h1" ><FORUM_ICON fontSize="large" sx={{ mr: 2 }} />Forum</Typography>
                            <Typography sx={{ whiteSpace: 'pre-line' }} my={2} variant="h6" component="p" color="var(--grey-bold)">
                                {FORUM_RESUME}
                            </Typography>
                            <ButtonBlueUx
                                options={{
                                    endIcon: <ADD_ICON />
                                }}
                            >Créer une discussion</ButtonBlueUx>
                        </Grid>
                        <Grid
                            sx={{
                                backgroundImage: `url(${blob})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                height: '100%',
                                width: '100%',
                                display: { xs: 'none', md: 'flex' }
                            }}
                            alignItems="center"
                            justifyContent="center"
                            item xs={12} md={6}>
                            <Box borderRadius={5} sx={{ height: 250, width: 400 }}>
                                <img height="100%" width="100%" style={{ borderRadius: 5, objectFit: 'cover', objectPosition: 'center' }} src={HEADER_IMG} alt="" />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Stack direction="row" spacing={1}>
                        <SearchFilter />
                        <ModalWrapper
                            id="filtres"
                            title={<><FILTER_ICON /> Filtres</>}
                            renderButton={(onOpen) => (
                                <DefaultButton onClick={onOpen}>
                                    <FILTER_ICON sx={{ color: 'var(--coreego-blue)' }} />
                                </DefaultButton>
                            )}
                            renderBody={() => {
                                return <FormControl>
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
                            }
                            }
                        />
                    </Stack>
                </Box>
                {
                    isLoading ? <Box my={5}><LoadingPage type="data" /></Box> : <FeedList
                        fetchData={data}
                        noLengthLabel="Aucune discussions"
                        cardName="discussion"
                        breackpoints={{ xs: 12 }}
                    />
                }
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                    <Pagination
                        page={Number(searchParams.get('page')) || 1}
                        onChange={(event: React.ChangeEvent<any>, value: number) => updateFilter('page', value.toString())}
                        count={data?.meta.last_page || 0}
                        variant="outlined"
                        renderItem={(item) => (
                            <PaginationItem
                                sx={{
                                    backgroundColor: 'white',
                                    borderColor: 'var(--mui-light)',
                                    '&:hover': {
                                        borderColor: 'var(--mui-light)',
                                        boxShadow: 'var(--box-shadow)',
                                    }
                                }}
                                {...item}
                            />
                        )}
                    />
                </Box>
            </Stack>
        </Container>
    );
};

export default ForumPage;
