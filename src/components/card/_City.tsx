import { Stack, Text } from "@chakra-ui/react"
import { MdLocationOn } from "react-icons/md"


interface CityInterface{
    city: any
}

const City  : React.FC<CityInterface> = ({city}) => {

    return (
        <Stack direction="row" alignItems="center" color="var(--coreego-red)" fontWeight="bold">
            <MdLocationOn />
            <Text as="span"> {city.label} </Text>
        </Stack>
    )

}

export default City