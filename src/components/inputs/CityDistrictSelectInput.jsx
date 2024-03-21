import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MapSimpleMarker from "../maps/MapSimpleMarker";
import {
	Box,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField
} from "@mui/material";

const CityDistrictSelectInput = ({
	updateCity,
	cityValue,
	updateDistrict,
	districtValue,
	showMap = false,
	withCircle = false,
	labelCity = "Villes",
	labelDistrict = "Districts",
	emptyOptionCity = "Toutes les villes",
	emptyOptionDistict = "Tous les districts"
}) => {
	const { cities } = useSelector((state) => state.app);

	const [selectedCity, setSelectedCity] = useState(cityValue);
	const [selectedDistrict, setSelectedDistrict] =
		useState(districtValue);

	const districts = useMemo(() => {
		const city = cities.find((city) => city.id == selectedCity);
		return city?.districts || null;
	}, [selectedCity, cities]);

	const geopoint = useMemo(() => {
		let localisation = null;

		if (selectedCity && !selectedDistrict) {
			localisation =
				cities.find((city) => city.id == selectedCity) || null;
		} else if (selectedCity && selectedDistrict) {
			localisation =
				districts?.find(
					(district) => district.id == selectedDistrict
				) || null;
		} else {
			localisation = null;
		}

		return localisation
			? {
					latitude: localisation.latitude,
					longitude: localisation.longitude
			  }
			: null;
	}, [selectedDistrict, selectedCity]);

	const handleCityChange = (event) => {
		setSelectedCity(event.target.value);
		setSelectedDistrict("");
	};

	const handleDistrictChange = (event) => {
		setSelectedDistrict(event.target.value);
	};

	useEffect(() => {
		updateCity(selectedCity);
	}, [selectedCity]);

	useEffect(() => {
		updateDistrict && updateDistrict(selectedDistrict);
	}, [selectedDistrict]);

	return (
		<>
			<TextField
				fullWidth
				label={labelCity}
				select
				value={selectedCity}
				onChange={handleCityChange}
			>
				<MenuItem value="">{emptyOptionCity}</MenuItem>
				{cities.map((city) => (
					<MenuItem key={city.id} value={city.id}>
						{city.label}
					</MenuItem>
				))}
			</TextField>

			{districts && districts.length > 0 ? (
				<TextField
					sx={{mt: 2}}
					fullWidth
					label={labelDistrict}
					select
					value={selectedDistrict}
					onChange={handleDistrictChange}
				>
					<MenuItem value="">{emptyOptionDistict}</MenuItem>
					{districts.map((district) => {
						return (
							<MenuItem key={district.id} value={district.id}>
								{district.label}
							</MenuItem>
						);
					})}
				</TextField>
			) : (
				<></>
			)}

			{showMap && geopoint ? (
				<Box sx={{ width: "100%", height: 300 }}>
					<MapSimpleMarker
						withCircle={withCircle}
						lat={geopoint?.latitude}
						lng={geopoint?.longitude}
					/>
				</Box>
			) : (
				<></>
			)}
		</>
	);
};

export default CityDistrictSelectInput;
