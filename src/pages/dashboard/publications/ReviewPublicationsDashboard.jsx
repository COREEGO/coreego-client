import {
    Avatar,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import TitleSectionText from "../../../components/texts/TitleSectionText";
import React from "react";
import axios from "axios";
import { AVATAR_PATH, BEARER_HEADERS } from "../../../utils/variables";
import LoadingPage from "../../../components/LoadingPage";
import PaginationData from "../../../components/PaginationData";
import moment from "moment";
import { useConfirm } from "material-ui-confirm";
import { TRASH_ICON } from "../../../utils/icon";
import { toast } from "react-toastify";

const ReviewPublicationsDashboard = () => {
	const [isBusy, setIsBusy] = React.useState(true);

	const [reviews, setReviews] = React.useState([]);

	React.useEffect(() => {
		loadReviews();
	}, []);

	const loadReviews = async () => {
		try {
			setIsBusy(true);
			const response = await axios.get("/reviews", BEARER_HEADERS);
			setReviews(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusy(false);
		}
	};

    const confirm = useConfirm();

	const deleteReview = async (reviewId) => {
		confirm({ description: "Confirmer la suppression ?" })
			.then(async () => {
				const response = await axios.delete(
					`/reviews/${reviewId}`,
					BEARER_HEADERS
				);
				await loadReviews();
				toast.success(response.data.message);
			})
			.catch((error) => {});
	};

	return (
		<Stack spacing={3}>
			<TitleSectionText endText="Lieux avis" />
			{isBusy ? (
				<LoadingPage type="data" />
			) : reviews.data.length ? (
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Utilisateur</TableCell>
								<TableCell>Content</TableCell>
								<TableCell>Etoiles</TableCell>
								<TableCell>Date publication</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{reviews.data.map((review) => {
								return (
									<TableRow key={review.id}>
										<TableCell component="th" scope="row">
											<Stack
												direction="row"
												alignItems="center"
												spacing={1}
											>
												<Avatar
													sx={{ width: 40, height: 40 }}
													src={AVATAR_PATH + review.user.avatar}
												/>
												<Typography fontWeight="bold">
													{review.user.pseudo}
												</Typography>
											</Stack>
										</TableCell>
                                        <TableCell component="th" scope="row">
                                            {review.content}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {review.stars}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                        {moment(review.created_at).format(
												"D MMMM YYYY"
											)}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
											<IconButton
												color="error"
												onClick={() => deleteReview(review.id)}
											>
												<TRASH_ICON />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography>Aucun commentaires</Typography>
			)}
			<PaginationData
				sx={{ mt: 3 }}
				lastPage={reviews?.meta?.last_page}
			/>
		</Stack>
	);
};

export default ReviewPublicationsDashboard;
