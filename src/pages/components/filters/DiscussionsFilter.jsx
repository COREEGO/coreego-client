import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Hidden,
	IconButton,
	Stack
} from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
import { CLOSE_ICON, FILTER_ICON } from "../../../utils/icon";
import SearchFilterInput from "./inputs/SearchFilterInput";
import CategoriesFilterInput from "./inputs/CategoriesFilterInput";
import ClearFilterButton from "./inputs/ClearFilterButton";

const DiscussionsFilter = ({ showModal = true }) => {
	const { discussionCategories } = useSelector((state) => state.app);
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
					<CategoriesFilterInput categories={discussionCategories} />
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
									categories={discussionCategories}
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
			<CategoriesFilterInput categories={discussionCategories} />
		</Stack>
	);
};

export default DiscussionsFilter;
