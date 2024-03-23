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
import CitiesFilterInput from "./inputs/CitiesFilterInput";
import ClearFilterButton from "../../../components/buttons/ClearFilterButton";

const TravelLogueFilter = ({ showModal = true }) => {
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
					<CitiesFilterInput />
					<Box mt={1.5}>
						<ClearFilterButton />
					</Box>
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
							<Stack gap={2}>
								<SearchFilterInput fullWidth />
								<CategoriesFilterInput
									fullWidth
									categories={placeCategories}
								/>
								<CitiesFilterInput fullWidth />
								<Box mt={1.5}>
									<ClearFilterButton />
								</Box>
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
			<CitiesFilterInput />
			<Box mt={1.5}>
				<ClearFilterButton />
			</Box>
		</Stack>
	);
};

export default TravelLogueFilter;
