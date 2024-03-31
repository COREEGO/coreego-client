import {
	Box,
	Button,
	ListItemIcon,
	Menu,
	MenuItem,
	TextField,
	Typography
} from "@mui/material";
import React from "react";
import { CATEGORY_ICON, CIRCLE_ICON } from "../../../../utils/icon";
import { useFilterContext } from "../../../../contexts/FilterProvider";

const CategoryFilterRework = ({ categories }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { updateFilter, searchParams } = useFilterContext();

	const selectedCategory = React.useMemo(() => {
		return searchParams.get("category")
			? categories.find(
					(category) => category.id == searchParams.get("category")
			  )
			: null;
	});

	return (
		<>
			<Button
			variant="outlined"
				startIcon={
					selectedCategory ? (
						<CIRCLE_ICON color={selectedCategory.color} />
					) : (
						<CATEGORY_ICON />
					)
				}
				onClick={(event) => setAnchorEl(event.currentTarget)}
			>
				{selectedCategory
					? selectedCategory.label
					: "Toutes les catégories"}
			</Button>
			<Menu
				onClick={() => setAnchorEl(null)}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
			>
				<MenuItem
					value=""
					onClick={() => updateFilter("category", "")}
				>
					Toutes les catégories
				</MenuItem>
				{categories.map((category) => (
					<MenuItem
						onClick={() =>
							updateFilter("category", category.id.toString())
						}
						selected={searchParams.get("category") == category.id}
						key={category.id}
						value={category.id}
					>
						<ListItemIcon>
							<CIRCLE_ICON color={category.color} />
						</ListItemIcon>
							{category.label}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default CategoryFilterRework;
