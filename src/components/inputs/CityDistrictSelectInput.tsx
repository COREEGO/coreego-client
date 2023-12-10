import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MapSimpleMarker from "../maps/MapSimpleMarker";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

interface CityDistrictSelectInputInterface {
    updateCity?: (e: any) => void,
    variant?: string,
    cityValue: string,
    updateDistrict?: (e: any) => void,
    districtValue: string,
    showMap?: boolean,
    withCircle?: boolean
}

const CityDistrictSelectInput: React.FC<CityDistrictSelectInputInterface> = ({
    updateCity, cityValue, updateDistrict, districtValue, showMap = false, withCircle = false
}) => {
    const { cities } = useSelector((state: any) => state.app);

    const [districtsList, setDistrictList] = useState<Array<any>>([]);

    const [selectedCity, setSelectedCity] = useState<string>(cityValue)
    const [selectedDistrict, setSelectedDistrict] = useState<string>(districtValue)


    useEffect(() => {
        setDistrictList(cityObject() ? cityObject().districts : [])
        updateCity && updateCity(selectedCity)
        if (selectedCity != cityValue) {
            setSelectedDistrict('')
        }
    }, [selectedCity])

    const cityObject = () => {
        return cities.find((city: any) => city.id == selectedCity) || null
    }

    const districtObject = () => {
        return cityObject() ? cityObject()?.districts.find((district: any) => district.id == selectedDistrict) : null
    }

    useEffect(() => {
        updateDistrict && updateDistrict(selectedDistrict)
    }, [selectedDistrict])

    useEffect(() => {
        cityObject()
        districtObject()
        if (showMap) {
            getGeopoint()
        }
    }, [selectedCity, selectedDistrict])

    const getGeopoint = () => {
        let longitude: any = null
        let latitude: any = null

        if (selectedCity) {
            longitude = cityObject()?.longitude
            latitude = cityObject()?.latitude
            if (selectedDistrict) {
                longitude = districtObject()?.longitude
                latitude = districtObject()?.latitude
            }
        } else {
            longitude = null;
            latitude = null
        }
        return (longitude && latitude) ? { lng: longitude, lat: latitude } : null
    }

    return (
        <Stack spacing={1} sx={{ width: '100%' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Villes</InputLabel>
                <Select label="Villes"
                    value={selectedCity.toString() || ''} onChange={(event: any) => setSelectedCity(event.target.value)}>
                    <MenuItem value={""}>Toutes les villes</MenuItem>
                    {cities.map((city: any) => {
                        return <MenuItem key={city.id} value={city.id}>{city.label}</MenuItem>
                    })}
                </Select>
            </FormControl>
            {
                selectedCity && <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Districts</InputLabel>
                    <Select
                        label="Districts" value={selectedDistrict.toString() || ''} onChange={(event: any) => setSelectedDistrict(event.target.value)}>
                        <MenuItem value={""}>Tous les districts</MenuItem>
                        {districtsList.map((district: any) => {
                            return <MenuItem key={district.id} value={district.id}>{district.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>

            }

            {
                (showMap && getGeopoint()) ? <Box sx={{ width: '100%', height: 300 }} ><MapSimpleMarker withCircle={withCircle} lat={getGeopoint()?.lat} lng={getGeopoint()?.lng} /></Box> : <></>
            }
        </Stack>
    );
};

export default CityDistrictSelectInput;
