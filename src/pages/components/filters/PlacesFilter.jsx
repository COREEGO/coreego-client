import {
	Box,
	Button,
	Dialog,
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
import { CLOSE_ICON, FILTER_ICON } from "../../../utils/icon";
import SearchFilterInput from "./inputs/SearchFilterInput";
import CategoriesFilterInput from "./inputs/CategoriesFilterInput";
import LocalisationFilterInput from "./inputs/LocalisationFilterInput";
import ClearFilterButton from "../../../components/buttons/ClearFilterButton";

const PlacesFilter = ({ showModal = true }) => {
	const { placeCategories } = useSelector((state) => state.app);
	const [isOpenFilterModal, setIsOpenFilterModal] =
		React.useState(false);

	const { updateFilter, searchParams, clearFilters } =
		useFilterContext();

	return showModal ? (
		<>
			<Hidden smDown>
				<Stack
					direction="row"
					alignItems="flex-start"
					gap={2}
					flexWrap="wrap"
				>
					<SearchFilterInput />
					<CategoriesFilterInput categories={placeCategories} />
					<Box width={250} maxWidth="100%">
						<LocalisationFilterInput />
					</Box>
					<Box mt={1.5}>
						<ClearFilterButton />
					</Box>
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

								<ClearFilterButton />
							</Stack>
						</DialogContent>
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
			<SearchFilterInput />
			<CategoriesFilterInput categories={placeCategories} />
			<Box width={250} maxWidth="100%">
				<LocalisationFilterInput />
			</Box>
			<Box mt={1.5}>
				<ClearFilterButton />
			</Box>
		</Stack>
	);
};

export default PlacesFilter;
