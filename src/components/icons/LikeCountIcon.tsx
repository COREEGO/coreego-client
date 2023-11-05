


import { HStack, Text } from "@chakra-ui/react"
import { BsHeart } from "react-icons/bs"


interface PropsInterface{
    length: number
}

const LikeCountIcon : React.FC<PropsInterface> = ({length}) => {

    return (
        <HStack>
            <BsHeart />
            <Text as="span">{length}</Text>
        </HStack>
    )

}

export default LikeCountIcon