import {
	TextField,
	MenuItem,
	ListItemIcon,
	Typography,
	Menu,
    Button
} from "@mui/material";
import { useFilterContext } from "../../../../contexts/FilterProvider";
import { STAR_ICON } from "../../../../utils/icon";
import React from "react";

const StarsFilterRework = ({ ...props }) => {
	const { updateFilter, searchParam } = useFilterContext();
	const [anchorEl, setAnchorEl] = React.useState(null);

	return (
		<React.Fragment>
			<Button
				variant="outlined"
				startIcon={<STAR_ICON sx={{ color: "orange" }}/>}
				onClick={(event) => setAnchorEl(event.currentTarget)}
			>
				{searchParam.get("stars")
					? searchParam.get("stars")
					: "Toutes les notes"}
			</Button>
			<Menu
				onClick={() => setAnchorEl(null)}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
			>
                <MenuItem
                onClick={() => updateFilter('stars', '' )}
                selected={!searchParam.get('stars')}>Toutes les notes</MenuItem>
				{Array.from({ length: 5 }, (_, index) => index + 1).map(
					(value) => (
						<>
							<MenuItem
                            selected={searchParam.get('stars') == value}
                            onClick={() => updateFilter('stars', value.toString() )} key={value} value={value}>
								<ListItemIcon>
									<STAR_ICON sx={{ color: "orange" }} />
								</ListItemIcon>
								{value}
							</MenuItem>
						</>
					)
				)}
			</Menu>
		</React.Fragment>
	);
};

export default StarsFilterRework;
