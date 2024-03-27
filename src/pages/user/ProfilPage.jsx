import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import {
	FORUM_ICON,
	DISLIKE_ICON,
	TRAVEL_ICON,
	MARKET_PLACE_ICON,
	OCCUPATION_ICON,
	LOCALISATION_ICON,
	LANGUAGE_ICON,
	INSTAGRAM_ICON,
	KAKAO_ICON,
	FACEBOOK_ICON,
	TIKTOK_ICON,
	YOUTUBE_ICON,
	LIKE_ICON,
	LOGOUT_ICON
} from "../../utils/icon";
import LoadingPage from "../../components/LoadingPage";
import UserSniped from "../../components/react-ux/UserSniped";
import { useAuthContext } from "../../contexts/AuthProvider";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
	Stack,
	Tooltip,
	CardHeader,
	Typography
} from "@mui/material";
import { toast } from "react-toastify";
import { apiFetch } from "../../http-common/apiFetch";
import ProfilForm from "../../components/forms/ProfilForm";
import {
	AVATAR_PATH,
	BEARER_HEADERS,
	SOCIAL_ICON_SIZE
} from "../../utils/variables";
import axios from "axios";
import {
	belongsToAuth,
	dateParse,
	facebookLink,
	instagramLink,
	tiktokLink,
	youtubeLink
} from "../../utils";
import moment from "moment";
import TitleSectionText from "../../components/texts/TitleSectionText";

