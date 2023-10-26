import { Stack, Text } from "@chakra-ui/react"
import { BsFillChatRightFill } from "react-icons/bs"


interface NoOfCommentsInterface{
    nb: number
}

const NoOfComments : React.FC<NoOfCommentsInterface> = ({nb}) => {

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <BsFillChatRightFill />
            <Text as="span">{nb}</Text>
        </Stack>
    )

}

export default NoOfComments