import { useAuthContext } from "../../contexts/AuthProvider";
import {
	Avatar,
	Button,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	FormHelperText,
	IconButton,
	Menu,
	MenuItem,
	Rating,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import PopupState, {
	bindMenu,
	bindTrigger
} from "material-ui-popup-state";
import { useState } from "react";
import { MORE_OPTIONS_ICON } from "../../utils/icon";
import { Controller, useForm } from "react-hook-form";
import {
	errorField,
	validationReview
} from "../../utils/formValidation";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import {
	AVATAR_PATH,
	BEARER_HEADERS,
	UNKNOWN_USER
} from "../../utils/variables";
import { belongsToAuth, dateParse } from "../../utils";
import ReportModule from "../../pages/components/modules/ReportModule";
import { vestResolver } from "@hookform/resolvers/vest";

const ReviewCard = ({ review, mutate }) => {
	const { user } = useAuthContext();

	const [isOpen, setIsOpen] = useState(false);

	const confirm = useConfirm();

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: vestResolver(validationReview),
		defaultValues: {
			content: review?.content,
			stars: review?.stars
		}
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.put(
				`/reviews/edit/${review.id}`,
				data,
				BEARER_HEADERS
			);
			toast.success(response.data.message);
			setIsOpen(false);
			reset();
			mutate();
		} catch (error) {
			toast.error(error.data.message);
		}
	};

	const onDelete = (id) => {
		confirm({
			description: "Supprimer la review ?"
		})
			.then(async () => {
				const response = await axios.delete(
					`/reviews/${id}`,
					BEARER_HEADERS
				);
				toast.success(response.data.message);
				mutate();
			})
			.catch((error) => {
				toast.error(error?.data?.message);
			});
	};

	return (
		<>
			<Card id={"review-" + review.id}>
				<CardHeader
					sx={{ pb: 0 }}
					avatar={<Avatar src={AVATAR_PATH + review?.user?.avatar} />}
					title={
						<Typography component="div" fontWeight="bold">
							{review?.user?.pseudo || UNKNOWN_USER}
						</Typography>
					}
					subheader={dateParse(review.created_at)}
					action={
						belongsToAuth(review.user.id, user.id) ? (
							<PopupState variant="popover" popupId="demo-popup-menu">
								{(popupState) => (
									<>
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
										<Menu {...bindMenu(popupState)} onClick={() => popupState.close()}>
											<MenuItem
												key="modifier"
												onClick={() => setIsOpen(true)}
											>
												Modifier
											</MenuItem>
											<MenuItem
												key="supprimer"
												onClick={() => onDelete(review.id)}
											>
												Supprimer
											</MenuItem>
										</Menu>
									</>
								)}
							</PopupState>
						) : (
							<ReportModule
								placeholder="En quoi cette avis ne convient pas ?"
								targetElement="review_reported_id"
								targetValue={review.id}
							/>
						)
					}
				/>
				<CardContent>
					<Stack spacing={2}>
						<Rating value={review.stars} readOnly />
						<Typography sx={{ whiteSpace: "pre-line" }}>
							{review.content}
						</Typography>
					</Stack>
				</CardContent>
			</Card>
			<Dialog
				fullWidth
				open={isOpen}
				PaperProps={{
					component: "form",
					onSubmit: handleSubmit(onSubmit)
				}}
			>
				<DialogContent>
					<Controller
						control={control}
						name="stars"
						render={({ field: { onChange, value } }) => (
							<>
								<Rating
									onChange={onChange}
									value={Number(value)}
									sx={{ width: "fit-content" }}
									name="size-large"
									size="large"
								/>
								{errors.stars && (
									<FormHelperText>
										{errors.stars.message}
									</FormHelperText>
								)}
							</>
						)}
					/>
					<TextField
						{...register("content")}
						{...errorField(errors?.content)}
						margin="normal"
						fullWidth
						autoFocus
						placeholder="Ecrivez votre commentaire..."
						required
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
						onClick={() => setIsOpen(false)}
					>
						Annuler
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ReviewCard;
