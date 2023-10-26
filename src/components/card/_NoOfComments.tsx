import { Stack, Text } from "@chakra-ui/react"
import { BsChatLeft } from "react-icons/bs"


interface NoOfCommentsInterface{
    nb: number
}

const NoOfComments : React.FC<NoOfCommentsInterface> = ({nb}) => {

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <BsChatLeft />
            <Text as="span">{nb}</Text>
        </Stack>
    )

}

export default NoOfComments