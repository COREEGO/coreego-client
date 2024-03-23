import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MapSimpleMarker from "../maps/MapSimpleMarker";
import { Box, MenuItem, TextField } from "@mui/material";

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

	const handleCityChange = useCallback(
		(event) => {
			updateCity(event.target.value);
			updateDistrict("");
		},
		[updateCity, cityValue]
	);

	const handleDistrictChange = useCallback(
		(event) => {
			const districtId = event.target.value;
			updateDistrict && updateDistrict(districtId);
		},
		[updateDistrict, districtValue]
	);

	const districts = useMemo(() => {
		const selectedCityData = cities.find(
			(city) => city.id == cityValue
		);
		return selectedCityData ? selectedCityData.districts || [] : [];
	}, [cities, cityValue]);

	const geopoint = useMemo(() => {
		const selectedLocation =
			districts.find(
				(district) => district.id === districtValue
			) || cities.find((city) => city.id === cityValue);
		return selectedLocation
			? {
					latitude: selectedLocation.latitude,
					longitude: selectedLocation.longitude
			  }
			: null;
	}, [cities, districts, cityValue, districtValue]);

	return (
		<>
			<TextField
				fullWidth
				label={labelCity}
				select
				value={cityValue}
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
					sx={{ mt: 2 }}
					fullWidth
					label={labelDistrict}
					select
					value={districtValue}
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
