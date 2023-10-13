import { Stack, Text } from "@chakra-ui/react"
import { MdLocationOn } from "react-icons/md"


interface CityInterface {
    city: any,
    size?: any
}

const City: React.FC<CityInterface> = ({ city, size }) => {

    return (
        <Stack fontSize={size} spacing={0} direction="row" alignItems="center" color="var(--coreego-blue)">
            <Text>
                <MdLocationOn />
            </Text>
            <Text as="span"> {city.label} </Text>
        </Stack>
    )

}

export default City