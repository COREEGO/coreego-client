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
import {
	AVATAR_PATH,
	BEARER_HEADERS,
	UNKNOWN_USER
} from "../../../utils/variables";
import LoadingPage from "../../../components/LoadingPage";
import PaginationData from "../../../components/PaginationData";
import moment from "moment";
import { EYE_ICON, TRASH_ICON } from "../../../utils/icon";
import { useConfirm } from "material-ui-confirm";
import CommentsFilter from "../../components/filters/CommentsFilter";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const CommentsPublicationsDashboard = () => {
	const [isBusy, setIsBusy] = React.useState(true);

	const [comments, setComments] = React.useState([]);
	const location = useLocation();

	React.useEffect(() => {
		loadComments();
	}, [location.search]);

	const loadComments = async () => {
		try {
			setIsBusy(true);
			const response = await axios.get(
				`/comments${location.search}`,
				BEARER_HEADERS
			);
			setComments(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusy(false);
		}
	};

	const confirm = useConfirm();

	const deleteComment = async (commentId) => {
		confirm({ description: "Confirmer la suppression ?" })
			.then(async () => {
				await axios.delete(
					`/comments/${commentId}`,
					BEARER_HEADERS
				);
				await loadComments();
			})
			.catch((error) => {});
	};

	return (
		<Stack spacing={3}>
			<TitleSectionText endText="Commentaires" />
			<CommentsFilter />
			{isBusy ? (
				<LoadingPage type="data" />
			) : comments.data.length ? (
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Utilisateur</TableCell>
								<TableCell>Content</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>Date publication</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{comments?.data?.map((comment) => {
								return (
									<TableRow key={comment.id}>
										<TableCell component="th" scope="row">
											<Stack
												direction="row"
												alignItems="center"
												spacing={1}
											>
												<Avatar
													sx={{ width: 40, height: 40 }}
													src={AVATAR_PATH + comment?.user?.avatar}
												/>
												<Typography fontWeight="bold">
													{comment?.user?.pseudo || UNKNOWN_USER}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell component="th" scope="row">
											{comment.content}
										</TableCell>
										<TableCell component="th" scope="row">
											{comment?.place && (
												<>
													Lieu
													<NavLink
														to={`/voyage/place/${comment.place.slug}`}
													>
														<IconButton color="primary">
															<EYE_ICON />
														</IconButton>
													</NavLink>
												</>
											)}
											{comment?.discussion && (
												<>
													Discussion
													<NavLink
														to={`/forum/discussion/${comment.discussion.slug}`}
													>
														<IconButton color="primary">
															<EYE_ICON />
														</IconButton>
													</NavLink>
												</>
											)}
										</TableCell>
										<TableCell component="th" scope="row">
											{moment(comment.created_at).format(
												"D MMMM YYYY"
											)}
										</TableCell>
										<TableCell component="th" scope="row">
											<IconButton
												color="error"
												onClick={() => deleteComment(comment.id)}
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
				lastPage={comments?.meta?.last_page}
			/>
		</Stack>
	);
};

export default CommentsPublicationsDashboard;
