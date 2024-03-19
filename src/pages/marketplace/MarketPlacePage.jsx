import HEADER_IMG from "../../images/headers/espace-discussion.jpg";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import { useFilterContext } from "../../contexts/FilterProvider";
import {
	FILTER_ICON,
	CLOSE_ICON
} from "../../utils/icon";
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
	Hidden,
	Card,
	CardContent,
	FormGroup,
	FormLabel,
	DialogTitle,
	Dialog,
	IconButton,
	PaginationItem,
	Button
} from "@mui/material";
import LoadingPage from "../../components/LoadingPage";
import React from "react";
import SearchInput from "../../components/inputs/SearchInput";
import DoubleSliderInput from "../../components/inputs/DoubleSliderInput";
import ProductCard from "../../components/card/ProductCard";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import PaginationData from "../../components/PaginationData";


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
			<HeroBannerFeed
				theme="blue"
				titleFr="Marketplace"
				titleKr="마켓 플레이스"
				description="
				MACC Essentials has an important role in making
				supplies and services available to customers and
				their patients during this critical time. This
				includes services from various domains. Our aim is
				to aid you. As much we can.
				"
				imageLink={HEADER_IMG}
				buttonLabel="Vendre un produit"
				buttonLink="/market-place/product/create"
				imageDirection="start"
			/>
			<Box>
				<Container>
					<Grid container spacing={5}>
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
												cityValue={searchParams.get("city") || ""}
												districtValue={
													searchParams.get("district") || ""
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
							<Button
								fullWidth
								onClick={() => setIsOpenFilterModal(true)}
								variant="outlined"
								startIcon={<FILTER_ICON />}
							>Filtres
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
									<Stack gap={2}>
												<SearchInput
													fullWidth
													placeholder="Rechercher un produit..."
													defaultValue={searchParams.get("q")}
													onChange={value => updateFilter("q", value)}
												/>

												<CityDistrictSelectInput
													cityValue={searchParams.get("city") || ""}
													districtValue={
														searchParams.get("district") || ""
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
								: <Box>
								{products.data.data.length ? (
									<Grid container spacing={2}>
										{products.data.data.map((product) => {
											return (
												<Grid key={product.id} item xs={12} sm={6} md={4}>
													<NavLink to={`/market-place/product/${product.slug}`}>
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
							</Box>
								}
								<Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
									<PaginationData lastPage={products?.meta.last_page} />
								</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default MarketPlacePage;
