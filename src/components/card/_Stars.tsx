import { HStack, Text } from "@chakra-ui/react"
import { BsFillStarFill } from "react-icons/bs"

interface StarsInterface{
    star: number
}

const Stars : React.FC<StarsInterface> = ({star}) => {

    return(
        <HStack>
            <BsFillStarFill color="orange" />
            <Text>{star}</Text>
        </HStack>
    )
}

export default Stars