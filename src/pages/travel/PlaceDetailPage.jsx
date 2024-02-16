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
			<Box className="hero_banner">
				<Box py={5}>
					<Container>
						<Stack gap={5}>
							<Stack
								maxWidth="100%"
								justifyContent="center"
								alignItems="center"
							>
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
							{belongsToAuth(place.user.id, user?.id) ? (
								<NavLink to={`/voyage/place/edit/${params.id}`}>
									<Button
										variant="outlined"
										startIcon={<EDIT_ICON />}
									>
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
                            <ReviewModule placeId={place.id} mutate={loadPlace} reviews={place.reviews} />
							<Typography
								color="var(--coreego-blue)"
								sx={{ wordBreak: "break-all" }}
								variant="h4"
								component="h1"
							>
								{place.title}
							</Typography>
							<Typography
								color="var(--grey-bold)"
								whiteSpace="pre-line"
							>
								{place.description}
							</Typography>
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
						</Stack>
					</Container>
				</Box>
			</Box>

			<Box>
				<Divider sx={{ borderColor: "black" }} />
				<Box py={2}>
					<Container>
						<Stack spacing={1}>
							<Typography component="span" fontWeight="bold">
								Publier par :
							</Typography>
							<Stack direction="row" alignItems="center" spacing={1}>
								<Avatar
									sx={{ width: 40, height: 40 }}
									src={AVATAR_PATH + place.user.avatarPath}
								/>
								<Typography fontWeight="bold">
									{place.user.pseudo}
								</Typography>
							</Stack>
						</Stack>
					</Container>
				</Box>
				<Divider sx={{ borderColor: "black" }} />
			</Box>

			<Box mt={5}>
				<Container>
					<Stack spacing={3}>
						<Typography variant="h6" component="p" fontWeight="bold">
							Localisation{" "}
							<Typography
								variant="h6"
								fontWeight="bold"
								color="var(--coreego-blue)"
								component="span"
							>
								du lieu
							</Typography>
						</Typography>
						<Typography display="flex" alignItems="center">
							<MARKER_ICON sx={{ mr: 1 }} />
							{place.city.label},{place.district.label}
						</Typography>
						<Typography> {place.address} </Typography>
						<Box
							sx={{
								height: { xs: 250, md: 400 },
								width: "100%",
								position: "relative"
							}}
						>
							<MapSimpleMarker
								lng={place.longitude}
								lat={place.latitude}
								zoom={1}
								displayMapMode={true}
								displayMapType={true}
							/>
						</Box>
					</Stack>
				</Container>
				<CommentModule
					placeId={place.id}
					comments={place.comments}
					mutate={loadPlace}
				/>
			</Box>

			{/* <Box className="hero_banner">
                <Container>
                    <Stack spacing={2} >
                        <Stack spacing={3} alignItems={"flex-start"}>
                            {
                                belongsToAuth(place.user.id, user?.id) ?
                                    <NavLink to={`/voyage/place/edit/${params.id}`}>
                                        <Button variant="outlined" startIcon={<EDIT_ICON />}>Modifier</Button>
                                    </NavLink>
                                    :
                                    <></>
                            }
                            <TitleText text={place.title} />
                            <NavLink to={"/voyage?category=" + place.category.id}>
                                <CategoryText category={place.category} />
                            </NavLink>
                            <NavLink to={`/voyage?city=${place.city.id}&district=${place.district.id}`}>
                                <LocalisationText city={place.city} district={place.district} />
                            </NavLink>
                            <ReviewModule placeId={place.id} mutate={loadPlace} reviews={place.reviews} />
                            <Box sx={{ height: { xs: 300, md: 350 }, width: '100%' }}>

                            </Box>
                            <Stack spacing={2}>
                                <Typography component="span" variant="h6" sx={{ fontWeight: 'bold' }}>Description :</Typography>
                                <Typography sx={{ whiteSpace: 'pre-line', mt: 1 }} paragraph={true}>
                                    {place.description}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box>
                            <Divider />
                            <Box py={3}>
                                <UserSniped
                                    avatar={place.user.avatarPath}
                                    pseudo={place.user.pseudo}
                                    publishDate={place.created_at}
                                />
                            </Box>
                            <Divider />
                        </Box>
                        <Stack spacing={2}>
                            <Typography component="span" variant="h6" sx={{ fontWeight: 'bold' }}> Adresse </Typography>
                            <Typography> {place.address} </Typography>
                            <Box sx={{ height: { xs: 250, md: 400 }, width: '100%', position: 'relative' }}>
                                <MapSimpleMarker
                                    lng={place.longitude}
                                    lat={place.latitude}
                                    zoom={1}
                                    displayMapMode={true}
                                    displayMapType={true}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
                <Stack sx={{ bgcolor: 'white', position: 'sticky', bottom: 0, py: 3, zIndex: 100 }}>
                    <Container maxWidth="lg">
                        <Stack direction={"row"} spacing={1}>
                            <LikeButton likes={place.likes} mutate={loadPlace} placeId={place.id} />
                            <SavePlaceButton
                                placeId={place.id}
                                savedPlaces={place.savedPlaces}
                                mutate={loadPlace}
                            />
                            <ShareButton />
                        </Stack>
                    </Container>
                </Stack>
            </Box> */}
			{/* <CommentModule placeId={place.id} comments={place.comments} mutate={loadPlace} /> */}
		</>
	) : (
		<LoadingPage type="page" />
	);
};

export default PlaceDetail;
