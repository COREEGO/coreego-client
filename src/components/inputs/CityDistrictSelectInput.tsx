import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MapSimpleMarker from "../maps/MapSimpleMarker";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

interface CityDistrictSelectInputInterface {
    updateCity: (e: any) => void;
    variant?: string;
    cityValue: string | number;
    updateDistrict?: (e: any) => void;
    districtValue: string | number;
    showMap?: boolean;
    withCircle?: boolean;
}

const CityDistrictSelectInput: React.FC<CityDistrictSelectInputInterface> = ({
    updateCity, cityValue, updateDistrict, districtValue, showMap = false, withCircle = false
}) => {
    const { cities } = useSelector((state: any) => state.app);

    const [selectedCity, setSelectedCity] = useState<string | number>(cityValue)
    const [selectedDistrict, setSelectedDistrict] = useState<string | number>(districtValue)

    const districts = useMemo(() => {
        const city = cities.find((city: any) => city.id == selectedCity);
        return city?.districts || null;
    }, [selectedCity, cities]);

    const geopoint = useMemo(() => {
        const district = districts ? districts.find((district: any) => district.id == selectedDistrict) : null;
        return district ? { latitude: district.latitude, longitude: district.longitude } : null
    }, [selectedDistrict])

    const handleCityChange = (event: any) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict('')
    };

    const handleDistrictChange = (event: any) => {
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
                    label="Villes"
                    value={selectedCity}
                    onChange={handleCityChange}
                >
                    <MenuItem value="">Toutes les villes</MenuItem>
                    {cities.map((city: any) => (
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
                        label="Districts" value={selectedDistrict} onChange={handleDistrictChange}>
                        <MenuItem value="">Tous les districts</MenuItem>
                        {
                            districts.map((district: any) => {
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
