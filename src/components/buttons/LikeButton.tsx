import { useEffect, useState } from "react"
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"
import { useAuthContext } from "../../contexts/AuthProvider"
import { apiFetch } from "../../http-common/apiFetch"
import { findMatchingUser } from "../../utils"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { Button, IconButton, Stack } from "@mui/material"
import { DISLIKE_ICON, LIKE_ICON } from "../../utils/icon"

interface LikeButtonInterface {
    discussionId?: any,
    placeId?: any,
    likes: Array<any>,
    size?: any,
    mutate: Function,
}


const LikeButton: React.FC<LikeButtonInterface> = ({ likes, mutate, discussionId = null, placeId = null, size }) => {

    const { user }: any = useAuthContext();

    const [userLike, setUserLike] = useState<any>(null);
    const [likeLength, setLikeLength] = useState<number>(likes?.length || 0);

    const [isBusy, setIsBusy] = useState<boolean>(false)

    useEffect(() => {
        const alreadyTaken = findMatchingUser(likes, user)
        setUserLike(alreadyTaken || null);
    }, [likes, user.id]);


    const handleLike = async () => {

        try {
            setIsBusy(true)
            if (userLike) {
                await apiFetch('/like/' + userLike.id, 'DELETE')

                setUserLike(null)
                setLikeLength(likeLength - 1)
            } else {
                await apiFetch('/likes', 'POST', {
                    discussion: discussionId ? '/api/discussion/' + discussionId : null,
                    place: placeId ? '/api/place/' + placeId : null,
                })

                setUserLike(user)
                setLikeLength(likeLength + 1)
            }
            mutate()
        } catch (error) {
            //
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <Button color="error" sx={{widht:"fit-content"}} variant="outlined" onClick={handleLike} startIcon={userLike ? <LIKE_ICON /> : <DISLIKE_ICON />}>
            {likeLength}
        </Button>
    )

}

export default LikeButton