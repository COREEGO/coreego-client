import { FormControl, FormLabel, Select, Stack } from "@chakra-ui/react"
import { useFilterContext } from "../../../contexts/FilterProvider"


interface CityFilterInterface {
    cities: Array<any>
}

const CityFilter: React.FC<CityFilterInterface> = ({ cities }) => {

    const { city, setCity } = useFilterContext()

    return (

            <Select bg="white" fontWeight="bold" borderRadius={0} value={city} onChange={(e) => setCity(e.target.value)} width="fit-content">
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