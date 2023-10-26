import { Stack, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { BsFillHeartFill } from "react-icons/bs"


interface NoOfLikesInterface{
    nb: number
}

const NoOfLikes : React.FC<NoOfLikesInterface> = ({nb}) => {

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <BsFillHeartFill />
            <Text as="span">{nb}</Text>
        </Stack>
    )

}

export default NoOfLikes