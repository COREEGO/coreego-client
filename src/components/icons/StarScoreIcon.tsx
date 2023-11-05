import { HStack, Text } from "@chakra-ui/react"
import { BsFillStarFill } from "react-icons/bs"

interface PropsInterface{
    scrore: number
}

const StarScoreIcon : React.FC<PropsInterface> = ({scrore}) => {

    return(
        <HStack>
            <BsFillStarFill color="orange" />
            <Text>{scrore + '/5'}</Text>
        </HStack>
    )
}

export default StarScoreIcon