import { Button, IconButton, Stack, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"
import { useAuthContext } from "../../contexts/AuthProvider"
import { apiFetch } from "../../http-common/apiFetch"

interface LikeButtonInterface {
    discussionId?: any,
    placeId?: any,
    likes: Array<any>,
    size?: any,
    mutate: Function
}


const LikeButton: React.FC<LikeButtonInterface> = ({ likes, mutate, discussionId = null, placeId = null, size }) => {

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
        <Button className="blue_outlined" size={size} width="fit-content" isDisabled={isBusy} onClick={handleLike} leftIcon={userLike ? <MdFavorite fontSize={24} color="red" /> : <MdFavoriteBorder fontSize={24} color="red" />}>
            {likeLength}
        </Button>
    )

}

export default LikeButton