import { Button, HStack, IconButton, Stack, Text, VStack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"
import { useAuthContext } from "../../contexts/AuthProvider"
import { apiFetch } from "../../http-common/apiFetch"
import { findMatchingUser } from "../../utils"
import { BsHeart, BsHeartFill } from "react-icons/bs"

interface LikeButtonInterface {
    discussionId?: any,
    placeId?: any,
    likes: Array<any>,
    size?: any,
    mutate: Function,
    showLabel?: boolean
}


const LikeButton: React.FC<LikeButtonInterface> = ({ likes, mutate, discussionId = null, placeId = null, size, showLabel = false }) => {

    const { user }: any = useAuthContext();

    const [userLike, setUserLike] = useState<any>(null);
    const [likeLength, setLikeLength] = useState<number>(likes.length);

    const [isBusy, setIsBusy] = useState<boolean>(false)

    useEffect(() => {
        const alreadyTaken = findMatchingUser(likes, user)
        setUserLike(alreadyTaken || null);
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
            //
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <VStack>
            <HStack>
                <IconButton
                    size="md"
                    isRound
                    onClick={handleLike}
                    colorScheme="red"
                    variant="outline"
                    isDisabled={isBusy}
                    aria-label={"like button"}
                    icon={userLike ? <BsHeartFill /> : <BsHeart />}
                />
                <Text>{likeLength}</Text>
            </HStack>
            {showLabel && <Text as="small">j'aime</Text> }
        </VStack>
    )

}

export default LikeButton