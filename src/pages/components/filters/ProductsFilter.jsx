import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormGroup,
	FormLabel,
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
import DoubleSliderInput from "../../../components/inputs/DoubleSliderInput";
import SearchFilterInput from "./inputs/SearchFilterInput";
import LocalisationFilterInput from "./inputs/LocalisationFilterInput";
import PriceFilterInput from "./inputs/PriceFilterInput";
import ClearFilterButton from "./inputs/ClearFilterButton";

const ProductsFilter = ({ showModal = true, data }) => {
	const [isOpenFilterModal, setIsOpenFilterModal] =
		React.useState(false);

	return showModal ? (
		<>
			<Hidden mdDown>
				<Stack
					direction="row"
					alignItems="flex-start"
					gap={2}
					flexWrap="wrap"
				>
					<ClearFilterButton />
					<SearchFilterInput />
					<Box width={250} maxWidth="100%">
						<LocalisationFilterInput />
					</Box>
					{data && (
						<Box width={400} maxWidth="100%">
							<PriceFilterInput
								rangeValue={[data?.min_price, data?.max_price]}
							/>
						</Box>
					)}
				</Stack>
			</Hidden>
			<Hidden mdUp>
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
							<Stack gap={2}>
								<SearchFilterInput fullWidth />
								<LocalisationFilterInput />
								<PriceFilterInput
									rangeValue={[data?.min_price, data?.max_price]}
								/>
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
			<Box width={250} maxWidth="100%">
				<LocalisationFilterInput />
			</Box>
			<Box width={250} maxWidth="100%">
				{data && (
					<Box width={400} maxWidth="100%">
						<PriceFilterInput
							rangeValue={[data?.min_price, data?.max_price]}
						/>
					</Box>
				)}
			</Box>
		</Stack>
	);
};

export default ProductsFilter;
