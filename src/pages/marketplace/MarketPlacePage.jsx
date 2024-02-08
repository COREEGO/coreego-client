import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import SearchFilter from "../components/filters/SearchFilter";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from "../../images/headers/espace-discussion.jpg";
import AsideFeedSection from "../../components/dom-section/AsideFeedSection";
import { BsFillPlusCircleFill, BsFilter } from "react-icons/bs";
import FilterModal from "../../components/Modals/FilterModal";
import SectionModal from "../../components/Modals/_SectionModal";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import SelectInput from "../../components/inputs/SelectInput";
import { useFilterContext } from "../../contexts/FilterProvider";
import ModalWrapper from "../../components/Modals/ModalWraper";
import RadioGroupInput from "../../components/inputs/RadioGroupInput";
import {
	FILTER_ICON,
	EDIT_ICON,
	ADD_ICON,
	CLOSE_ICON
} from "../../utils/icon";
import TitleText from "../../components/texts/TitleText";
import { NavLink, useLocation } from "react-router-dom";
import useSWR from "swr";
import {
	Box,
	Container,
	Typography,
	Grid,
	Pagination,
	Stack,
	DialogContent,
	MenuItem,
	Select,
	Hidden,
	Card,
	CardContent,
	Slider,
	FormGroup,
	FormLabel,
	DialogTitle,
	Dialog,
	IconButton,
	PaginationItem
} from "@mui/material";
import LoadingPage from "../../components/LoadingPage";
import React, { useEffect } from "react";
import RedButton from "../../components/buttons/RedButton";
import { BlueButton } from "../../components/buttons/BlueButton";
import SearchInput from "../../components/inputs/SearchInput";
import DoubleSliderInput from "../../components/inputs/DoubleSliderInput";
import ProductCard from "../../components/card/ProductCard";

const SwrData = ({ products }) => {
	return (
		<>
			{products.length ? (
				<Grid container spacing={3}>
					{products.map((product) => {
						return (
							<Grid key={product.id} item xs={12} sm={6} md={4}>
								<NavLink to="/">
								<ProductCard product={product} />
								</NavLink>
							</Grid>
						);
					}

					)}
				</Grid>
			) : (
				<Typography align="center">
					Aucun produit trouvé
				</Typography>
			)}
		</>
	);
};


