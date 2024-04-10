import {
	Avatar,
	Box,
	Container,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Typography
} from "@mui/material";
import TitleSectionText from "../../components/texts/TitleSectionText";
import {
	COMMENT_ICON,
	MORE_OPTIONS_ICON,
	NOTIFICATION_ICON,
	TRASH_ICON
} from "../../utils/icon";
import { useAuthContext } from "../../contexts/AuthProvider";
import { AVATAR_PATH, BEARER_HEADERS } from "../../utils/variables";
import React from "react";
import { dateParse } from "../../utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteSweep } from "@mui/icons-material";
import CommentNotificationCard from "../../components/card/notifications/CommentNotificationCard";
import ReportNotificationCard from "../../components/card/notifications/ReportNotificationCard";

const NotificationPage = () => {
	const [anchorEl, setAnchorEl] = React.useState();

	const { auth, authentification } = useAuthContext();
	const navigate = useNavigate();

	const onReadedPost = async (notification) => {
		try {
			if (!notification?.read_at) {
				await axios.post(
					`/notifications?read_id=${notification.id}`,
					null,
					BEARER_HEADERS
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onDeleteNotification = async (notificationId) => {
		try {
			await axios.post(
				`/notifications?delete_id=${notificationId}`,
				null,
				BEARER_HEADERS
			);
			await authentification();
		} catch (error) {
			alert(error);
		}
	};

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
		auth && (
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
							display={auth?.notifications?.length ? "block" : "none"}
						>
							<IconButton
								onClick={(event) => setAnchorEl(event.currentTarget)}
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
					{auth?.notifications?.length ? (
						<List>
							{auth.notifications.map((notification, index) => {
								console.log(notification);
								return (
									<React.Fragment key={index}>
										{notification.type.includes(
											"CommentNotification"
										) && (
											<CommentNotificationCard
												notification={notification}
												onNavigate={async (link) => {
													navigate(link);
													onReadedPost(notification);
													await authentification();
												}}
												onDelete={async () => {
													await onDeleteNotification(notification.id);
												}}
											/>
										)}
										{notification.type.includes(
											"ReportNotification"
										) && (
											<ReportNotificationCard
												notification={notification}
												onNavigate={async (link) => {
													navigate(link);
													onReadedPost(notification);
													await authentification();
												}}
												onDelete={async () => {
													await onDeleteNotification(notification.id);
												}}
											/>
										)}

									</React.Fragment>
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
