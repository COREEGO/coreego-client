import { Stack, Text } from "@chakra-ui/react"
import { MdOutlineComment } from "react-icons/md"


interface NoOfCommentsInterface{
    nb: number
}

const NoOfComments : React.FC<NoOfCommentsInterface> = ({nb}) => {

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <MdOutlineComment />
            <Text as="span">{nb}</Text>
        </Stack>
    )

}

export default NoOfComments