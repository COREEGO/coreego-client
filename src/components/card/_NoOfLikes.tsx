import { Stack, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { BsHeart } from "react-icons/bs"


interface NoOfLikesInterface{
    nb: number
}

const NoOfLikes : React.FC<NoOfLikesInterface> = ({nb}) => {

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <BsHeart />
            <Text as="span">{nb}</Text>
        </Stack>
    )

}

export default NoOfLikes