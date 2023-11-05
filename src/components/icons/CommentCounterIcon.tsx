


import { HStack, Text } from "@chakra-ui/react"
import { BsChatLeft } from "react-icons/bs"


interface PropsInterface{
    length: number
}

const CommentCountIcon : React.FC<PropsInterface> = ({length}) => {

    return (
        <HStack>
            <BsChatLeft />
            <Text as="span">{length}</Text>
        </HStack>
    )

}

export default CommentCountIcon