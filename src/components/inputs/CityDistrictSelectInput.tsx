import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MapSimpleMarker from "../maps/MapSimpleMarker";

interface CityDistrictSelectInputInterface {
    updateCity?: (e: any) => void,
    cityValue: string,
    updateDistrict?: (e: any) => void,
    districtValue: string,
    showMap?: boolean
}

const CityDistrictSelectInput: React.FC<CityDistrictSelectInputInterface> = ({
    updateCity, cityValue, updateDistrict, districtValue, showMap = false
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
        return cityObject() ? cityObject()?.districts.find((district:any)=> district.id == selectedDistrict ) : null
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
            if(selectedDistrict){
                longitude = districtObject()?.longitude
                latitude = districtObject()?.latitude
            }
        }else{
            longitude = null;
            latitude = null
        }
        return (longitude && latitude) ? { lng: longitude, lat: latitude } : null
    }

    return (
        <Stack w="100%">
            <Select value={selectedCity} onChange={(event: any) => setSelectedCity(event.target.value)}>
                <option value="">Toutes les villes</option>
                {cities.map((city: any) => {
                    return <option key={city.id} value={city.id}>{city.label}</option>;
                })}
            </Select>
            <Select value={selectedDistrict} onChange={(event: any) => setSelectedDistrict(event.target.value)}>
                <option value="">Tous les districts</option>
                {
                    districtsList.map((district: any) => {
                        return <option key={district.id} value={district.id}>{district.label} </option>;
                    })
                }
            </Select>
            {
                (showMap && getGeopoint()) ? <Box w="100%" h={200} ><MapSimpleMarker lat={getGeopoint()?.lat} lng={getGeopoint()?.lng}/></Box>  : <></>
            }
        </Stack>
    );
};

export default CityDistrictSelectInput;
