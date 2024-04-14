import { useAuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import {
	errorField,
	validationComment
} from "../../utils/formValidation";
import {
	Card,
	CardContent,
	Menu,
	IconButton,
	MenuItem,
	Typography,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	Dialog,
	CardHeader,
	DialogActions,
	Avatar
} from "@mui/material";
import { MORE_OPTIONS_ICON } from "../../utils/icon";
import React from "react";
import PopupState, {
	bindTrigger,
	bindMenu
} from "material-ui-popup-state";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { belongsToAuth, dateParse, getViolationField } from "../../utils";
import {
	AVATAR_PATH,
	BEARER_HEADERS,
	UNKNOWN_USER
} from "../../utils/variables";
import axios from "axios";
import ReportModule from "../../pages/components/modules/ReportModule";
import { vestResolver } from "@hookform/resolvers/vest";

const CommentCard = ({ comment, mutate }) => {
	const confirm = useConfirm();
	const [open, setOpen] = React.useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: vestResolver(validationComment),
		defaultValues: {
			content: comment?.content
		}
	});

	const { auth } = useAuthContext();

	const onSubmit = async (data) => {
		try {
			const response = await axios.put(
				`/comments/edit/${comment.id}`,
				data,
				BEARER_HEADERS
			);

			toast.success(response.data.message);
			setOpen(false);
			mutate();
		} catch (error) {
			toast.error(error?.data?.message);
			getViolationField(error, setError);
		}
	};

	const onDelete = async () => {
		confirm({
			description: "Supprimer le commentaire ?"
		})
			.then(async () => {
				const response = await axios.delete(
					`/comments/${comment.id}`,
					BEARER_HEADERS
				);
				toast.success(response.data.message);
				mutate();
			})
			.catch((error) => {
				toast.error(error?.data?.message);
				getViolationField(error, setError);
			});
	};

	return (
		<>
			<Card
				id={`comment-${comment.id}`}
				variant="outlined"
				sx={{ width: "100%" }}
			>
				<CardHeader
					avatar={
						<Avatar src={AVATAR_PATH + comment?.user?.avatar} />
					}
					title={
						<Typography component="div" fontWeight="bold">
							{comment?.user?.pseudo || UNKNOWN_USER}
						</Typography>
					}
					subheader={dateParse(comment.created_at)}
					action={
						belongsToAuth(comment?.user?.id, auth?.id) ? (
							<PopupState variant="popover" popupId="demo-popup-menu">
								{(popupState) => (
									<React.Fragment>
										<IconButton
											{...bindTrigger(popupState)}
											size="small"
											aria-label="account of current user"
											aria-controls="menu-options"
											aria-haspopup="true"
											color="inherit"
										>
											<MORE_OPTIONS_ICON />
										</IconButton>
										<Menu
											{...bindMenu(popupState)}
											onClick={() => popupState.close()}
										>
											<MenuItem
												key="modifier"
												onClick={() => setOpen(true)}
											>
												Modifier
											</MenuItem>
											<MenuItem key="supprimer" onClick={onDelete}>
												Supprimer
											</MenuItem>
										</Menu>
									</React.Fragment>
								)}
							</PopupState>
						) : (
							<ReportModule
								placeholder="En quoi ce commentaire ne convient pas ?"
								targetElement="comment_reported_id"
								targetValue={comment.id}
							/>
						)
					}
				/>
				<CardContent>
					<Typography sx={{ whiteSpace: "pre-line" }}>
						{comment.content}
					</Typography>
				</CardContent>
			</Card>
			{comment?.user?.id === auth?.id && (
				<Dialog
					open={open}
					fullWidth
					onClose={() => setOpen(false)}
					PaperProps={{
						component: "form",
						onSubmit: handleSubmit(onSubmit)
					}}
				>
					<DialogTitle id="alert-dialog-title">
						Ajouter un commentaire
					</DialogTitle>
					<DialogContent>
						<TextField
							{...register("content")}
							{...errorField(errors?.content)}
							fullWidth
							autoFocus
							placeholder="Ecrivez votre commentaire..."
							multiline
							rows={10}
						/>
					</DialogContent>
					<DialogActions>
						<LoadingButton
							variant="contained"
							loading={isSubmitting}
							type="submit"
						>
							Envoyer
						</LoadingButton>
						<Button
							variant="contained"
							color="error"
							onClick={() => setOpen(false)}
						>
							Annuler
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	);
};

export default CommentCard;
