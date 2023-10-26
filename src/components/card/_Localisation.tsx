import { Flex, Text } from "@chakra-ui/react"
import { MdLocationOn } from "react-icons/md"



const Localisation: React.FC<{ location: any }> = ({ location }) => {

    return (
        <Flex as="span" color="var(--coreego-blue)" flex={1} alignItems="center">
            <Text as="span">
                <MdLocationOn />
            </Text>
            <Text as="span" noOfLines={1}> {location.city.label}, {location.label} </Text>
        </Flex>
    )
}

export default Localisation