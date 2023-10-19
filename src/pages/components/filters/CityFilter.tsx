import { Box, FormControl, FormLabel, Input, Select, Stack } from "@chakra-ui/react"
import { useFilterContext } from "../../../contexts/FilterProvider"


interface CityFilterInterface {
    cities: Array<any>
}

const CityFilter: React.FC<CityFilterInterface> = ({ cities }) => {

    const { city, setCity } = useFilterContext()

    return (
        <Select width="fit-content" bg="white" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value=''>Toutes les villes</option>
            {
                cities.map((ville: any) => {
                    return (
                        <option key={ville.id} value={ville.id}> {ville.label} </option>
                    )
                })
            }
        </Select>
    )

}

export default CityFilter