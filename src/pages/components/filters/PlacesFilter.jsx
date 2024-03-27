import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Hidden,
	IconButton,
	MenuItem,
	Stack,
	TextField
} from "@mui/material";
import SearchInput from "../../../components/inputs/SearchInput";
import { useSelector } from "react-redux";
import React from "react";
import { useFilterContext } from "../../../contexts/FilterProvider";
import CityDistrictSelectInput from "../../../components/inputs/CityDistrictSelectInput";
import {
	CLOSE_ICON,
	FILTER_ICON,
	GEOLOCALISATION_ICON
} from "../../../utils/icon";
import SearchFilterInput from "./inputs/SearchFilterInput";
import CategoriesFilterInput from "./inputs/CategoriesFilterInput";
import LocalisationFilterInput from "./inputs/LocalisationFilterInput";
import ClearFilterButton from "./inputs/ClearFilterButton";
import { getMyGeoLocalisation } from "../../../utils";
import GeoLocalisationFilterInput from "./inputs/GeoLocalisationFilterInput";

const PlacesFilter = ({ showModal = true }) => {
	const { placeCategories } = useSelector((state) => state.app);
	const [isOpenFilterModal, setIsOpenFilterModal] =
		React.useState(false);

	return showModal ? (
		<>
			<Hidden smDown>
				<Stack
					direction="row"
					alignItems="flex-start"
					gap={2}
					flexWrap="wrap"
				>
					<ClearFilterButton />
					<SearchFilterInput />
					<CategoriesFilterInput categories={placeCategories} />
					<Box width={250} maxWidth="100%">
						<LocalisationFilterInput />
					</Box>
						<GeoLocalisationFilterInput />
				</Stack>
			</Hidden>

			<Hidden smUp>
				<Box>
					<Button
						size="large"
						fullWidth
						onClick={() => setIsOpenFilterModal(true)}
						variant="outlined"
						startIcon={<FILTER_ICON />}
					>
						Filtres
					</Button>
					<Dialog
						fullWidth
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
							<Stack direction="column" gap={2}>
								<SearchFilterInput fullWidth />
								<CategoriesFilterInput
									fullWidth
									categories={placeCategories}
								/>
								<LocalisationFilterInput />
								<GeoLocalisationFilterInput />
							</Stack>
						</DialogContent>
						<DialogActions>
						<ClearFilterButton />
						</DialogActions>
					</Dialog>
				</Box>
			</Hidden>
		</>
	) : (
		<Stack
			direction="row"
			alignItems="flex-start"
			gap={2}
			flexWrap="wrap"
		>
			<ClearFilterButton />
			<SearchFilterInput />
			<CategoriesFilterInput categories={placeCategories} />
			<Box width={250} maxWidth="100%">
				<LocalisationFilterInput />
			</Box>
			<Box mt={1.5}>
				<GeoLocalisationFilterInput />
			</Box>
		</Stack>
	);
};

export default PlacesFilter;
