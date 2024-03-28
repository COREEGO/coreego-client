import { useAuthContext } from "../../../contexts/AuthProvider";
import { Controller, useForm } from "react-hook-form";
import {
	errorField,
	noEmptyValidator,
	validationReview
} from "../../../utils/formValidation";
import ReviewCard from "../../../components/card/ReviewCard";
import StarsAverageIcon from "../../../components/icons/StarsAverageIcon";
import { useMemo, useState } from "react";
import {
	AppBar,
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	Drawer,
	FormControl,
	FormHelperText,
	IconButton,
	Rating,
	Stack,
	TextField,
	Toolbar,
	Typography
} from "@mui/material";
import { CLOSE_ICON } from "../../../utils/icon";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import axios from "axios";
import { BEARER_HEADERS } from "../../../utils/variables";
import { useNavigate } from "react-router";
import { vestResolver } from "@hookform/resolvers/vest";

const ReviewModule = ({ placeId, mutate, reviews, average }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenForm, setIsOpenForm] = useState(false);
	const { user } = useAuthContext();

	const navigate = useNavigate();

	const reviewList = useMemo(() => {
		return reviews.sort((a, b) => {
			return (
				new Date(b.created_at).getTime() -
				new Date(a.created_at).getTime()
			);
		});
	}, [reviews]);

	const currentUserReview = useMemo(() => {
		return reviews.find((review) => review?.user?.id === user?.id);
	}, [reviews]);

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: vestResolver(validationReview)
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"/reviews",
				{
					place_id: placeId,
					stars: data.stars,
					content: data.content
				},
				BEARER_HEADERS
			);

			toast.success(response.data.message);
			setIsOpenForm(false);
			reset();
			mutate();
		} catch (error) {
			toast.error(error?.data?.message);
		}
	};

	const handleScrollToReview = () => {
		const reviewElement = document.getElementById(
			`review-${currentUserReview.id}`
		);
		if (reviewElement) {
			reviewElement.scrollIntoView({ behavior: "auto" });
		}
	};

	return (
		<>
			<Button
				sx={{ width: "fit-content" }}
				variant="outlined"
				onClick={() => setIsOpen(true)}
			>
				<StarsAverageIcon datas={average} />
			</Button>
			<Drawer
				sx={{
					".MuiDrawer-paper": {
						width: 500,
						maxWidth: "100%"
					}
				}}
				anchor="left"
				open={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<AppBar
					position="sticky"
					sx={{ top: 0, backgroundColor: "white" }}
				>
					<Toolbar>
						<Stack spacing={1} direction="row" sx={{ flexGrow: 1 }}>
							<Typography color="black" variant="h6" component="div">
								Reviews
							</Typography>
							{!currentUserReview ? (
								<Button
									variant="contained"
									size="small"
									onClick={() =>
										user ? setIsOpenForm(true) : navigate("/login")
									}
								>
									Ajouter
								</Button>
							) : (
								<Button
									component="a"
									onClick={handleScrollToReview}
									variant="contained"
									size="small"
								>
									Ma review
								</Button>
							)}
						</Stack>
						<IconButton
							edge="end"
							onClick={() => setIsOpen(false)}
							aria-label="close"
						>
							<CLOSE_ICON />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Container sx={{ my: 2 }}>
					{reviewList.length ? (
						<Stack>
							{reviewList.map((review) => {
								return (
									<ReviewCard
										mutate={mutate}
										key={review.id}
										review={review}
									/>
								);
							})}
						</Stack>
					) : (
						"Aucun avis"
					)}
				</Container>
			</Drawer>
			<Dialog
				fullWidth
				open={isOpenForm}
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
						fullWidth
						{...register("content")}
						{...errorField(errors?.content)}
						margin="normal"
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
						onClick={() => setIsOpenForm(false)}
					>
						Annuler
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ReviewModule;
