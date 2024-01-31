import { PropsWithChildren, useMemo, useState } from "react"
import { useAuthContext } from "../../contexts/AuthProvider"
import { DISLIKE_ICON, LIKE_ICON } from "../../utils/icon"
import { toast } from "react-toastify"
import { apiFetch } from "../../http-common/apiFetch"
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton"

interface LikeButtonInterface {
    discussionId?: any,
    placeId?: any,
    likes: Array<any>,
    mutate: Function,
}


const LikeButton = (props: PropsWithChildren<LoadingButtonProps & LikeButtonInterface>) => {
    const { likes, mutate, discussionId, placeId } = props;

    const [isBusy, setIsBusy] = useState<boolean>(false)
    const { user }: any = useAuthContext();

    const existLike = useMemo(() => {
        return likes.find((like: any) => like?.user?.id === user.id) ? true : false;
    }, [likes, discussionId, placeId])


    const handleLike = async () => {
        try {
            setIsBusy(true)
            const response: any = await apiFetch('/like', 'POST', {
                discussion_id: discussionId,
                place_id: placeId,
            }, true)

            if (response) {
                toast.success(response.message)
                mutate()
            }

        } catch (error: any) {
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
            sx={{
                backgroundColor: 'white',
                borderColor: 'var(--mui-light)',
                '&:hover': {
                    borderColor: 'var(--mui-light)',
                    boxShadow: 'var(--box-shadow)',
                    backgroundColor: 'white'
                }
            }}
            variant="outlined" onClick={handleLike} startIcon={existLike ? <LIKE_ICON /> : <DISLIKE_ICON />}>
            {likes.length}
        </LoadingButton>
    )

}

export default LikeButton