import React from "react";
import { useFilterContext } from "../../../../contexts/FilterProvider";
import {
	CLOSE_ICON,
	LOCALISATION_ICON,
	MARKER_ICON
} from "../../../../utils/icon";
import { useSelector } from "react-redux";
import {
	AppBar,
	Box,
	Button,
	Dialog,
	Divider,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Stack,
	Toolbar,
	Typography
} from "@mui/material";

const LocalisationFilterRework = () => {
	const { updateFilter, searchParams } = useFilterContext();
	const [open, setOpen] = React.useState(false);
	const { cities } = useSelector((state) => state.app);

	const selectedCity = React.useMemo(() => {
		return searchParams.get("city")
			? cities.find((city) => city.id == searchParams.get("city"))
			: null;
	});

	const districts = React.useMemo(() => {
		return selectedCity?.districts || [];
	}, [selectedCity]);

	const selectedDistrict = React.useMemo(() => {
		return searchParams.get("district")
			? districts.find(
					(district) => district.id == searchParams.get("district")
			  )
			: null;
	});

	return (
		<>
			<Button
			variant="outlined"
				onClick={() => setOpen(true)}
				startIcon={<MARKER_ICON />}
				sx={{ textTransform: "inherit" }}
			>
				{selectedCity || selectedDistrict
					? selectedCity?.label +
					  (selectedDistrict ? " - " + selectedDistrict?.label : "")
					: "Toute la corée"}
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
			>
				<AppBar sx={{ position: "sticky", top: 0 }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={() => setOpen(false)}
							aria-label="close"
						>
							<CLOSE_ICON />
						</IconButton>
						<Typography
							sx={{ ml: 2, flex: 1 }}
							variant="h6"
							component="div"
						>
							Localisation
						</Typography>
					</Toolbar>
				</AppBar>
				<Stack direction="row">
					<Box>
						<List width="fit-content">
							<ListItemButton
								onClick={() => updateFilter("city", "")}
								selected={!searchParams.get("city")}
							>
								<ListItemText primary="Toute la corée" />
							</ListItemButton>

							{cities.map((city) => {
								return (
									<ListItemButton
										key={city.id}
										onClick={() =>
											updateFilter("city", city.id.toString())
										}
										selected={searchParams.get("city") == city.id}
									>
										<ListItemText primary={city.label} />
									</ListItemButton>
								);
							})}
						</List>
					</Box>
					<Divider orientation="vertical" />
					{districts.length > 0 && (
						<Box>
							<List width="fit-content">
								{districts.map((district) => {
									return (
										<ListItemButton
											onClick={() =>
												updateFilter("district", district.id.toString())
											}
											selected={
												searchParams.get("district") == district.id
											}
											key={district.id}
										>
											<ListItemText primary={district.label} />
										</ListItemButton>
									);
								})}
							</List>
						</Box>
					)}
				</Stack>
			</Dialog>
		</>
	);
};

export default LocalisationFilterRework;
