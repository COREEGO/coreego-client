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
	DialogActions,
	DialogContent,
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
	const { updateFilter, searchParam } = useFilterContext();
	const [open, setOpen] = React.useState(false);
	const { cities } = useSelector((state) => state.app);

	const [cityValue, setCityValue] = React.useState(
		searchParam.get("city") || ""
	);
	const [districtValue, setDistrictValue] = React.useState(
		searchParam.get("district") || ""
	);

	React.useEffect(()=>{
		setCityValue(searchParam.get("city"))
		setDistrictValue(searchParam.get("district"))
	}, [searchParam.get("city"), searchParam.get("district") ])

	const selectedCity = React.useMemo(() => {
		return cityValue
			? cities.find((city) => city.id == cityValue)
			: null;
	});

	const districts = React.useMemo(() => {
		return selectedCity?.districts || [];
	}, [selectedCity]);

	const selectedDistrict = React.useMemo(() => {
		return districtValue
			? districts.find((district) => district.id == districtValue)
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
				PaperProps={{
					component: "form",
					onSubmit: (e) => {
						e.preventDefault()
						updateFilter("city", cityValue);
						updateFilter("district", districtValue);
						setOpen(false)
					}
				}}
			>
				<AppBar sx={{ position: "sticky", top: 0 }}>
					<Toolbar>
						<Typography
							sx={{ flex: 1 }}
							variant="h6"
							component="div"
						>
							Localisation
						</Typography>
						<IconButton
							edge="start"
							color="inherit"
							onClick={() => setOpen(false)}
							aria-label="close"
						>
							<CLOSE_ICON />
						</IconButton>
					</Toolbar>
				</AppBar>
				<DialogContent>
					<Stack direction="row">
						<Box borderRight="1px solid grey">
							<List width="fit-content">
								<ListItemButton
									onClick={() => {
										setCityValue("");
										setDistrictValue("");
									}}
									selected={!cityValue}
								>
									<ListItemText primary="Toute la corée" />
								</ListItemButton>

								{cities?.map((city) => {
									return (
										<ListItemButton
											key={city.id}
											onClick={() => {
												setCityValue(city.id.toString());
												setDistrictValue("");
											}}
											selected={cityValue == city.id}
										>
											<ListItemText primary={city.label} />
										</ListItemButton>
									);
								})}
							</List>
						</Box>
						{districts?.length > 0 && (
							<Box>
								<List width="fit-content">
									{districts?.map((district) => {
										return (
											<ListItemButton
												onClick={() =>
													setDistrictValue(district.id.toString())
												}
												selected={districtValue == district.id}
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
				</DialogContent>
				<DialogActions sx={{ boxShadow: 3 }}>
					<Button variant="contained" type="submit">Valider</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default LocalisationFilterRework;
