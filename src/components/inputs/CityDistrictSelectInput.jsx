import React from "react";
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
import { CLOSE_ICON, MARKER_ICON } from "../../utils/icon";

const CityDistrictSelectInput = ({
	updateCity,
	cityValue = '',
	updateDistrict = '',
	districtValue,
	emptyLabelButton = "Localisation",
	...props
}) => {

	const [cityCurrentValue, setCityCurrentValue] = React.useState(cityValue)
	const [districtCurrentValue, setDistrictCurrentValue] = React.useState(districtValue)

	const [open, setOpen] = React.useState(false);
	const { cities } = useSelector((state) => state.app);

	const selectedCity = React.useMemo(() => {
		return cityCurrentValue
			? cities.find((city) => city.id == cityCurrentValue)
			: null;
	});

	const districts = React.useMemo(() => {
		return selectedCity?.districts || [];
	}, [selectedCity]);

	const selectedDistrict = React.useMemo(() => {
		return districtCurrentValue
			? districts.find((district) => district.id == districtCurrentValue)
			: null;
	});

	const handleUpdateLocalisation = () => {
		updateCity(cityCurrentValue)
		updateDistrict(districtCurrentValue)
		setOpen(false)
	}

	return (
		<>
			<Button
				{...props}
				variant="outlined"
				onClick={() => setOpen(true)}
				startIcon={<MARKER_ICON />}
				sx={{ textTransform: "inherit" }}
			>
				{selectedCity || selectedDistrict
					? selectedCity?.label +
					  (selectedDistrict ? " - " + selectedDistrict?.label : "")
					: emptyLabelButton}
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
				<DialogContent>
					<Stack direction="row">
						<Box borderRight="1px solid grey">
							<List width="fit-content">
								<ListItemButton
									onClick={() => {
										setCityCurrentValue('');
										setDistrictCurrentValue('');
									}}
									selected={!cityCurrentValue}
								>
									<ListItemText primary="-----" />
								</ListItemButton>

								{cities.map((city) => {
									return (
										<ListItemButton
											key={city.id}
											onClick={() => {
												setCityCurrentValue(city.id);
												setDistrictCurrentValue('');
											}}
											selected={cityCurrentValue == city.id}
										>
											<ListItemText primary={city.label} />
										</ListItemButton>
									);
								})}
							</List>
						</Box>
						{districts.length > 0 && (
							<Box>
								<List width="fit-content">
									{districts.map((district) => {
										return (
											<ListItemButton
												onClick={() =>
													setDistrictCurrentValue(district.id)
												}
												selected={districtCurrentValue == district.id}
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
					<Button onClick={handleUpdateLocalisation} variant="contained" type="submit">
						Valider
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CityDistrictSelectInput;
