import {
	Avatar,
	Box,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Stack,
	Typography
} from "@mui/material";
import { AVATAR_PATH } from "../../../utils/variables";
import React, { useEffect } from "react";
import { ALERT_ICON, COMMENT_ICON, TRASH_ICON } from "../../../utils/icon";
import { dateParse } from "../../../utils";

const ReportNotificationCard = ({ notification, onNavigate, onDelete }) => {
	const [navigateLink, setNavigateLink] = React.useState("");

	useEffect(() => {
		notification?.data?.discussion_reported_id &&
			setNavigateLink(
				`/forum/discussion/${notification?.data?.entity?.slug}`
			);
		notification?.data?.place_reported_id &&
			setNavigateLink(
				`/explorer/lieu/${notification?.data?.entity?.slug}`
			);
		notification?.data?.product_reported_id &&
			setNavigateLink(
				`/marketplace/produit/${notification?.data?.entity?.slug}`
			);
	}, [notification.data]);

	return (
		<ListItem
			disablePadding
			secondaryAction={
				<Stack alignItems="center">
					{dateParse(notification.created_at)}
					<IconButton
						onClick={(event) => {
							event.stopPropagation();
							onDelete()
						}}
					>
						<TRASH_ICON />
					</IconButton>
				</Stack>
			}
			onClick={() => onNavigate(navigateLink)}
		>
			<ListItemButton
				alignItems="flex-start"
				selected={!notification?.read_at}
			>
				<ListItemAvatar>
					<Avatar
						src={AVATAR_PATH + notification?.data?.user?.avatar}
					/>
				</ListItemAvatar>
				<ListItemText
					primary={
						<Typography fontWeight="bold" component="span">
							{notification?.data?.user?.pseudo}
						</Typography>
					}
					secondary={
						<React.Fragment>
							<Typography
								sx={{
									display: "inline-flex",
									alignItems: "center"
								}}
								component="span"
								variant="body2"
							>
								<ALERT_ICON sx={{mr: 1}} fontSize="small" color="error" />
								{notification.data.entity.title}
							</Typography>
                            <br />
							<Typography sx={{width: '100%'}} component="span" color="text.primary">
								{notification.data.content}
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItemButton>
		</ListItem>
	);
};

export default ReportNotificationCard;
