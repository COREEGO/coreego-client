import {
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	CircularProgress
} from "@mui/material";
import React from "react";
import {
	EDIT_ICON,
	MORE_OPTIONS_ICON,
	TRASH_ICON
} from "../../utils/icon";
import { NavLink, useNavigate } from "react-router-dom";
import { BEARER_HEADERS } from "../../utils/variables";
import axios from "axios";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

const OptionPublicationButton = ({
	deleteUrl,
	redirectionUrl = null,
	mutate = () => null,
	editLink
}) => {
	const [anchorOption, setanchorOption] = React.useState();
	const [isBusy, setIsBusy] = React.useState(false);

	const navigate = useNavigate();
	const confirm = useConfirm();

	const onDelete = () => {
		confirm({ description: "confirmer la suppression ?" })
			.then(async (res) => {
				setIsBusy(true);
				const response = await axios.delete(
					deleteUrl,
					BEARER_HEADERS
				);
				toast.success(response.data.message);
				redirectionUrl && navigate(redirectionUrl);
				mutate();
			})
			.catch((error) => {
				toast.error(error?.data?.message);
			})
			.finally(() => {
				setanchorOption(null);
				setIsBusy(false);
			});
	};

	return (
		<React.Fragment>
			{isBusy ? (
				<CircularProgress />
			) : (
				<>
					<IconButton
						onClick={(event) => setanchorOption(event.currentTarget)}
					>
						<MORE_OPTIONS_ICON />
					</IconButton>

					<Menu
						anchorEl={anchorOption}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right"
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right"
						}}
						open={Boolean(anchorOption)}
						onClose={() => setanchorOption(null)}
					>
						<NavLink to={editLink}>
							<MenuItem onClick={() => setanchorOption(null)}>
								<ListItemIcon>
									<EDIT_ICON />
								</ListItemIcon>
								Modifier
							</MenuItem>
						</NavLink>
						<MenuItem onClick={onDelete}>
							<ListItemIcon>
								<TRASH_ICON />
							</ListItemIcon>
							Supprimer
						</MenuItem>
					</Menu>
				</>
			)}
		</React.Fragment>
	);
};

export default OptionPublicationButton;
