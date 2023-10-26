


import { Stack, Text } from "@chakra-ui/react"
import { BsFillImageFill } from "react-icons/bs"


interface NoOfImageInterface{
    nb: number
}

const NoOfImage : React.FC<NoOfImageInterface> = ({nb}) => {

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <BsFillImageFill />
            <Text as="span">{nb}</Text>
        </Stack>
    )

}

export default NoOfImage