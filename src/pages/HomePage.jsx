import {
	Box,
	Button,
	Chip,
	Container,
	Grid,
	Hidden,
	Stack,
	Typography
} from "@mui/material";
import React from "react";
import {
	EXPLORE_DESCRIPTION,
	FORUM_DESCRIPTION,
	MARKETPLACE_DESCRIPTION,
	RESUME_COREEGO
} from "../utils";
import HERO_BANNER_IMG from "../images/headers/korea-flag.webp";
import TitleSectionText from "../components/texts/TitleSectionText";
import axios from "axios";
import LoadingPage from "../components/LoadingPage";
import DiscussionCard from "../components/card/DiscussionCard";
import ProductCard from "../components/card/ProductCard";
import { NavLink } from "react-router-dom";
import PlaceCard from "../components/card/PlaceCard";
import NotFoundComponent from "../components/NotFoundComponent";
import YOANN_LOGO from "../images/yoann.webp";
import { Helmet } from "react-helmet";
import { useAuthContext } from "../contexts/AuthProvider";

const HomePage = () => {
	const [isLoaded, setIsLoaded] = React.useState(false);

	const [discussions, setDiscussions] = React.useState([]);
	const [places, setPlaces] = React.useState([]);
	const [products, setProducts] = React.useState([]);

	const { auth } = useAuthContext();

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
			<Helmet>
				<title>
					Plateforme communautaire francophone dédiée à la Corée du
					Sud | Coreego
				</title>
				<meta
					name="title"
					content="Plateforme communautaire francophone dédiée à la Corée du Sud."
				/>
				<meta
					name="keywords"
					content="Plateforme communautaire, Corée Du Sud, forum, marketplace, explorer, voyager en corée du sud"
				/>
				<meta
					name="description"
					content="Coreego est une plateforme communautaire dédiée à la Corée Du Sud, Venez interagir avec la communauté francophone en Corée Du Sud"
				/>
			</Helmet>

			<Box py={5} bgcolor="#F5F7FA">
				<Container>
					<Grid container spacing={5} alignItems="center">
						<Grid item xs={12} md={6}>
							<Typography
								gutterBottom
								variant="h4"
								color="var(--coreego-blue)"
								fontWeight="bold"
								component="h1"
							>
								Plateforme communautaire francophone <br />
								<span style={{ color: "var(--coreego-red)" }}>
									{" "}
									dédiée à la Corée du Sud
								</span>
							</Typography>
							<Typography>
								Venez interagir avec la communauté francophone en
								Corée Du Sud
							</Typography>
							{!Boolean(auth) && (
								<Stack mt={3} direction="row" gap={1}>
									<NavLink to="/login">
										<Button variant="contained">Se connecter</Button>
									</NavLink>
									<NavLink to="/register">
										<Button variant="outlined">
											Créer un compte
										</Button>
									</NavLink>
								</Stack>
							)}
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
										alt="Plateforme communautaire francophone dédiée à la Corée du
										Sud | Coreego"
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
									whiteSpace="pre-line"
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
								<NotFoundComponent mt={3} width="100%" height={300} />
							)}
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box py={5} bgcolor="grey.50">
				<Container>
					<Grid
						container
						spacing={5}
						flexDirection="row-reverse"
						alignItems="center"
					>
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
									whiteSpace="pre-line"
								>
									{MARKETPLACE_DESCRIPTION}
								</Typography>
								<NavLink to="/marketplace">
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
											<Grid key={product.id} item xs={12} sm={6}>
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
								<NotFoundComponent mt={3} width="100%" height={300} />
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
									whiteSpace="pre-line"
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
												<NavLink to={`/explorer/lieu/${place.slug}`}>
													<PlaceCard place={place} />
												</NavLink>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<NotFoundComponent mt={3} width="100%" height={300} />
							)}
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box bgcolor="grey.50" py={5}>
				<Container>
					<Grid container spacing={5}>
						<Grid item xs={12} md={6}>
							<TitleSectionText
								startText="message du"
								endText="fondateur"
							/>
							<Box mt={0}>
								<Typography
									component="p"
									fontWeight="normal"
									variant="h6"
									whiteSpace="pre-line"
								>
									{RESUME_COREEGO}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Stack width="100%" alignItems="center">
								<img
									src={YOANN_LOGO}
									alt="Yoann Piard"
									width="auto"
									style={{ maxWidth: "100%", maxHeight: 500 }}
								/>
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default HomePage;
