import React from "react";
import { useSelector } from "react-redux";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from "../../images/headers/espace-discussion.jpg";
import AsideFeedSection from "../../components/dom-section/AsideFeedSection";
import { BsFillPlusCircleFill } from "react-icons/bs";
import FilterModal from "../../components/Modals/FilterModal";
import SectionModal from "../../components/Modals/_SectionModal";
import LocalisationCheckbox from "../../components/inputs/LocalisationCheckbox";
import { useFilterContext } from "../../contexts/FilterProvider";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import SelectInput from "../../components/inputs/SelectInput";
import AddNewTopikButton from "../../components/buttons/AddTopicButton";
import { NavLink, useLocation } from "react-router-dom";
import {
	ADD_ICON,
	CLOSE_ICON,
	EDIT_ICON,
	FILTER_ICON
} from "../../utils/icon";
import {
	Box,
	Container,
	Grid,
	Typography,
	Button,
	FormLabel,
	Pagination,
	Radio,
	RadioGroup,
	Stack,
	Hidden,
	Select,
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
    PaginationItem
} from "@mui/material";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import PlaceCard from "../../components/card/PlaceCard";
import { MenuItem } from "@chakra-ui/react";
import SearchInput from "../../components/inputs/SearchInput";

const SwrData = ({ places }) => {
	return (
		<Box my={5}>
			<Container>
				{places.length
					? <Grid container spacing={2}>
							{places.map(place => {
								return (
									<Grid key={place.id} item xs={12} md={4}>
										<NavLink to={`/voyage/place/${place.slug}`}>
											<PlaceCard place={place} />
										</NavLink>
									</Grid>
								);
							})}
						</Grid>
					: <Typography textAlign="center">
							Aucune lieu trouvé
						</Typography>}
			</Container>
		</Box>
	);
};

