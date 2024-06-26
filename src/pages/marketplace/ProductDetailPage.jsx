import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import KakaoMap from "../../components/maps/KakaoMap";
import { belongsToAuth } from "../../utils";
import { GPS_ICON, MAIL_ICON, MARKER_ICON } from "../../utils/icon";
import { useAuthContext } from "../../contexts/AuthProvider";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Stack,
	Typography
} from "@mui/material";
import SimpleSlider from "../../components/swipers/SimpleSlider";
import { AVATAR_PATH, goToKakaoMapByLatLong } from "../../utils/variables";
import TitleSectionText from "../../components/texts/TitleSectionText";
import axios from "axios";
import ShareButton from "../../components/buttons/ShareButton";
import OptionPublicationButton from "../../components/buttons/OptionPublicationButton";
import ReportModule from "../components/modules/ReportModule";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const ProductDetail = () => {
	const params = useParams();
	const { auth } = useAuthContext();
	const [product, setProduct] = useState(null);
	const [isLoaded, setIdLoaded] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		loadProduct();
	}, []);

	const loadProduct = async () => {
		try {
			const response = await axios.get(`/products/${params.slug}`);
			if (!response.data) {
				navigate("*");
			}
			setProduct(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIdLoaded(true);
		}
	};

	return isLoaded ? (
		<React.Fragment>
			<Helmet>
                <title>Nouveau produit | Coreego</title>
            </Helmet>
			<Box className="hero_banner">
				<Box py={5}>
					<Container>
						<Grid
							container
							alignItems="center"
							spacing={{ xs: 8, md: 0 }}
						>
							<Grid
								item
								xs={12}
								md={6}
								alignItems="center"
								justifyContent="center"
								display="flex"
							>
								<Box
									sx={{
										boxShadow: "-15px 15px 4px var(--coreego-blue)",
										height: 350,
										width: 350,
										maxWidth: "100%"
									}}
								>
									<SimpleSlider
										title={product?.title}
										images={product?.images}
									/>
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<Stack spacing={3} alignItems="flex-start">
									<Typography
										color="var(--coreego-blue)"
										sx={{ wordBreak: "break" }}
										variant="h3"
										component="h1"
										fontWeight="inherit"
									>
										{product.title}
									</Typography>
									<Typography whiteSpace="pre-line" fontSize={18}>
										{product.description}
									</Typography>
									<Typography
										component="p"
										variant="h6"
										fontWeight="bold"
										noWrap
									>
										₩ {product.price}
									</Typography>
									<Stack
										direction="row"
										alignItems="center"
										spacing={1}
									>
										<Avatar
											sx={{ width: 40, height: 40 }}
											src={AVATAR_PATH + product?.user?.avatar}
										/>
										<NavLink
											to={`/user/profil/${product?.user?.slug}`}
										>
											<Typography fontWeight="bold">
												{product?.user?.pseudo}
											</Typography>
										</NavLink>
										{belongsToAuth(product.user.id, auth?.id) ? (
											<OptionPublicationButton
												editLink={`/marketplace/produit/modification/${product.slug}`}
												deleteUrl={`/products/${product.id}`}
												redirectionUrl={"/marketplace"}
											/>
										) : (
											<ReportModule
												placeholder="En quoi ce produit ne convient pas ?"
												targetElement="product_reported_id"
												targetValue={product.id}
											/>
										)}
									</Stack>

									{auth ? (
										<a
											href={`mailto:${product.user.email}?subject=Coreego:Renseignement sur votre produit - ${product.title}`}
										>
											<Button
												startIcon={<MAIL_ICON />}
												variant="contained"
											>
												Contacter le vendeur
											</Button>
										</a>
									) : (
										<Button
											startIcon={<MAIL_ICON />}
											variant="contained"
											onClick={() => navigate("/login")}
										>
											Contacter le vendeur
										</Button>
									)}
									<ShareButton />
								</Stack>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>
			<Box mb={5}>
				<Container>
					<Stack spacing={3}>
						<TitleSectionText
							startText="Localisation"
							endText="de la vente"
						/>
						<NavLink to={`/marketplace?city=${product.city.id}&district=${product.district.id}`}>
						<Typography display="inline-flex" alignItems="center" gap={1}>
							<MARKER_ICON />
							{product?.city?.label}, {product?.district?.label}
						</Typography>
						</NavLink>
						<Box
							sx={{
								height: { xs: 250, sm: 300, md: 400 },
								width: "100%",
								maxWidth: "100%",
								boxShadow: "-15px 15px 4px var(--coreego-red)"
							}}
						>
							<KakaoMap
								lat={product?.district?.latitude}
								lng={product?.district?.longitude}
								withCircle
							/>
						</Box>
					</Stack>
				</Container>
			</Box>
		</React.Fragment>
	) : (
		<LoadingPage type="page" />
	);
};

export default ProductDetail;
