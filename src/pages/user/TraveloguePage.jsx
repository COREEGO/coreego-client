import React, { useEffect, useMemo, useState } from "react"; // Import React from 'react'
import LoadingPage from "../../components/LoadingPage";
import { useLocation } from "react-router-dom"; // Import from "react-router-dom"
import TravelLogueModal from "../../components/Modals/TravelLogueModal";

import {
	Box,
	Button,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	Hidden,
	IconButton,
	MenuItem,
	Stack,
	Select,
	Typography
} from "@mui/material";

import HEADER_IMG from "../../images/headers/espace-discussion.jpg";
import PlaceMapCard from "../../components/card/PlaceMapCard";
import { useFilterContext } from "../../contexts/FilterProvider";
import { apiFetch } from "../../http-common/apiFetch";
import axios from "axios";
import { BEARER_HEADERS } from "../../utils/variables";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import { CLOSE_ICON, FILTER_ICON } from "../../utils/icon";
import SearchInput from "../../components/inputs/SearchInput";
import { useSelector } from "react-redux";
import PaginationData from "../../components/PaginationData";
import {
	DateCalendar,
	LocalizationProvider
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import TitleSectionText from "../../components/texts/TitleSectionText";

const TraveloguePage = () => {
	const [isBusy, setIsBusy] = useState(true);
	const [places, setPlaces] = useState([]);

	const [isOpenFilterModal, setIsOpenFilterModal] =
		React.useState(false);

	const { placeCategories, cities } = useSelector(
		(state) => state.app
	);

	const { updateFilter, searchParams } = useFilterContext();

	const location = useLocation();

	useEffect(() => {
		loadData();
	}, [location.search]);

	const loadData = async () => {
		try {
			setIsBusy(true);
			const response = await axios.get(
				`/save-place${location.search}`,
				BEARER_HEADERS
			);
			setPlaces(response.data);
		} catch (error) {
			console.error(error.message.message);
		} finally {
			setIsBusy(false);
		}
	};

	return  (
		<React.Fragment>
			<HeroBannerFeed
				theme="red"
				titleFr="Mon carnet de voyage"
				titleKr="나의 여행담"
				description="
            MACC Essentials has an important role in making
            supplies and services available to customers and
            their patients during this critical time. This
            includes services from various domains. Our aim is
            to aid you. As much we can.
            "
				imageLink={HEADER_IMG}
				imageDirection="end"
			/>

			<Box>
				<Container>
					<Hidden smDown>
						<Stack
							direction="row"
							alignItems="flex-start"
							gap={2}
							flexWrap="wrap"
						>
							<SearchInput
								placeholder="Rechercher une discussion..."
								sx={{
									width: 300,
									maxWidth: "100%"
								}}
								defaultValue={searchParams.get("q")}
								onChange={(value) => updateFilter("q", value)}
							/>
							<Select
								placeholder="Catégorie"
								value={searchParams.get("category") || "0"}
								onChange={(category) =>
									updateFilter(
										"category",
										category.target.value.toString()
									)
								}
							>
								<MenuItem value="0"> Toutes les catégories </MenuItem>
								{placeCategories.map((category) => {
									return (
										<MenuItem key={category.id} value={category.id}>
											{category.label}
										</MenuItem>
									);
								})}
							</Select>
							<Select
								sx={{
									width: "fit-content",
									backgroundColor: "white"
								}}
								placeholder="Villes"
								value={searchParams.get("city") || "0"}
								onChange={(city) =>
									updateFilter("city", city.target.value.toString())
								}
							>
								<MenuItem value="0"> Toutes les villes </MenuItem>
								{cities.map((city) => {
									return (
										<MenuItem key={city.id} value={city.id}>
											{city.label}
										</MenuItem>
									);
								})}
							</Select>
						</Stack>
					</Hidden>
					<Hidden smUp>
						<Box>
							<Button
								fullWidth
								onClick={() => setIsOpenFilterModal(true)}
								variant="outlined"
								startIcon={<FILTER_ICON />}
							>
								Filtres
							</Button>
							<Dialog
								onClose={() => setIsOpenFilterModal(false)}
								open={isOpenFilterModal}
							>
								<DialogTitle display="flex" alignItems="center">
									<FILTER_ICON sx={{ mr: 2 }} /> Filtres{" "}
								</DialogTitle>
								<IconButton
									aria-label="close"
									onClick={() => setIsOpenFilterModal(false)}
									sx={{
										position: "absolute",
										right: 8,
										top: 8
									}}
								>
									<CLOSE_ICON />
								</IconButton>
								<DialogContent dividers>
									<Stack direction="row" gap={2} flexWrap="wrap">
										<SearchInput
											fullWidth
											placeholder="Rechercher une discussion..."
											defaultValue={searchParams.get("q")}
											onChange={(value) => updateFilter("q", value)}
										/>
										<Select
											fullWidth
											placeholder="Catégorie"
											value={searchParams.get("category") || "0"}
											onChange={(category) =>
												updateFilter(
													"category",
													category.target.value.toString()
												)
											}
										>
											<MenuItem value="0">
												Toutes les catégories
											</MenuItem>
											{placeCategories.map((category) => {
												return (
													<MenuItem
														key={category.id}
														value={category.id}
													>
														{category.label}
													</MenuItem>
												);
											})}
										</Select>
										<Select
											fullWidth
											placeholder="Villes"
											value={searchParams.get("city") || "0"}
											onChange={(city) =>
												updateFilter(
													"city",
													city.target.value.toString()
												)
											}
										>
											<MenuItem value="0">Toutes les villes</MenuItem>
											{cities.map((city) => {
												return (
													<MenuItem key={city.id} value={city.id}>
														{city.label}
													</MenuItem>
												);
											})}
										</Select>
									</Stack>
								</DialogContent>
							</Dialog>
						</Box>
					</Hidden>
				</Container>
			</Box>

			{
				isBusy ? <LoadingPage type="data" /> : <Box my={5}>
				<Container>
					{places?.length ? (
						<Stack gap={3}>
							<TitleSectionText
								startText="Lieux à visiter"
								endText="prochainement"
							/>
							<Grid container spacing={2}>
								{places.map((place) => {
									return (
										<Grid key={place.id} item xs={12} sm={6} md={4}>
											<PlaceMapCard
												readOnly={false}
												place={place}
												mutate={loadData}
											/>
										</Grid>
									);
								})}
							</Grid>
						</Stack>
					) : (
						<Typography textAlign="center">
							Aucune lieu trouvé
						</Typography>
					)}
				</Container>
			</Box>
			}

			{places.length ? (
				<TravelLogueModal readOnly={true} places={places} />
			) : (
				<></>
			)}
		</React.Fragment>
	)
};

export default TraveloguePage;
