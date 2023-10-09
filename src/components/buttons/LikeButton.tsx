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

    const { user }: any = useAuthContext();

    const [userLike, setUserLike] = useState<any>(null);
    const [likeLength, setLikeLength] = useState<number>(likes.length);

    const [isBusy, setIsBusy] = useState<boolean>(false)

    useEffect(() => {
        const currentUserLiked = likes.find((like: any) => like.user.id === user.id);
        setUserLike(currentUserLiked || null);
    }, [likes, user.id]);


    const handleLike = async () => {

        try {
            setIsBusy(true)
            if (userLike) {
                await apiFetch('/likes/' + userLike.id, 'DELETE')
                setUserLike(null)
                setLikeLength(likeLength - 1)
            } else {
                await apiFetch('/likes', 'POST', {
                    discussion: discussionId ? '/api/discussions/' + discussionId : null,
                    place: placeId ? '/api/places/' + placeId : null,
                })
                setUserLike(user)
                setLikeLength(likeLength + 1)
            }
            mutate()
        } catch (error) {
            console.log(error)
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <Stack direction="row" alignItems="center">
            <IconButton isDisabled={isBusy} onClick={handleLike} aria-label={"like post"} icon={
                userLike ? <MdFavorite color="red" /> : <MdFavoriteBorder color="red" />
            } isRound={true} fontSize='20px' />
            <Text as="b"> {likeLength} </Text>
        </Stack>
    )

}

export default LikeButton