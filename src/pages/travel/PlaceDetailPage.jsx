import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import MapSimpleMarker from "../../components/maps/MapSimpleMarker";
import TitleText from "../../components/texts/TitleText";
import UserSniped from "../../components/react-ux/UserSniped";
import SavePlaceButton from "../../components/buttons/SavePlaceButton";
import ShareButton from "../../components/buttons/ShareButton";
import LikeButton from "../../components/buttons/LikeButton";
import SlideSwiper from "../../components/swipers/SimpleSlider";
import CommentModule from "../components/modules/CommentModule";
import ReviewModule from "../components/modules/ReviewModule";

import { NavLink } from "react-router-dom";
import LocalisationText from "../../components/texts/LocalisationText";
import CategoryText from "../../components/texts/CategoryText";
import { belongsToAuth } from "../../utils";
import { EDIT_ICON, MARKER_ICON } from "../../utils/icon";
import { useAuthContext } from "../../contexts/AuthProvider";

import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Stack,
	Typography
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import SimpleSlider from "../../components/swipers/SimpleSlider";
import KakaoMap from "../../components/maps/KakaoMap";
import { AVATAR_PATH } from "../../utils/variables";
import TitleSectionText from "../../components/texts/TitleSectionText";

const PlaceDetail = () => {
	const params = useParams();
	const { user } = useAuthContext();

	const [place, setPlace] = React.useState();
	const [isLoaded, setIsLoaded] = React.useState(false);

	useEffect(() => {
		loadPlace();
	}, []);

	const loadPlace = async () => {
		try {
			const response = await axios.get(`/place/${params.slug}`);
			setPlace(response.data);
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			setIsLoaded(true);
		}
	};

	return isLoaded ? (
		<>
			<Box mt={5}>
				<Container>
					<Stack
						maxWidth="100%"
						justifyContent="center"
						alignItems="center"
						spacing={5}
					>
						{belongsToAuth(place.user.id, user?.id) ? (
							<NavLink to={`/voyage/place/edit/${params.id}`}>
								<Button variant="outlined" startIcon={<EDIT_ICON />}>
									Modifier
								</Button>
							</NavLink>
						) : (
							<></>
						)}
						<Stack alignItems="center" direction="row" spacing={1}>
							<CategoryText category={place.category} />
							<Typography
								sx={{
									color: "var(--grey-bold)",
									"&:before": {
										content: '"| "' // Correction ici
									}
								}}
							>
								{moment(place.created_at).format("D MMMM YYYY")}
							</Typography>
						</Stack>
						<ReviewModule
							placeId={place.id}
							mutate={loadPlace}
							reviews={place.reviews}
						/>
						<Typography
							textAlign="center"
							color="var(--coreego-blue)"
							sx={{ wordBreak: "break-all" }}
							variant="h4"
							component="h1"
						>
							{place.title}
						</Typography>
						<Box
							sx={{
								boxShadow: "-20px 20px 4px var(--coreego-red)",
								height: 350,
								width: 700,
								maxWidth: "100%"
							}}
						>
							<SimpleSlider images={place.images} />
						</Box>
					</Stack>
				</Container>
			</Box>
			<Divider
				sx={{
					width: "100%",
					mt: 5,
					"&:after, &:before": { backgroundColor: "black" }
				}}
			>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Avatar
						sx={{ width: 40, height: 40 }}
						src={AVATAR_PATH + place.user.avatarPath}
					/>
					<Typography fontWeight="bold">
						{place.user.pseudo}
					</Typography>
				</Stack>
			</Divider>

			<Box mt={5}>
				<Container>
					<Stack>
						<Typography
							color="var(--grey-bold)"
							whiteSpace="pre-line"
						>
							{place.description}
						</Typography>
					</Stack>
				</Container>
			</Box>

			<Box mt={5}>
				<Container>
					<Stack spacing={2}>
						<TitleSectionText
							startText="localisation"
							endText="du lieu"
						/>
						<Box>
							<Typography
								gutterBottom
								display="flex"
								alignItems="center"
							>
								<MARKER_ICON sx={{ mr: 1 }} />
								{place.city.label},{place.district.label}
							</Typography>
							<Typography> {place.address} </Typography>
						</Box>
						<Box
							sx={{
								height: { xs: 250, md: 400 },
								width: "100%",
								position: "relative"
							}}
						>
							<MapSimpleMarker
								style={{
									boxShadow: "-15px 15px 4px var(--coreego-blue)"
								}}
								lng={place.longitude}
								lat={place.latitude}
								zoom={1}
								displayMapMode={true}
								displayMapType={true}
							/>
						</Box>
					</Stack>
				</Container>
			</Box>

			<Box mt={5}>
				<Container>
					<Stack direction={"row"} spacing={1}>
						<LikeButton
							likes={place.likes}
							mutate={loadPlace}
							placeId={place.id}
						/>
						<SavePlaceButton
							placeId={place.id}
							savedPlaces={place.savedPlaces}
							mutate={loadPlace}
						/>
						<ShareButton />
					</Stack>
				</Container>
			</Box>
			<Box my={5}>
				<CommentModule
					placeId={place.id}
					comments={place.comments}
					mutate={loadPlace}
				/>
			</Box>
		</>
	) : (
		<LoadingPage type="page" />
	);
};

export default PlaceDetail;
