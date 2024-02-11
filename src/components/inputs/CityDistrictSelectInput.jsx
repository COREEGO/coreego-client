import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MapSimpleMarker from "../maps/MapSimpleMarker";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";



const CityDistrictSelectInput = ({
    updateCity, cityValue, updateDistrict, districtValue, showMap = false, withCircle = false
}) => {
    const { cities } = useSelector((state) => state.app);

    const [selectedCity, setSelectedCity] = useState(cityValue)
    const [selectedDistrict, setSelectedDistrict] = useState(districtValue)

    const districts = useMemo(() => {
        const city = cities.find((city) => city.id == selectedCity);
        return city?.districts || null;
    }, [selectedCity, cities]);

    const geopoint = useMemo(() => {
        const district = districts ? districts.find((district) => district.id == selectedDistrict) : null;
        return district ? { latitude: district.latitude, longitude: district.longitude } : null
    }, [selectedDistrict])

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict('0')
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value)
    }

    useEffect(() => {
        updateCity(selectedCity)
    }, [selectedCity])

    useEffect(() => {
        updateDistrict && updateDistrict(selectedDistrict)
    }, [selectedDistrict])

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Villes</InputLabel>
                <Select
                    sx={{backgroundColor: 'white'}}
                    label="Villes"
                    value={selectedCity}
                    onChange={handleCityChange}
                >
                    <MenuItem value="0">Toutes les villes</MenuItem>
                    {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                            {city.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {
                districts && districts.length > 0 ? <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Districts</InputLabel>
                    <Select
                        sx={{backgroundColor: 'white'}}
                        label="Districts" value={selectedDistrict} onChange={handleDistrictChange}>
                        <MenuItem value="0">Tous les districts</MenuItem>
                        {
                            districts.map((district) => {
                                return <MenuItem key={district.id} value={district.id}>{district.label}</MenuItem>;
                            })
                        }
                    </Select>
                </FormControl> : <></>
            }

            {
                (showMap && geopoint) ? <Box sx={{ width: '100%', height: 300 }} ><MapSimpleMarker withCircle={withCircle} lat={geopoint?.latitude} lng={geopoint?.longitude} /></Box> : <></>
            }
        </Stack>
    );
};

export default CityDistrictSelectInput;
