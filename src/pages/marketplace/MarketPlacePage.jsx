import HEADER_IMG from "../../images/headers/han-gang.jpg";
import { NavLink, useLocation } from "react-router-dom";
import useSWR from "swr";
import { Box, Container, Grid } from "@mui/material";
import LoadingPage from "../../components/LoadingPage";
import ProductCard from "../../components/card/ProductCard";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import PaginationData from "../../components/PaginationData";
import ProductsFilter from "../components/filters/ProductsFilter";
import { MARKETPLACE_DESCRIPTION } from "../../utils";
import NotFoundComponent from "../../components/NotFoundComponent";
import { Helmet } from "react-helmet";

const MarketPlacePage = () => {
	const location = useLocation();

	const {
		data: products,
		isLoading,
		error
	} = useSWR(`/products${location.search}`);

	if (error) console.error("API ERROR:", error);

	return (
		<Container>
			<Helmet>
				<title>Marketplace | Coreego</title>
				<meta
					name="title"
					content="Vendez vos articles sur Coreego"
				/>
				<meta
					name="keywords"
					content="marketplace, corée du sud, produit coréen, coreego"
				/>
				<meta
					name="description"
					content={MARKETPLACE_DESCRIPTION.slice(0, 150)}
				/>
			</Helmet>

			<HeroBannerFeed
				theme="blue"
				titleFr="Marketplace"
				titleKr="마켓 플레이스"
				description={MARKETPLACE_DESCRIPTION}
				imageLink={HEADER_IMG}
				buttonLabel="Vendre un produit"
				buttonLink="/marketplace/produit/creation"
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
											to={`/marketplace/produit/${product.slug}`}
										>
											<ProductCard product={product} />
										</NavLink>
									</Grid>
								);
							})}
						</Grid>
					) : (
						<NotFoundComponent showText width="100%" height={300} />
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
