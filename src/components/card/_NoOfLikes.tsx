import { Stack, Text } from "@chakra-ui/react"
import { MdFavoriteBorder } from "react-icons/md"


interface NoOfLikesInterface{
    nb: number
}

const NoOfLikes : React.FC<NoOfLikesInterface> = ({nb}) => {

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <MdFavoriteBorder />
            <Text as="span">{nb}</Text>
        </Stack>
    )

}

export default NoOfLikes