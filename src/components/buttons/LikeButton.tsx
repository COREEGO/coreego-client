import { IconButton, Stack, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"
import { useAuthContext } from "../../contexts/AuthProvider"
import { apiFetch } from "../../http-common/apiFetch"

interface LikeButtonInterface {
    discussionId?: any,
    placeId?: any,
    likes: Array<any>,
    mutate: Function
}


const LikeButton: React.FC<LikeButtonInterface> = ({ likes, mutate, discussionId = null, placeId = null }) => {

    const toast = useToast()

    const [currentLike, setCurrentLike] = useState<any>(null)

    const { user }: any = useAuthContext()

    useEffect(() => {
        const currentUserLiked = likes.find((like: any) => like.user.id === user.id)
        if (currentUserLiked) {
            setCurrentLike(currentUserLiked)
        } else {
            setCurrentLike(null)
        }
    }, [likes])

    const handleLike = async () => {

        try {
            if (currentLike) {
                await apiFetch('/likes/' + currentLike.id, 'DELETE')

                toast({
                    title: 'Suucès',
                    position: 'top-right',
                    description: "Je n'aime plus",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })

            } else {
                await apiFetch('/likes', 'POST', {
                    discussion: discussionId ? '/api/discussions/' + discussionId : null,
                    place: placeId ? '/api/places/' + placeId : null,
                })
                toast({
                    title: 'Suucès',
                    position: 'top-right',
                    description: "J'aime",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            }

            mutate()


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Stack direction="row" alignItems="center">
            <IconButton onClick={handleLike} aria-label={"like post"} icon={
                currentLike ? <MdFavorite color="red" /> : <MdFavoriteBorder color="red" />
            } isRound={true} fontSize='20px' />
            <Text as="b"> {likes.length} </Text>
        </Stack>
    )

}

export default LikeButton