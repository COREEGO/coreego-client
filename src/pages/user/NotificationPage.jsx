import {
	Avatar,
	Box,
	Chip,
	Container,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	Stack,
	Typography
} from "@mui/material";
import TitleSectionText from "../../components/texts/TitleSectionText";
import {
	MORE_OPTIONS_HORIZONTAL_ICON,
	MORE_OPTIONS_ICON,
	NOTIFICATION_ICON,
	TRASH_ICON
} from "../../utils/icon";
import { useAuthContext } from "../../contexts/AuthProvider";
import { AVATAR_PATH, BEARER_HEADERS } from "../../utils/variables";
import React from "react";
import { dateParse } from "../../utils";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteSweep } from "@mui/icons-material";

const CommentNotificationCard = ({ notification }) => {
	const { user, authentification } = useAuthContext();
	const navigate = useNavigate();

	const data = notification.data;
	let label, postLink;

	if (data.discussion_id) {
		label = "DISCUSSION";
		postLink = `/forum/discussion/${data.entity.slug}`;
	}
	if (data.place_id) {
		label = "LIEU";
		postLink = `/voyage/place/${data.entity.slug}`;
	}

	const onNavigateToPost = async () => {
		try {
			if (!notification?.read_at) {
				await axios.post(
					`/notifications?read_id=${notification.id}`,
					null,
					BEARER_HEADERS
				);
				await authentification();
			}
			navigate(postLink);
		} catch (error) {
			alert(error);
		}
	};

	const onDeleteNotification = async () => {
		try {
			await axios.post(
				`/notifications?delete_id=${notification.id}`,
				null,
				BEARER_HEADERS
			);
			await authentification();
		} catch (error) {
			alert(error);
		}
	};

	return (
		<ListItem onClick={onNavigateToPost}>
			<ListItemButton
				alignItems="flex-start"
				selected={!notification?.read_at}
			>
				<ListItemAvatar>
					<Avatar src={AVATAR_PATH + data?.user?.avatar} />
				</ListItemAvatar>
				<ListItemText
					primary={
						<Typography fontWeight="bold" component="span">
							{data?.user?.pseudo}
						</Typography>
					}
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: "inline" }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								à commenter votre {label}
							</Typography>
							{" — "}
							<strong style={{ color: "var(--coreego-blue)" }}>
								{" " + data.entity.title + " "}
							</strong>
							{" — "}
							{data.content.slice(0, 50) + "..."}
						</React.Fragment>
					}
				/>
				<Stack alignItems="center">
					<Typography variant="caption">
						{dateParse(notification.created_at)}
					</Typography>
					<Box>
						<IconButton
							onClick={(event) => {
								event.stopPropagation();
								onDeleteNotification();
							}}
						>
							<TRASH_ICON />
						</IconButton>
					</Box>
				</Stack>
			</ListItemButton>
		</ListItem>
	);
};

const NotificationPage = () => {
	const [anchorEl, setAnchorEl] = React.useState();

	const { user, authentification } = useAuthContext();
	const navigate = useNavigate();

	const onDeleteAllNotification = async () => {
		try {
			await axios.post(
				`/notifications?delete_all=true`,
				null,
				BEARER_HEADERS
			);
			await authentification();
		} catch (error) {
			alert(error);
		}
	};
	const onDeleteAllNotificationReaded = async () => {
		try {
			await axios.post(
				`/notifications?delete_all_readed=true`,
				null,
				BEARER_HEADERS
			);
			await authentification();
		} catch (error) {
			alert(error);
		}
	};

	return (
		user && (
			<Container>
					<Stack gap={2} my={5}>
						<Stack direction="row" alignItems="center" gap={1}>
							<Stack gap={1} direction="row" alignItems="center">
								<NOTIFICATION_ICON />
								<TitleSectionText
									component="h1"
									startText="Mes"
									endText="notifications"
								/>
							</Stack>
							<Box
								display={user?.notification?.length ? "block" : "none"}
							>
								<IconButton
									onClick={(event) =>
										setAnchorEl(event.currentTarget)
									}
								>
									<MORE_OPTIONS_ICON />
								</IconButton>
								<Menu
									onClick={() => setAnchorEl(null)}
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={() => setAnchorEl(null)}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right"
									}}
									transformOrigin={{
										vertical: "top",
										horizontal: "right"
									}}
								>
									<MenuItem onClick={onDeleteAllNotification}>
										<ListItemIcon>
											<TRASH_ICON fontSize="small" />
										</ListItemIcon>
										<ListItemText>Tout supprimer</ListItemText>
									</MenuItem>
									<MenuItem onClick={onDeleteAllNotificationReaded}>
										<ListItemIcon>
											<DeleteSweep fontSize="small" />
										</ListItemIcon>
										<ListItemText>Supprimer les lues</ListItemText>
									</MenuItem>
								</Menu>
							</Box>
						</Stack>
						{user?.notifications?.length ? (
							<List>
								{user.notifications.map((notification, index) => {
									return (
										notification?.type?.includes(
											"CommentNotification"
										) && (
											<CommentNotificationCard
												key={index}
												notification={notification}
											/>
										)
									);
								})}
							</List>
						) : (
							<Typography>Aucune notifications</Typography>
						)}
					</Stack>
			</Container>
		)
	);
};

export default NotificationPage;
