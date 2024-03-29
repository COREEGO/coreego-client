import HEADER_IMG from "../../images/headers/han-gang.jpg";
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
import { MARKETPLACE_DESCRIPTION } from "../../utils";
import NotFindComponent from "../../components/NotFindComponent";

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
				description={MARKETPLACE_DESCRIPTION}
				imageLink={HEADER_IMG}
				buttonLabel="Vendre un produit"
				buttonLink="/market-place/produit/creation"
				imageDirection="start"
			/>

			<ProductsFilter data={products?.meta} />

			{isLoading ? (
				<LoadingPage type="data" />
			) : (
				<Box my={5}>
					{products.data.length ? (
						<Grid container spacing={2}>
							{products.data.map((product) => {
								return (
									<Grid key={product.id} item xs={12} sm={6} md={4}>
										<NavLink
											to={`/market-place/produit/${product.slug}`}
										>
											<ProductCard product={product} />
										</NavLink>
									</Grid>
								);
							})}
						</Grid>
					) : (
						<NotFindComponent showText width="100%" height={300} />
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
