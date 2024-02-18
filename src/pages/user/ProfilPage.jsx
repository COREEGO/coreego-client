import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
	Typography
} from "@mui/material";
import { toast } from "react-toastify";
import { apiFetch } from "../../http-common/apiFetch";
import ProfilForm from "../../components/forms/ProfilForm";
import { AVATAR_PATH, SOCIAL_ICON_SIZE } from "../../utils/variables";
import axios from "axios";
import {
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
			console.log(response.data)
			setUser(response.data);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setIsLoaded(true);
		}
	};

	return isLoaded ? (
		<>
			<Box py={5}>
				<Container>
					<Stack spacing={3}>
						<Stack
							direction={{ md: "row" }}
							alignItems="center"
							spacing={1}
						>
							<Avatar
								sx={{ width: 80, height: 80 }}
								src={AVATAR_PATH + user?.avatarPath}
							/>
							<Stack alignItems={{ xs: "center", md: "flex-start" }}>
								<Typography
									fontWeight="bold"
									component="h1"
									variant="h4"
								>
									{user.pseudo}
								</Typography>
								<Typography variant="body2">
									Inscrit depuis le{" "}
									{moment(user.created_at).format("D MMMM YYYY")}{" "}
								</Typography>
							</Stack>
							{isCurrentAuthProfil && (
								<NavLink to={"/user/profil/edit"}>
									<Button variant="outlined">
										Modifier mon profil
									</Button>
								</NavLink>
							)}
						</Stack>
						<Stack
							spacing={1}
							direction={{ md: "row" }}
							alignItems="center"
						>
							{user.youtube && (
								<NavLink to={youtubeLink(user.youtube)}>
									<IconButton edge="end">
										<YOUTUBE_ICON />
									</IconButton>
								</NavLink>
							)}
							{user.facebook && (
								<NavLink to={facebookLink(user.facebook)}>
									<IconButton edge="end">
										<FACEBOOK_ICON />
									</IconButton>
								</NavLink>
							)}
							{user.instagram && (
								<NavLink to={instagramLink(user.instagram)}>
									<IconButton edge="end">
										<INSTAGRAM_ICON />
									</IconButton>
								</NavLink>
							)}
							{user.tiktok && (
								<NavLink to={tiktokLink(user.tiktok)}>
									<IconButton edge="end">
										<TIKTOK_ICON />
									</IconButton>
								</NavLink>
							)}
							{user.kakao && (
								<Tooltip title={user.kakao}>
									<IconButton edge="end">
										<KAKAO_ICON />
									</IconButton>
								</Tooltip>
							)}
						</Stack>
					</Stack>
				</Container>
			</Box>

			<Divider />

			<Container>
				<Stack mt={5} spacing={3}>
					<Box>
						<TitleSectionText
							gutterBottom
							startText="à propos de"
							endText={user.pseudo}
						/>
						<Typography
							color="var(--grey-bold)"
							whiteSpace="pre-line"
						>
							{user?.introduction || "Aucune description"}
						</Typography>
					</Box>
					<Stack gap={1}>
						<ListItem
							disableGutters
							sx={{ display: !user.occupation && "none", mb: 2 }}
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
							sx={{ display: !user.hobby && "none", mb: 2 }}
						>
							<ListItemAvatar>
								<Avatar
									sx={{ backgroundColor: "var(--coreego-blue)" }}
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
							sx={{ display: !user?.city && "none", mb: 2 }}
						>
							<ListItemAvatar>
								<Avatar
									sx={{ backgroundColor: "var(--coreego-blue)" }}
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
								display: !JSON.parse(user.languages).length && "none",
								mb: 2
							}}
						>
							<ListItemAvatar>
								<Avatar
									sx={{ backgroundColor: "var(--coreego-blue)" }}
								>
									<LANGUAGE_ICON />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary="Langues parlées"
								secondary={
									JSON.parse(user.languages).join(" , ")
								}
							/>
						</ListItem>
					</Stack>
				</Stack>

				<Stack gap={2} mb={5}>
					<TitleSectionText
						startText="Publications de"
						endText={user.pseudo}
					/>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<NavLink to={`/voyage?user=${user.id}`}>
								<Button
									sx={{ width: "100%", py: 3 }}
									variant="outlined"
									startIcon={<TRAVEL_ICON />}
								>
									Lieux
								</Button>
							</NavLink>
						</Grid>
						<Grid item xs={12} md={6}>
							<NavLink to={`/forum?user=${user.id}`}>
								<Button
									sx={{ width: "100%", py: 3 }}
									variant="outlined"
									startIcon={<FORUM_ICON />}
								>
									Discussions
								</Button>
							</NavLink>
						</Grid>
						<Grid item xs={12} md={6}>
							<NavLink to={`/market-place?user=${user.id}`}>
								<Button
									sx={{ width: "100%", py: 3 }}
									variant="outlined"
									startIcon={<MARKET_PLACE_ICON />}
								>
									Produits en vente
								</Button>
							</NavLink>
						</Grid>
					</Grid>
				</Stack>
			</Container>
		</>
	) : (
		<LoadingPage type="page" />
	);
};

export default ProfilPage;
