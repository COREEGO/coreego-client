


import { HStack, Text } from "@chakra-ui/react"
import { BsCardImage } from "react-icons/bs"


interface PropsInterface{
    length: number
}

const ImageCountIcon : React.FC<PropsInterface> = ({length}) => {

    return (
        <HStack>
            <BsCardImage />
            <Text as="span">{length}</Text>
        </HStack>

    )

}

export default ImageCountIcon