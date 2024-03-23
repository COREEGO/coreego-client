import HEADER_IMG from "../../images/headers/espace-discussion.jpg";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import { useFilterContext } from "../../contexts/FilterProvider";
import { FILTER_ICON, CLOSE_ICON } from "../../utils/icon";
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
import ProductsFilter from "../components/filters/ProductsFilter";

const MarketPlacePage = () => {
	const { updateFilter, searchParams } = useFilterContext();
	const location = useLocation();
	const [isOpenFilterModal, setIsOpenFilterModal] =
		React.useState(false);

	const {
		data: products,
		isLoading,
		error
	} = useSWR(`/products${location.search}`);

	if (error) console.error("API ERROR:", error);

	return (
		<Container>
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

			<ProductsFilter data={products?.data} />

			{isLoading ? (
				<LoadingPage type="data" />
			) : (
				<Box my={5}>
					{products.data.data.length ? (
						<Grid container spacing={2}>
							{products.data.data.map((product) => {
								return (
									<Grid key={product.id} item xs={12} sm={6} md={4}>
										<NavLink
											to={`/market-place/product/${product.slug}`}
										>
											<ProductCard product={product} />
										</NavLink>
									</Grid>
								);
							})}
						</Grid>
					) : (
						<Typography align="center">
							Aucun produit trouvé
						</Typography>
					)}
				</Box>
			)}
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					my: 5
				}}
			>
				<PaginationData lastPage={products?.meta.last_page} />
			</Box>
		</Container>
	);
};

export default MarketPlacePage;
