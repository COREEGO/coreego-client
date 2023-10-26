import { Select, Stack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface CityDistrictSelectInputInterface {
    updateCity: (e: any) => void,
    cityValue: string,
    updateDistrict: (e: any) => void,
    districtValue: string
}

const CityDistrictSelectInput: React.FC<CityDistrictSelectInputInterface> = ({
    updateCity, cityValue, updateDistrict, districtValue
}) => {
    const { cities } = useSelector((state: any) => state.app);

    const [districtsList, setDistrictList] = useState<Array<any>>([]);

    const [selectedCity, setSelectedCity] = useState<string>(cityValue)
    const [selectedDistrict, setSelectedDistrict] = useState<string>(districtValue)

    useEffect(() => {
        const findCity = cities.find((city: any) => city.id == selectedCity)
        setDistrictList(findCity ? findCity.districts : [])
        updateCity(selectedCity)
        if (selectedCity != cityValue) {
            setSelectedDistrict('')
        }
    }, [selectedCity])

    useEffect(() => {
        updateDistrict(selectedDistrict)
    }, [selectedDistrict])

    return (
        <Stack>
            <Select value={selectedCity} onChange={(event: any) => setSelectedCity(event.target.value)}>
                <option value="">Toutes les villes</option>
                {cities.map((city: any) => {
                    return <option key={city.id} value={city.id}>{city.label}</option>;
                })}
            </Select>
            {districtsList.length ? (
                <Select value={selectedDistrict} onChange={(event: any) => setSelectedDistrict(event.target.value)}>
                    <option value="">Voir tous</option>
                    {
                        districtsList.map((district: any) => {
                            return <option key={district.id} value={district.id}>{district.label} </option>;
                        })
                    }
                </Select>
            ) : (
                <></>
            )}
        </Stack>
    );
};

export default CityDistrictSelectInput;
