import { PropsWithChildren, useMemo, useState } from "react"
import { useAuthContext } from "../../contexts/AuthProvider"
import { DISLIKE_ICON, LIKE_ICON } from "../../utils/icon"
import { toast } from "react-toastify"
import { apiFetch } from "../../http-common/apiFetch"
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton"



const LikeButton = ({ likes, mutate, discussionId = null, placeId = null, ...props }) => {

    const [isBusy, setIsBusy] = useState(false)
    const { user } = useAuthContext();

    const existLike = useMemo(() => {
        return likes.find((like) => like?.user?.id === user.id) ? true : false;
    }, [likes, discussionId, placeId])


    const handleLike = async () => {
        try {
            setIsBusy(true)
            const response = await apiFetch('/like', 'POST', {
                discussion_id: discussionId,
                place_id: placeId,
            }, true)

            if (response) {
                toast.success(response.message)
                mutate()
            }

        } catch (error) {
            toast.error(error.message.message)
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <LoadingButton
            {...props}
            loading={isBusy}
            color="error"
            variant="outlined" onClick={handleLike} startIcon={existLike ? <LIKE_ICON /> : <DISLIKE_ICON />}>
            {likes.length}
        </LoadingButton>
    )

}

export default LikeButton