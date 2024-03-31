import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import KakaoMap from "../../components/maps/KakaoMap";
import { belongsToAuth } from "../../utils";
import { MAIL_ICON, MARKER_ICON } from "../../utils/icon";
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
import { AVATAR_PATH } from "../../utils/variables";
import TitleSectionText from "../../components/texts/TitleSectionText";
import axios from "axios";
import ShareButton from "../../components/buttons/ShareButton";
import OptionPublicationButton from "../../components/buttons/OptionPublicationButton";
import ReportModule from "../components/modules/ReportModule";

const ProductDetail = () => {
	const params = useParams();
	const { user } = useAuthContext();
	const [product, setProduct] = useState(null);
	const [isLoaded, setIdLoaded] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		loadProduct();
	}, []);

	const loadProduct = async () => {
		try {
			const response = await axios.get(`/products/${params.slug}`);
			setProduct(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIdLoaded(true);
		}
	};

	return isLoaded ? (
		<React.Fragment>
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
									<SimpleSlider images={product?.images} />
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
										<Typography fontWeight="bold">
											{product?.user?.pseudo}
										</Typography>
										{belongsToAuth(product.user.id, user?.id) ? (
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

									{user ? (
										<a
											href={`mailto:${product.user.email}?subject=Coreego: Renseignement sur votre produit - ${product.title}`}
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
						<Typography display="flex" alignItems="center">
							<MARKER_ICON sx={{ mr: 1 }} />
							{product?.city?.label},{product?.district?.label}
						</Typography>
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
