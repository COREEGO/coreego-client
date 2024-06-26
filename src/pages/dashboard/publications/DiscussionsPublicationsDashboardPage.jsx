import {
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Avatar,
	Typography,
} from "@mui/material";
import TitleSectionText from "../../../components/texts/TitleSectionText";
import React from "react";
import LoadingPage from "../../../components/LoadingPage";
import axios from "axios";
import { AVATAR_PATH, UNKNOWN_USER } from "../../../utils/variables";
import PaginationData from "../../../components/PaginationData";
import CategoryText from "../../../components/texts/CategoryText";
import { useLocation } from "react-router";
import OptionPublicationButton from "../../../components/buttons/OptionPublicationButton";
import moment from "moment";
import DiscussionsFilter from "../../components/filters/DiscussionsFilter";

const DiscussionsPublicationsDashboardPage = () => {
	const [discussions, setDiscussions] = React.useState([]);
	const [isBusy, setIsBusy] = React.useState(true);

	const location = useLocation();

	React.useEffect(() => {
		loadDiscussions();
	}, [location.search]);

	const loadDiscussions = async () => {
		try {
			setIsBusy(true);
			const response = await axios.get(
				`/discussions${location.search}`
			);
			setDiscussions(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusy(false);
		}
	};


	return (
		<Stack spacing={3}>
			<TitleSectionText endText="Discussions" />

			<DiscussionsFilter showModal={false} />

			{isBusy ? <LoadingPage type="data" /> : <TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Utilisateur</TableCell>
							<TableCell>Titre</TableCell>
							<TableCell>Catégorie</TableCell>
							<TableCell>Date publication</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
						<TableBody>
							{ discussions?.data?.map((discussion) => {
								return (
									<TableRow key={discussion.id}>
										<TableCell component="th" scope="row">
											<Stack
												direction="row"
												alignItems="center"
												spacing={1}
											>
												<Avatar
													sx={{ width: 40, height: 40 }}
													src={
														AVATAR_PATH + discussion?.user?.avatar
													}
												/>
												<Typography fontWeight="bold">{discussion?.user?.pseudo || UNKNOWN_USER}</Typography>
											</Stack>
										</TableCell>
										<TableCell component="th" scope="row">
											{discussion.title}
										</TableCell>
										<TableCell component="th" scope="row">
											<CategoryText category={discussion.category} />
										</TableCell>
										<TableCell component="th" scope="row">
											{moment(discussion.created_at).format(
												"D MMMM YYYY"
											)}
										</TableCell>
										<TableCell component="th" scope="row">
											<OptionPublicationButton
												editLink={`/forum/discussion/modification/${discussion.slug}`}
												deleteUrl={`/discussions/${discussion.id}`}
												redirectionUrl={
													"/dashboard/publication/discussions"
												}
												mutate={loadDiscussions}
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
				</Table>
			</TableContainer>}
			<PaginationData lastPage={discussions?.meta?.last_page} />
		</Stack>
	);
};

export default DiscussionsPublicationsDashboardPage;
