import { useParams } from "react-router";
import useSWR from "swr";
import React, { Suspense, useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import { BsMessenger, BsXLg } from "react-icons/bs";
import ThumbSwiper from "../../components/swipers/ThumbSwiper";
import { NavLink } from "react-router-dom";
import TitleText from "../../components/texts/TitleText";
import KakaoMap from "../../components/maps/KakaoMap";
import UserSniped from "../../components/react-ux/UserSniped";
import LocalisationText from "../../components/texts/LocalisationText";
import PriceText from "../../components/texts/PriceText";
import { belongsToAuth } from "../../utils";
import {
	EDIT_ICON,
	MAIL_ICON,
	MARKER_ICON,
	PRICE_ICON
} from "../../utils/icon";
import { useAuthContext } from "../../contexts/AuthProvider";
import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Stack,
	Typography
} from "@mui/material";
import { apiFetch } from "../../http-common/apiFetch";
import SimpleSlider from "../../components/swipers/SimpleSlider";
import { AVATAR_PATH } from "../../utils/variables";
import { BlueButton } from "../../components/buttons/BlueButton";

const ProductDetail = () => {
	const params = useParams();
	const { user } = useAuthContext();
	const [product, setProduct] = useState(null);
	const [isLoaded, setIdLoaded] = useState(false);

	useEffect(() => {
		loadProduct();
	}, []);

	const loadProduct = async () => {
		try {
			const response = await apiFetch(
				`/product/${params.slug}`,
				"get"
			);
			setProduct(response);
		} catch (error) {
			console.log(error);
		} finally {
			setIdLoaded(true);
		}
	};

	return isLoaded
		? <React.Fragment>
				<Box py={5} bgcolor="var(--light)">
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
										boxShadow: "-20px 20px 4px var(--coreego-blue)",
										height: 350,
										width: 350,
										maxWidht: "100%"
									}}
								>
									<SimpleSlider images={product.images} />
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<Stack spacing={2} alignItems="flex-start">
									<Typography
										color="var(--coreego-blue)"
										sx={{ wordBreak: "break-all" }}
										variant="h4"
										component="h1"
									>
										{" "}{product.title}{" "}
									</Typography>
									<Typography
										color="var(--grey-bold)"
										whiteSpace="pre-line"
									>
										{" "}{product.description}{" "}
									</Typography>
									<Typography
										component="p"
										variant="h6"
										fontWeight="bold"
										noWrap={true}
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
											src={AVATAR_PATH + product.user.avatarPath}
										/>
										<Typography fontWeight="bold">
											{product.user.pseudo}
										</Typography>
									</Stack>
									<Button
										startIcon={<MAIL_ICON />}
										variant="contained"
									>
										Contacter le vendeur
									</Button>
								</Stack>
							</Grid>
						</Grid>
					</Container>
				</Box>
				<Box py={5}>
					<Container>
						<Stack spacing={3}>
							<Typography
								variant="h6"
								component="p"
								fontWeight="bold"
							>
								Localisation{" "}
								<Typography
									variant="h6"
									fontWeight="bold"
									color="var(--coreego-blue)"
									component="span"
								>
									de la vente
								</Typography>
							</Typography>
							<Typography display="flex" alignItems="center">
								<MARKER_ICON sx={{ mr: 1 }} />
								{product.city.label},
								{product.district.label}
							</Typography>
							<Box
								sx={{ height: {xs: 250, sm: 300, md: 400} , width: "100%", maxWidth: "100%" }}
							>
								<KakaoMap
									lat={product.district.latitude}
									lng={product.district.longitude}
									withCircle={true}
								/>
							</Box>
						</Stack>
					</Container>
				</Box>
			</React.Fragment>
		: <LoadingPage type="page" />;
};

export default ProductDetail;