const TravelPage = () => {
	const { placeCategories, cities } = useSelector(state => state.app);

	const [isOpenFilterModal, setIsOpenFilterModal] = React.useState(
		false
	);

	const { updateFilter, searchParams } = useFilterContext();
	const location = useLocation();

	const { data: places, isLoading, error } = useSWR(
		`/places${location.search}`
	);

	if (error) console.error("API ERROR:", error);

	return (
		<React.Fragment>
			<Box className="hero_banner">
				<Container>
					<Grid container alignItems="center">
						<Grid item xs={12} md={6}>
							<Stack
								maxWidth="100%"
								spacing={2}
								alignItems="flex-start"
							>
								<Stack spacing={2}>
									<Stack
										direction="row"
										alignItems={"baseline"}
										gap={2}
										flexWrap="wrap"
									>
										<Typography
											variant="h3"
											color="var(--coreego-blue)"
											fontWeight="bold"
											component="h1"
										>
											Voyage
										</Typography>
										<Typography
											variant="h4"
											fontWeight="bold"
											component="span"
											color="var(--coreego-red)"
										>
											여행
										</Typography>
									</Stack>
									<Typography color="var(--grey-bold)">
										MACC Essentials has an important role in making
										supplies and services available to customers and
										their patients during this critical time. This
										includes services from various domains. Our aim is
										to aid you. As much we can.
									</Typography>
								</Stack>
								<Button
									color="error"
									variant="contained"
									startIcon={<ADD_ICON />}
								>
									Partager un lieu
								</Button>
							</Stack>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							justifyContent="flex-end"
							sx={{ display: { xs: "none", md: "flex" } }}
						>
							<img
								height={350}
								width={350}
								style={{
									boxShadow: "20px 20px 4px var(--coreego-red)",
									marginRight: 20,
									marginBottom: 20,
									borderRadius: 5,
									objectFit: "cover",
									objectPosition: "center"
								}}
								src={HEADER_IMG}
								alt=""
							/>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box>
				<Container>
					<Hidden smDown>
						<Stack
							direction="row"
							alignItems="flex-start"
							gap={2}
							flexWrap="wrap"
						>
							<SearchInput
								placeholder="Rechercher une discussion..."
								sx={{
									width: 300,
									maxWidth: "100%",
									backgroundColor: "white"
								}}
								defaultValue={searchParams.get("q")}
								onChange={value => updateFilter("q", value)}
							/>
							<Select
								sx={{
									width: "fit-content",
									backgroundColor: "white"
								}}
								placeholder="Catégorie"
								value={searchParams.get("category") || "0"}
								onChange={category =>
									updateFilter(
										"category",
										category.target.value.toString()
									)}
							>
								<MenuItem value="0"> Toutes les catégories </MenuItem>
								{placeCategories.map(category => {
									return (
										<MenuItem key={category.id} value={category.id}>
											{" "}{category.label}{" "}
										</MenuItem>
									);
								})}
							</Select>
							<Box>
								<CityDistrictSelectInput
									cityValue={searchParams.get("city") || "0"}
									districtValue={searchParams.get("district") || "0"}
									updateCity={e => updateFilter("city", e.toString())}
									updateDistrict={e =>
										updateFilter("district", e.toString())}
								/>
							</Box>
						</Stack>
					</Hidden>
					<Hidden smUp>
						<Box>
							<Button
								fullWidth
								onClick={() => setIsOpenFilterModal(true)}
								variant="outlined"
								startIcon={<FILTER_ICON />}
							>
								Filtres
							</Button>
							<Dialog
								onClose={() => setIsOpenFilterModal(false)}
								open={isOpenFilterModal}
							>
								<DialogTitle display="flex" alignItems="center">
									<FILTER_ICON sx={{ mr: 2 }} /> Filtres{" "}
								</DialogTitle>
								<IconButton
									aria-label="close"
									onClick={() => setIsOpenFilterModal(false)}
									sx={{
										position: "absolute",
										right: 8,
										top: 8
									}}
								>
									<CLOSE_ICON />
								</IconButton>
								<DialogContent dividers>
									<Stack direction="row" gap={2} flexWrap="wrap">
										<SearchInput
											fullWidth
											placeholder="Rechercher une discussion..."
											defaultValue={searchParams.get("q")}
											onChange={value => updateFilter("q", value)}
										/>
										<Select
											fullWidth
											placeholder="Catégorie"
											value={searchParams.get("category") || "0"}
											onChange={category =>
												updateFilter(
													"category",
													category.target.value.toString()
												)}
										>
											<MenuItem value="0">
												{" "}Toutes les catégories{" "}
											</MenuItem>
											{placeCategories.map(category => {
												return (
													<MenuItem
														key={category.id}
														value={category.id}
													>
														{" "}{category.label}{" "}
													</MenuItem>
												);
											})}
										</Select>
										<Box sx={{width: '100%'}}>
											<CityDistrictSelectInput
												cityValue={searchParams.get("city") || "0"}
												districtValue={
													searchParams.get("district") || "0"
												}
												updateCity={e =>
													updateFilter("city", e.toString())}
												updateDistrict={e =>
													updateFilter("district", e.toString())}
											/>
										</Box>
									</Stack>
								</DialogContent>
							</Dialog>
						</Box>
					</Hidden>
				</Container>
			</Box>
            {isLoading
				? <LoadingPage type="data" />
				: <SwrData places={places.data} />}
			<Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                <Pagination
                    page={Number(searchParams.get("page")) || 1}
                    onChange={(_event, value) =>
                        updateFilter("page", value.toString())}
                        count={places?.meta.last_page || 0}
                                variant="contained"
                        renderItem={item => <PaginationItem {...item} />}
                />
			</Box>
		</React.Fragment>
	);
	// {/* <NavLink to="/voyage/place/create">
	//     <Fab sx={{ position: 'fixed', bottom: 10, right: 10 }} color="success" aria-label="add">
	//         <EDIT_ICON />
	//     </Fab>
	// </NavLink>
	// <Box
	//     sx={{
	//         backgroundImage: `url(${HEADER_IMG})`,
	//         height: { xs: 150, md: 300 }, backgroundPosition: 'bottom', position: 'relative', backgroundSize: 'cover'
	//     }}>
	// </Box>
	// <AsideFeedSection
	//     title="Voyage"
	//     renderBody={() => (
	//         <Stack spacing={2} sx={{ width: 500, maxWidth: '100%' }}>
	//             <FormControl fullWidth>
	//                 <FormLabel sx={{ mb: 2 }}>Localisation</FormLabel>
	//                 <CityDistrictSelectInput
	//                     cityValue={searchParams.get('city') || ''}
	//                     districtValue={searchParams.get('district') || ''}
	//                     updateCity={(e: any) => updateFilter('city', e.toString())}
	//                     updateDistrict={(e: any) => updateFilter('district', e.toString())}
	//                 />
	//             </FormControl>
	//             <FormControl>
	//                 <FormLabel id="demo-radio-buttons-group-label">Catégories</FormLabel>
	//                 <RadioGroup
	//                     row
	//                     aria-labelledby="demo-radio-buttons-group-label"
	//                     name="radio-buttons-group"
	//                     onChange={(event: any) => updateFilter('category', event.target.value)}
	//                 >
	//                     <FormControlLabel checked={!searchParams.get('category')} value={''} control={<Radio />} label="Toutes les catégories" />
	//                     {
	//                         placeCategories.map((category: any) => {
	//                             return (
	//                                 <FormControlLabel checked={searchParams.get('category') == category.id} key={category.id} value={category.id} control={<Radio />} label={category.label} />
	//                             )
	//                         })
	//                     }
	//                 </RadioGroup>
	//             </FormControl>
	//         </Stack>
	//     )}
	// />
	// <Container maxWidth="lg">
	//     {
	//         !isLoading ? <FeedList
	//             fetchData={data}
	//             noLengthLabel="Aucun lieu"
	//             cardName="place"
	//             breackpoints={{ xs: 12, sm: 6, md: 4 }}
	//         /> : <Box my={5}><LoadingPage type="data" /></Box>
	//     }
	// </Container>
	// <Container maxWidth="lg" sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
	//     <Pagination
	//         page={Number(searchParams.get('page')) || 1}
	//         onChange={(event: React.ChangeEvent<unknown>, value: number) => updateFilter('page', value.toString())}
	//         count={data?.meta.last_page || 0}
	//         variant="outlined"
	//         shape="rounded"
	//     />
	// </Container> */}
};

export default TravelPage;
