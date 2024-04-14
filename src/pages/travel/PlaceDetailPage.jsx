import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import LoadingPage from "../../components/LoadingPage";
import MapSimpleMarker from "../../components/maps/MapSimpleMarker";
import SavePlaceButton from "../../components/buttons/SavePlaceButton";
import ShareButton from "../../components/buttons/ShareButton";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import ReviewModule from "../components/modules/ReviewModule";

import CategoryText from "../../components/texts/CategoryText";
import { belongsToAuth } from "../../utils";
import { CIRCLE_ICON, GPS_ICON, MARKER_ICON } from "../../utils/icon";
import { useAuthContext } from "../../contexts/AuthProvider";

import {
	Avatar,
	Box,
	Container,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import SimpleSlider from "../../components/swipers/SimpleSlider";
import {
	AVATAR_PATH,
	UNKNOWN_USER,
	goToKakaoMapByLatLong
} from "../../utils/variables";
import TitleSectionText from "../../components/texts/TitleSectionText";
import OptionPublicationButton from "../../components/buttons/OptionPublicationButton";
import ReportModule from "../components/modules/ReportModule";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const PlaceDetail = () => {
	const params = useParams();
	const { auth } = useAuthContext();

	const [place, setPlace] = React.useState();
	const [isLoaded, setIsLoaded] = React.useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		loadPlace();
	}, []);

	const loadPlace = async () => {
		try {
			const response = await axios.get(`/places/${params.slug}`);
			if (!response.data) {
				navigate("*");
			}
			setPlace(response.data);
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			setIsLoaded(true);
		}
	};

	return isLoaded ? (
		<>
			<Helmet>
				<title>Lieu : {place.title} | Coreego</title>
				<meta
					name="title"
					content={`Lieu : ${place.title} | Coreego`}
				/>
				<meta
					name="description"
					content={JSON.parse(place.reasons_to_visit)
						.join(",")
						.slice(0, 150)}
				/>
			</Helmet>
			<Box mt={5}>
				<Container>
					<Stack
						maxWidth="100%"
						justifyContent="center"
						alignItems="center"
						spacing={3}
					>
						<Stack alignItems="center" direction="row" spacing={1}>
							<NavLink to={`/explorer?category=${place.category.id}`}>
								<CategoryText category={place.category} />
							</NavLink>
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
						<ShareButton />
						<ReviewModule
							placeId={place.id}
							mutate={loadPlace}
							reviews={place.reviews}
							average={place.review_average}
						/>
						<Box>
							<Typography
								textAlign="center"
								color="var(--coreego-blue)"
								sx={{ wordBreak: "break" }}
								variant="h3"
								component="h1"
							>
								{place.title}
							</Typography>
						</Box>
						<Box
							sx={{
								boxShadow: "-15px 15px 4px var(--coreego-red)",
								height: { xs: 250, sm: 350 },
								width: 700,
								maxWidth: "100%"
							}}
						>
							<SimpleSlider
								title={place?.title}
								images={place.images}
							/>
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
				<Stack direction="row" alignItems="center" gap={2}>
					<Avatar
						sx={{ height: 50, width: 50 }}
						src={AVATAR_PATH + place?.user?.avatar}
					/>
					<NavLink to={`/user/profil/${place?.user?.slug}`}>
						<Typography component="div" fontWeight="bold">
							{place?.user?.pseudo || UNKNOWN_USER}
						</Typography>
					</NavLink>
					{belongsToAuth(place?.user?.id, auth?.id) ? (
						<OptionPublicationButton
							editLink={`/explorer/lieu/modification/${place.slug}`}
							deleteUrl={`/places/${place.id}`}
							redirectionUrl={"/forum"}
						/>
					) : (
						<ReportModule
							targetElement="place_reported_id"
							targetValue={place.id}
						/>
					)}
				</Stack>
			</Divider>

			<Box mt={3}>
				<Container>
					<Stack gap={2}>
						<TitleSectionText
							startText="Raisons pou visiter"
							endText="ce lieu"
						/>
						<List>
							{JSON.parse(place.reasons_to_visit).map(
								(reason, index) => {
									return (
										<ListItem key={index}>
											<ListItemIcon>
												<CIRCLE_ICON />
											</ListItemIcon>
											<ListItemText primary={reason} />
										</ListItem>
									);
								}
							)}
						</List>
						<Typography
							color="var(--grey-bold)"
							whiteSpace="pre-line"
							fontSize={18}
						>
							{place.description}
						</Typography>
					</Stack>
				</Container>
			</Box>

			<Box mt={3}>
				<Container>
					<Stack gap={2}>
						<TitleSectionText
							startText="localisation"
							endText="du lieu"
						/>
						<Box
							sx={{
								height: { xs: 250, md: 450 },
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
						<Box sx={{ mt: 3 }}>
							<NavLink to={`/explorer?city=${place.city.id}&district=${place.district.id}`}>
							<Typography
								gutterBottom
								display="flex"
								alignItems="center"
								gap={1}
								>
								<MARKER_ICON />
								{place.city.label},{place.district.label}
							</Typography>
							</NavLink>
							<Typography
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1
								}}
							>
								{place.address}
							</Typography>
						</Box>
					</Stack>
				</Container>
			</Box>

			<Box mt={3}>
				<Container>
					<Stack direction={"row"} spacing={1}>
						<LikeButton
							likes={place.likes}
							mutate={loadPlace}
							placeId={place.id}
						/>
						<SavePlaceButton
							placeId={place.id}
							users={place.users}
							mutate={loadPlace}
						/>
					</Stack>
				</Container>
			</Box>

			<Box my={3}>
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
