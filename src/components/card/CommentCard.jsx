import { useAuthContext } from "../../contexts/AuthProvider";
import { MdBorderColor, MdDelete, MdMoreVert } from "react-icons/md";
import { apiFetch } from "../../http-common/apiFetch";
import { SubmitHandler, useForm } from "react-hook-form";
import { noEmptyValidator } from "../../utils/formValidation";
import UserSniped from "../react-ux/UserSniped";
import {
	Card,
	CardContent,
	Menu,
	Stack,
	Box,
	IconButton,
	MenuList,
	MenuItem,
	Popover,
	Avatar,
	Typography,
	DialogTitle,
	DialogContent,
	FormControl,
	TextField,
	FormHelperText,
	Button,
	Dialog,
	CardHeader
} from "@mui/material";
import { MORE_OPTIONS_ICON } from "../../utils/icon";
import React, { useMemo, useState } from "react";
import PopupState, {
	bindTrigger,
	bindMenu,
	bindPopover
} from "material-ui-popup-state";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { belongsToAuth, dateParse } from "../../utils";
import { AVATAR_PATH, BEARER_HEADERS } from "../../utils/variables";
import axios from "axios";
import ReportModule from "../../pages/components/modules/ReportModule";
import moment from "moment";

const CommentCard = ({ comment, mutate }) => {
	const confirm = useConfirm();

	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm({
		mode: "onTouched",
		defaultValues: {
			content: comment?.content
		}
	});

	const { user } = useAuthContext();

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
			toast.error(error.data.message);
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
				toast.error(error.data.message);
			});
	};

	return (
		<>
			<Card id={`comment-${comment.id}`} variant="outlined" sx={{ width: "100%" }}>
				<CardHeader
					avatar={<Avatar src={AVATAR_PATH + comment.user.avatar} />}
					title={
						<Typography component="div" fontWeight="bold">
							{comment.user.pseudo}
						</Typography>
					}
					subheader={dateParse(comment.created_at)}
					action={
						belongsToAuth(comment.user.id, user.id) ? (
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
										<Menu {...bindMenu(popupState)}>
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
			{comment.user.id === user.id && (
				<Dialog
					open={open}
					maxWidth="md"
					onClose={() => setOpen(false)}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						Ajouter un commentaire
					</DialogTitle>
					<DialogContent>
						<Stack component="form" onSubmit={handleSubmit(onSubmit)}>
							<FormControl
								variant="standard"
								fullWidth
								sx={{ width: 500, maxWidth: "100%" }}
							>
								<TextField
									error={errors.content ? true : false}
									autoFocus
									placeholder="Ecrivez votre commentaire..."
									required
									multiline
									rows={10}
									{...register("content", { ...noEmptyValidator })}
								/>
								{errors.content && (
									<FormHelperText id="component-error-text">
										{errors.content.message}
									</FormHelperText>
								)}
							</FormControl>
							<Stack direction="row" sx={{ mt: 3 }}>
								<LoadingButton loading={isSubmitting} type="submit">
									Modifier
								</LoadingButton>
								<Button onClick={() => setOpen(false)}>
									Annuler
								</Button>
							</Stack>
						</Stack>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default CommentCard;
