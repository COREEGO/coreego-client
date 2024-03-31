import CommentCard from "../../../components/card/CommentCard";
import { useMemo } from "react";
import {
	errorField,
	validationComment
} from "../../../utils/formValidation";
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
	DialogActions
} from "@mui/material";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import TitleSectionText from "../../../components/texts/TitleSectionText";
import axios from "axios";
import { BEARER_HEADERS } from "../../../utils/variables";
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useNavigate } from "react-router";

const CommentModule = ({
	comments,
	discussionId = null,
	placeId = null,
	mutate
}) => {
	const [open, setOpen] = React.useState(false);

	const {user} = useAuthContext()

	const navigate = useNavigate()

	const commentList = useMemo(() => {
		return comments.sort((a, b) => {
			return (
				new Date(b.created_at).getTime() -
				new Date(a.created_at).getTime()
			);
		});
	}, [comments]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: vestResolver(validationComment)
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"/comments",
				{
					discussion_id: discussionId,
					place_id: placeId,
					content: data.content
				},
				BEARER_HEADERS
			);

			toast.success(response.data.message);

			reset();
			mutate();
			setOpen(false);
		} catch (error) {
			toast.success(error?.data?.message);
		}
	};

	return (
		<Box>
			<Container>
				<Stack spacing={2}>
					<TitleSectionText
						startText="écrire un"
						endText="commentaire"
					/>
					<Box onClick={() => user ? setOpen(true) : navigate('/login') }>
						<TextField
							sx={{ zIndex: -1 }}
							fullWidth
							placeholder="J'écris mon commentaire..."
						/>
					</Box>
					{commentList.length ? (
						<Stack spacing={1}>
							{commentList.map((comment) => {
								return (
									<CommentCard
										mutate={mutate}
										key={comment.id}
										comment={comment}
									/>
								);
							})}
						</Stack>
					) : (
						<></>
					)}
				</Stack>
			</Container>
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
						onClick={() => setOpen(false)}
					>
						Annuler
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default CommentModule;
