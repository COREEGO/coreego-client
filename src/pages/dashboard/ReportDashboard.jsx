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
import React from "react";
import TitleSectionText from "../../components/texts/TitleSectionText";
import axios from "axios";
import { AVATAR_PATH, BEARER_HEADERS } from "../../utils/variables";
import LoadingPage from "../../components/LoadingPage";
import { NavLink } from "react-router-dom";
import { EYE_ICON, TRASH_ICON } from "../../utils/icon";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";

const ReportDashboard = () => {
	const [isBusy, setIsBusy] = React.useState(true);
	const [reports, setReports] = React.useState([]);

	React.useEffect(() => {
		loadReports();
	}, []);

	const loadReports = async () => {
		try {
			setIsBusy(true);
			const response = await axios.get("/reports", BEARER_HEADERS);
			setReports(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusy(false);
		}
	};
    const confirm = useConfirm();

	const deleteReport = async (reportId) => {
		confirm({ description: "Confirmer la suppression ?" })
			.then(async () => {
				const response = await axios.delete(
					`/reports/${reportId}`,
					BEARER_HEADERS
				);
				await loadReports();
				toast.success(response.data.message);
			})
			.catch((error) => {});
	};

	return (
		<Stack spacing={3}>
			<TitleSectionText endText="Signalements" />
			{isBusy ? (
				<LoadingPage type="data" />
			) : (
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Utilisateur</TableCell>
								<TableCell>Contenu</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						{isBusy ? (
							<LoadingPage type="data" />
						) : (
							<TableBody>
								{reports.map((report) => {
									return (
										<TableRow key={report.id}>
											<TableCell component="th" scope="row">
												<Stack
													direction="row"
													alignItems="center"
													spacing={1}
												>
													<Avatar
														sx={{ width: 40, height: 40 }}
														src={AVATAR_PATH + report.user.avatar}
													/>
													<Typography fontWeight="bold">
														{report.user.pseudo}
													</Typography>
												</Stack>
											</TableCell>
											<TableCell component="th" scope="row">
												{report.content}
											</TableCell>
											<TableCell component="th" scope="row">
												{report?.place && (
													<>
														Lieu
														<NavLink
															to={`/voyage/place/${report.place.slug}`}
														>
															<IconButton color="primary">
																<EYE_ICON />
															</IconButton>
														</NavLink>
													</>
												)}
												{report?.discussion && (
													<>
														Discussion
														<NavLink
															to={`/forum/discussion/${report.discussion.slug}`}
														>
															<IconButton color="primary">
																<EYE_ICON />
															</IconButton>
														</NavLink>
													</>
												)}
												{report?.product && (
													<>
														Produit
														<NavLink
															to={`/marketplace/produit/${report.product.slug}`}
														>
															<IconButton color="primary">
																<EYE_ICON />
															</IconButton>
														</NavLink>
													</>
												)}
												{report?.comment && (
													<>
														Commentaire
														<NavLink
															to={`/dashboard/publication/comments?id=${report.comment.id}`}
														>
															<IconButton color="primary">
																<EYE_ICON />
															</IconButton>
														</NavLink>
													</>
												)}
												{report?.review && (
													<>
														Avis
														<NavLink
															to={`/dashboard/publication/reviews?id=${report.review.id}`}
														>
															<IconButton color="primary">
																<EYE_ICON />
															</IconButton>
														</NavLink>
													</>
												)}
											</TableCell>
											<TableCell component="th" scope="row">
												<IconButton
													color="error"
													onClick={() => deleteReport(report.id)}
												>
													<TRASH_ICON />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						)}
					</Table>
				</TableContainer>
			)}
		</Stack>
	);
};

export default ReportDashboard;
