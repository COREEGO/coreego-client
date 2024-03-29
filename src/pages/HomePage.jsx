import {
	Box,
	Button,
	Chip,
	Container,
	Grid,
	Hidden,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, redirect } from "react-router";
import HeroBannerFeed from "./components/templates/HeroBannerFeed";
import {
	EXPLORE_DESCRIPTION,
	FORUM_DESCRIPTION,
	MARKETPLACE_DESCRIPTION
} from "../utils";
import HEADER_IMG from "../images/headers/espace-discussion.jpg";
import LOGO from "../images/svgs/coreego-logo.svg";
import { CIRCLE_ICON } from "../utils/icon";
import HERO_BANNER_IMG from "../images/18948481884.jpg";
import TitleSectionText from "../components/texts/TitleSectionText";
import axios from "axios";
import LoadingPage from "../components/LoadingPage";
import DiscussionCard from "../components/card/DiscussionCard";
import ProductCard from "../components/card/ProductCard";
import { NavLink } from "react-router-dom";
import PlaceCard from "../components/card/PlaceCard";
import NotFindComponent from "../components/NotFindComponent";

const HomePage = () => {
	const [isLoaded, setIsLoaded] = React.useState(false);

	const [discussions, setDiscussions] = React.useState([]);
	const [places, setPlaces] = React.useState([]);
	const [products, setProducts] = React.useState([]);

	React.useEffect(() => {
		loadingPage();
	}, []);

	const loadingPage = async () => {
		try {
			const response = await axios.get("/home");
			setDiscussions(response?.data?.discussions);
			setPlaces(response?.data?.places);
			setProducts(response?.data?.products);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoaded(true);
		}
	};

	return !isLoaded ? (
		<LoadingPage type="page" />
	) : (
		<React.Fragment>
			<Box py={5} bgcolor="#F5F7FA">
				<Container>
					<Grid container spacing={5} alignItems="center">
						<Grid item xs={12} md={6}>
							<Typography
								gutterBottom
								variant="h3"
								color="var(--coreego-blue)"
								fontWeight="bold"
								component="h1"
							>
								Site communautaire <br />
								<span style={{ color: "black" }}> 100%</span>
								<span style={{ color: "var(--coreego-red)" }}>
									{" "}
									Corée Du Sud
								</span>
							</Typography>
							<Typography>
								Venez interagir avec la communauté francophone en
								Corée Du Sud
							</Typography>
							<Stack mt={3} direction="row" gap={1}>
								<NavLink to="/login">
									<Button variant="contained">Se connecter</Button>
								</NavLink>
								<NavLink to="/register">
									<Button variant="outlined">Créer un compte</Button>
								</NavLink>
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}>
							<Hidden mdDown>
								<Box height={350} width="100%">
									<img
										style={{
											boxShadow: "15px 15px 4px var(--coreego-red)",
											objectFit: "cover",
											objectPosition: "bottom"
										}}
										height="100%"
										width="100%"
										src={HERO_BANNER_IMG}
										alt=""
									/>
								</Box>
							</Hidden>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box py={5}>
				<Container>
					<Grid container spacing={5} alignItems="center">
						<Grid item xs={12} md={5}>
							<Stack gap={2} alignItems="flex-start">
								<Stack spacing={2}>
									<Stack
										direction="row"
										alignItems="baseline"
										gap={2}
										flexWrap="wrap"
									>
										<Typography
											variant="h3"
											color="var(--coreego-blue)"
											fontWeight="bold"
											component="h2"
										>
											Forum
										</Typography>
										<Typography
											variant="h4"
											fontWeight="bold"
											component="span"
											color="var(--coreego-red)"
										>
											포럼
										</Typography>
									</Stack>
								</Stack>
								<Typography
									component="p"
									fontWeight="normal"
									variant="h6"
								>
									{FORUM_DESCRIPTION}
								</Typography>
								<NavLink to="/forum">
									<Button variant="contained">Voir plus</Button>
								</NavLink>
							</Stack>
						</Grid>
						<Grid item xs={12} md={7}>
							<Chip
								variant="outlined"
								color="error"
								sx={{ fontWeight: "bold" }}
								label="Dernières discussions"
							/>
							{discussions?.length ? (
								<Grid
									container
									mt={0}
									spacing={2}
									alignItems="center"
									justifyContent="center"
								>
									{discussions.map((discussion) => {
										return (
											<Grid key={discussion.id} item xs={12} sm={6}>
												<NavLink
													to={`/forum/discussion/${discussion.slug}`}
												>
													<DiscussionCard discussion={discussion} />
												</NavLink>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<NotFindComponent mt={3} width="100%" height={300} />
							)}
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box py={5} bgcolor="grey.50">
				<Container>
					<Grid container spacing={5} flexDirection="row-reverse" alignItems="center">
						<Grid item xs={12} md={5}>
							<Stack gap={2} alignItems="flex-start">
								<Stack spacing={2}>
									<Stack
										direction="row"
										alignItems="baseline"
										gap={2}
										flexWrap="wrap"
									>
										<Typography
											variant="h3"
											color="var(--coreego-blue)"
											fontWeight="bold"
											component="h2"
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
								</Stack>
								<Typography
									component="p"
									fontWeight="normal"
									variant="h6"
								>
									{MARKETPLACE_DESCRIPTION}
								</Typography>
								<NavLink to="/market-place">
									<Button variant="contained">Voir plus</Button>
								</NavLink>
							</Stack>
						</Grid>
						<Grid item xs={12} md={7}>
							<Chip
								variant="outlined"
								color="primary"
								sx={{ fontWeight: "bold" }}
								label="Derniers produits en vente"
							/>
							{products?.length ? (
								<Grid
									container
									mt={0}
									spacing={2}
									alignItems="center"
									justifyContent="center"
								>
									{products.map((product) => {
										return (
											<Grid item xs={12} sm={6}>
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
                                <NotFindComponent mt={3} width="100%" height={300} />
							)}
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box py={5}>
				<Container>
					<Grid container spacing={5} alignItems="center">
						<Grid item xs={12} md={5}>
							<Stack gap={2} alignItems="flex-start">
								<Stack spacing={2}>
									<Stack
										direction="row"
										alignItems="baseline"
										gap={2}
										flexWrap="wrap"
									>
										<Typography
											variant="h3"
											color="var(--coreego-blue)"
											fontWeight="bold"
											component="h2"
										>
											Explorer
										</Typography>
										<Typography
											variant="h4"
											fontWeight="bold"
											component="span"
											color="var(--coreego-red)"
										>
											탐구하기
										</Typography>
									</Stack>
								</Stack>
								<Typography
									component="p"
									fontWeight="normal"
									variant="h6"
								>
									{EXPLORE_DESCRIPTION}
								</Typography>
								<NavLink to="/explorer">
									<Button variant="contained">Voir plus</Button>
								</NavLink>
							</Stack>
						</Grid>
						<Grid item xs={12} md={7}>
							<Chip
								variant="outlined"
								color="error"
								sx={{ fontWeight: "bold" }}
								label="Derniers lieux publiés"
							/>
							{places?.length ? (
								<Grid
									container
									mt={0}
									spacing={2}
									alignItems="center"
									justifyContent="center"
								>
									{places.map((place) => {
										return (
											<Grid key={place.id} item xs={12} sm={6}>
												<NavLink
													to={`/explorer/lieu/${place.slug}`}
												>
													<PlaceCard place={place} />
												</NavLink>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<NotFindComponent mt={3} width="100%" height={300} />
							)}
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box bgcolor="grey.50" py={5}>
				<Container>
						<Grid container gap={5}>
								<Grid item xs={12} sm={6}>
										<TitleSectionText startText="message du" endText="createur" />
										<Box mt={3}>
										<Typography>eorkopj</Typography>
										</Box>
								</Grid>
								<Grid item xs={12} sm={6}>

								</Grid>
						</Grid>
				</Container>
			</Box>



		</React.Fragment>
	);
};

export default HomePage;
