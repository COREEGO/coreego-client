import { Stack, Text } from "@chakra-ui/react"
import { MdLocationOn } from "react-icons/md"


interface CityInterface {
    city: any,
    fontSize?: any
}

const City: React.FC<CityInterface> = ({ city, fontSize }) => {

    return (
        <Stack fontSize={fontSize} spacing={0} direction="row" alignItems="center" color="var(--coreego-red)">
            <MdLocationOn />
            <Text as="span"> {city.label} </Text>
        </Stack>
    )

}

export default City