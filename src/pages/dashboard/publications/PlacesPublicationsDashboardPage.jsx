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
	Typography
} from "@mui/material";
import TitleSectionText from "../../../components/texts/TitleSectionText";
import React from "react";
import LoadingPage from "../../../components/LoadingPage";
import axios from "axios";
import { AVATAR_PATH } from "../../../utils/variables";
import PaginationData from "../../../components/PaginationData";
import CategoryText from "../../../components/texts/CategoryText";
import { useLocation } from "react-router";
import { MARKER_ICON } from "../../../utils/icon";
import OptionPublicationButton from "../../../components/buttons/OptionPublicationButton";
import moment from "moment";
import PlacesFilter from "../../components/filters/PlacesFilter";

const PlacesPublicationsDashboardPage = () => {
	const [places, setPlaces] = React.useState([]);
	const [isBusy, setIsBusy] = React.useState(true);

	const location = useLocation();

	React.useEffect(() => {
		loadPlaces();
	}, [location.search]);

	const loadPlaces = async () => {
		try {
			setIsBusy(true);
			const response = await axios.get(`/places${location.search}`);
			setPlaces(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<Stack spacing={3}>
			<TitleSectionText endText="Lieux" />

			<PlacesFilter showModal={false} />

			{isBusy ? (
				<LoadingPage type="data" />
			) : (
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Utilisateur</TableCell>
								<TableCell>Titre</TableCell>
								<TableCell>Catégorie</TableCell>
								<TableCell>Localisation</TableCell>
								<TableCell>Date publication</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{places?.data.map((place) => {
								return (
									<TableRow key={place.id}>
										<TableCell component="th" scope="row">
											<Stack
												direction="row"
												alignItems="center"
												spacing={1}
											>
												<Avatar
													sx={{ width: 40, height: 40 }}
													src={AVATAR_PATH + place.user.avatar}
												/>
												<Stack>
													<Typography fontWeight="bold">
														{place.user.pseudo}
													</Typography>
												</Stack>
											</Stack>
										</TableCell>
										<TableCell component="th" scope="row">
											{place.title}
										</TableCell>
										<TableCell component="th" scope="row">
											<CategoryText category={place.category} />
										</TableCell>
										<TableCell component="th" scope="row">
											<Stack direction="row">
												<MARKER_ICON />
												<Typography noWrap component="div">
													{place.city.label},{place.district.label}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell component="th" scope="row">
											{moment(place.created_at).format("D MMMM YYYY")}
										</TableCell>
										<TableCell component="th" scope="row">
											<OptionPublicationButton
												editLink={`/voyage/place/edit/${place.slug}`}
												deleteUrl={`/places/${place.id}`}
												mutate={loadPlaces}
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			<PaginationData lastPage={places?.meta?.last_page} />
		</Stack>
	);
};

export default PlacesPublicationsDashboardPage;
