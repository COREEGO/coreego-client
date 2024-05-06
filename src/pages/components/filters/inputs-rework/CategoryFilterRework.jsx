import {
	Button,
	ListItemIcon,
	Menu,
	MenuItem} from "@mui/material";
import React from "react";
import { CATEGORY_ICON, CIRCLE_ICON } from "../../../../utils/icon";
import { useFilterContext } from "../../../../contexts/FilterProvider";

const CategoryFilterRework = ({ categories }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { updateFilter, searchParam } = useFilterContext();

	const selectedCategory = React.useMemo(() => {
		return searchParam.get("category")
			? categories.find(
					(category) => category.id == searchParam.get("category")
			  )
			: null;
	});

	return (
		<>
			<Button
				data-testid="button-list"
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
				data-testid="list"
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
				{categories?.map((category) => (
					<MenuItem
						data-testid="list-item"
						onClick={() =>
							updateFilter("category", category.id.toString())
						}
						selected={searchParam.get("category") == category.id}
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