const MarketPlacePage = () => {
	const { updateFilter, searchParams } = useFilterContext();
	const location = useLocation();
	const [isOpenFilterModal, setIsOpenFilterModal] = React.useState(
		false
	);

	const { data: products, isLoading, error } = useSWR(
		`/products${location.search}`
	);

	if (error) console.error("API ERROR:", error);

	return (
		<React.Fragment>
			<Box className="hero_banner">
				<Container>
					<Grid container alignItems="center">
						<Grid
							item
							xs={12}
							md={6}
							justifyContent="flex-start"
							sx={{ display: { xs: "none", md: "flex" } }}
						>
							<img
								height={350}
								width={350}
								style={{
									boxShadow: "-20px 20px 4px var(--coreego-blue)",
									marginLeft: 20,
									marginBottom: 20,
									borderRadius: 5,
									objectFit: "cover",
									objectPosition: "center"
								}}
								src={HEADER_IMG}
								alt=""
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Stack
								width={500}
								maxWidth="100%"
								spacing={3}
								alignItems="flex-start"
							>
								<Stack spacing={1}>
									<Stack
										direction="row"
										alignItems={"baseline"}
										gap={1}
										flexWrap="wrap"
									>
										<Typography
											variant="h3"
											color="var(--coreego-blue)"
											fontWeight="bold"
											component="h1"
										>
											Marketplace
										</Typography>
										<Typography
											variant="h4"
											fontWeight="bold"
											component="span"
											color="var(--coreego-red)"
										>
											마켓 플레이스
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
								<BlueButton
									size="large"
									variant="contained"
									startIcon={<ADD_ICON />}
								>
									Vendre un produit
								</BlueButton>
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Box mb={5}>
				<Container>
					<Grid container spacing={3}>
						<Grid item xs={12} md={3}>
						<Hidden smDown>
							<Card>
								<CardContent>
									<Stack gap={3}>
										<Typography
											fontWeight="bold"
											component="span"
											display="flex"
											alignItems="center"
										>
											<FILTER_ICON
												fontSize="small"
												sx={{ mr: 1 }}
											/>{" "}
											Filtres
										</Typography>
										<Stack gap={3}>
											<SearchInput
												fullWidth
												placeholder="Rechercher un produit..."
												defaultValue={searchParams.get("q")}
												onChange={value => updateFilter("q", value)}
											/>

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
											<FormGroup>
												<FormLabel sx={{mb: 1}}>Prix</FormLabel>

												<DoubleSliderInput
														rangeValue={[
																products?.data.filter.min_price || '0',
																products?.data.filter.max_price || '10',
															]}
															defaultValue={[
																searchParams.get("min_price") || 0,
																searchParams.get("max_price") || 0
															]}
														onChange={values => {
															if(values && Array.isArray(values)){
																updateFilter('min_price', values[0].toString())
																updateFilter('max_price', values[1].toString())
															}
														} }
														/>

											</FormGroup>
										</Stack>
									</Stack>
								</CardContent>
							</Card>
							</Hidden>
							<Hidden smUp>
							<Box>
							<BlueButton
								fullWidth
								onClick={() => setIsOpenFilterModal(true)}
								size="large"
								variant="outlined"
								startIcon={<FILTER_ICON />}
							>Filtres
							</BlueButton>
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
								<Stack gap={3}>
											<SearchInput
												fullWidth
												placeholder="Rechercher un produit..."
												defaultValue={searchParams.get("q")}
												onChange={value => updateFilter("q", value)}
											/>

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
											<FormGroup>
												<FormLabel>Prix</FormLabel>

												<DoubleSliderInput
														rangeValue={[
																products?.data.filter.min_price || '0',
																products?.data.filter.max_price || '10',
															]}
															defaultValue={[
																searchParams.get("min_price") || 0,
																searchParams.get("max_price") || 0
															]}
														onChange={values => {
															if(values && Array.isArray(values)){
																updateFilter('min_price', values[0].toString())
																updateFilter('max_price', values[1].toString())
															}
														} }
														/>
											</FormGroup>
										</Stack>
								</DialogContent>
							</Dialog>
							</Box>
							</Hidden>
						</Grid>
						<Grid item xs={12} md={9}>
							{isLoading
								? <LoadingPage type="data" />
								: <SwrData products={products.data.data} />
								}
								<Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <Pagination
                    page={Number(searchParams.get("page")) || 1}
                    onChange={(_event, value) =>
                        updateFilter("page", value.toString())}
                        count={products?.meta.last_page || 0}
                                variant="contained"
                        renderItem={item => <PaginationItem {...item} />}
                />
			</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* <NavLink to="/market-place/product/create">
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
                title={"Market place"}
                renderBody={() =>
                (
                    <Stack sx={{ width: 500, maxWidth: '100%' }}>
                        <FormControl fullWidth>
                            <FormLabel sx={{mb: 2}}>Localisation</FormLabel>
                            <CityDistrictSelectInput
                                cityValue={searchParams.get('city') || ''}
                                districtValue={searchParams.get('district') || ''}
                                updateCity={(e: any) => updateFilter('city', e.toString())}
                                updateDistrict={(e: any) => updateFilter('district', e.toString())}
                            />
                        </FormControl>
                    </Stack>
                )
                }
            />
            <Container maxWidth="lg">
                {
                    !isLoading ? <FeedList
                        fetchData={data}
                        noLengthLabel="Aucun produit"
                        cardName="product"
                        breackpoints={{ xs: 12, sm: 6, md: 3 }}
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
            </Container> */}
		</React.Fragment>
	);
};

export default MarketPlacePage;
