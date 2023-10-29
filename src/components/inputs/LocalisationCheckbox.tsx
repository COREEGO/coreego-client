import { Box, Button, Checkbox, CheckboxGroup, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


interface LocalisationCheckboxInterface {
    updateCity: (e: any) => void,
    cityValue: string,
    updateDistrict: (e: any) => void,
    districtValue: string
}

const LocalisationCheckbox: React.FC<LocalisationCheckboxInterface> = (
    { updateCity, updateDistrict, cityValue, districtValue }
) => {

    const { cities } = useSelector((state: any) => state.app);

    // const [checkedItems, setCheckedItems] = useState<boolean>(false)

    // useEffect(() => {
    //     console.log(checkedItems)
    // }, [checkedItems] )

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

    return (
        <Stack>
            <Stack>
                <Text>Villes</Text>
                <Wrap>
                    {
                        cities.map((city: any) => {
                            return <CheckboxGroup key={city.id}>
                                <Box position={"relative"}>
                                    <Checkbox position={"absolute"} zIndex={10} left={0} right={0} top={0} bottom={0} colorScheme='red'></Checkbox>
                                    <Button size="sm"> {city.label} </Button>
                                </Box>
                            </CheckboxGroup >
                        })
                    }
                </Wrap>
            </Stack>
            <Stack>
                <Text>Districts</Text>
                <Wrap>

                </Wrap>
            </Stack>
        </Stack>
    )
}

export default LocalisationCheckbox