const ProfilPage = () => {
	const params = useParams();

	const [isLoaded, setIsLoaded] = useState(false);
	const { user: currentUser } = useAuthContext();
	const { setUser: setUserContext } = useAuthContext();


	const isCurrentAuthProfil = currentUser
		? currentUser.slug == params.slug
		: false;

	const [user, setUser] = useState(null);

	useEffect(() => {
		loadUser();
	}, []);

	const loadUser = async () => {
		try {
			const response = await axios.get("/user/" + params.slug);
			console.log(response.data);
			setUser(response.data);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setIsLoaded(true);
		}
	};


	return isLoaded ? (
		<Box py={5}>
			<Container>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Card variant="outlined">
							<CardContent>
								<Stack
									direction={{ md: "row" }}
									alignItems="center"
									gap={3}
								>
									<Avatar
										sx={{ width: 100, height: 100 }}
										src={AVATAR_PATH + user?.avatar}
									/>
									<Stack
										alignItems={{ xs: "center", md: "flex-start" }}
									>
										<Typography
											fontWeight="bold"
											component="div"
											variant="h5"
										>
											{user.pseudo}
										</Typography>
										<Typography component="div">
											Membre depuis le{" "}
											{moment(user.created_at).format("D MMMM YYYY")}
										</Typography>
									</Stack>
									{belongsToAuth(user.id, currentUser?.id) && (
										<NavLink to={"/user/profil/edit"}>
											<Button variant="outlined">
												Modifier mon profil
											</Button>
										</NavLink>
									)}
								</Stack>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} md={6}>
						<Card variant="outlined">
							<CardHeader
								title={<TitleSectionText endText="Introduction" />}
							/>
							{user?.introduction && (
								<CardContent>
									<Typography>
										{user?.introduction}
									</Typography>
								</CardContent>
							)}
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card variant="outlined">
							<CardHeader
								title={
									<TitleSectionText
										startText="Réseaux"
										endText="sociaux"
									/>
								}
							/>
							{(user.youtube ||
								user.facebook ||
								user.instagram ||
								user.tiktok ||
								user.kakao) && (
								<CardContent>
									<Stack direction="row">
										{user.youtube && (
											<NavLink to={youtubeLink(user.youtube)}>
												<IconButton>
													<YOUTUBE_ICON />
												</IconButton>
											</NavLink>
										)}
										{user.facebook && (
											<NavLink to={facebookLink(user.facebook)}>
												<IconButton>
													<FACEBOOK_ICON />
												</IconButton>
											</NavLink>
										)}
										{user.instagram && (
											<NavLink to={instagramLink(user.instagram)}>
												<IconButton>
													<INSTAGRAM_ICON />
												</IconButton>
											</NavLink>
										)}
										{user.tiktok && (
											<NavLink to={tiktokLink(user.tiktok)}>
												<IconButton>
													<TIKTOK_ICON />
												</IconButton>
											</NavLink>
										)}
										{user.kakao && (
											<Tooltip title={user.kakao}>
												<IconButton>
													<KAKAO_ICON />
												</IconButton>
											</Tooltip>
										)}
									</Stack>
								</CardContent>
							)}
						</Card>
					</Grid>

					<Grid item xs={12} md={6}>
						<Card variant="outlined">
							<CardHeader
								title={
									<TitleSectionText
										startText="A props de"
										endText={user.pseudo}
									/>
								}
							/>
							{(user.occupation ||
								user.hobby ||
								(user?.city?.label && user?.district?.label) ||
								JSON.parse(user.languages).length > 0 ) && (
								<CardContent>
									<Stack>
										<ListItem
											disableGutters
											sx={{ display: !user.occupation && "none" }}
										>
											<ListItemAvatar>
												<Avatar
													sx={{
														backgroundColor: "var(--coreego-blue)",
														mb: 2
													}}
												>
													<OCCUPATION_ICON />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary="Profession"
												secondary={user.occupation}
											/>
										</ListItem>

										<ListItem
											disableGutters
											sx={{ display: !user.hobby && "none" }}
										>
											<ListItemAvatar>
												<Avatar
													sx={{
														backgroundColor: "var(--coreego-blue)"
													}}
												>
													<LIKE_ICON />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary="Ce que j'aime"
												secondary={user.hobby}
											/>
										</ListItem>
										<ListItem
											disableGutters
											sx={{ display: !user?.city && "none" }}
										>
											<ListItemAvatar>
												<Avatar
													sx={{
														backgroundColor: "var(--coreego-blue)"
													}}
												>
													<LOCALISATION_ICON />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary="Localisation"
												secondary={`
                ${user?.city?.label || ""}
                ${
									user?.city?.label && user?.district?.label
										? ","
										: ""
								}
                    ${user?.district?.label || ""}
                    `}
											/>
										</ListItem>

										<ListItem
											disableGutters
											sx={{
												display:
													!JSON.parse(user.languages).length && "none"
											}}
										>
											<ListItemAvatar>
												<Avatar
													sx={{
														backgroundColor: "var(--coreego-blue)"
													}}
												>
													<LANGUAGE_ICON />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary="Langues parlées"
												secondary={JSON.parse(user.languages).join(
													" , "
												)}
											/>
										</ListItem>
									</Stack>
								</CardContent>
							)}
						</Card>
					</Grid>

					<Grid item xs={12} md={6}>
						<Card variant="outlined">
							<CardHeader
								title={
									<TitleSectionText
										startText="Publications de"
										endText={user.pseudo}
									/>
								}
							/>
							<CardContent>
								<Stack spacing={3}>
									<NavLink to={`/voyage?user=${user.id}`}>
										<Button
											sx={{ width: "100%", py: 3 }}
											variant="outlined"
											startIcon={<TRAVEL_ICON />}
										>
											Lieux
										</Button>
									</NavLink>
									<NavLink to={`/forum?user=${user.id}`}>
										<Button
											sx={{ width: "100%", py: 3 }}
											variant="outlined"
											startIcon={<FORUM_ICON />}
										>
											Discussions
										</Button>
									</NavLink>
									<NavLink to={`/market-place?user=${user.id}`}>
										<Button
											sx={{ width: "100%", py: 3 }}
											variant="outlined"
											startIcon={<MARKET_PLACE_ICON />}
										>
											Produits en vente
										</Button>
									</NavLink>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	) : (
		<LoadingPage type="page" />
	);
};

export default ProfilPage;
