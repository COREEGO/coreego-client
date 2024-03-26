import { PropsWithChildren, useMemo, useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { DISLIKE_ICON, LIKE_ICON } from "../../utils/icon";
import { toast } from "react-toastify";
import { apiFetch } from "../../http-common/apiFetch";
import LoadingButton, {
	LoadingButtonProps
} from "@mui/lab/LoadingButton";
import axios from "axios";
import { BEARER_HEADERS } from "../../utils/variables";

const LikeButton = ({
	likes,
	mutate,
	discussionId = null,
	placeId = null,
	...props
}) => {
	const [isBusy, setIsBusy] = useState(false);
	const { user } = useAuthContext();

	const existLike = useMemo(() => {
		return likes.find((like) => like?.user?.id === user.id)
			? true
			: false;
	}, [likes, discussionId, placeId]);

	const handleLike = async () => {
		try {
			setIsBusy(true);
			const response = await axios.post(
				"/likes",
				{
					discussion_id: discussionId,
					place_id: placeId
				},
				BEARER_HEADERS
			);
			toast.success(response.data.message);
			mutate();

		} catch (error) {
			toast.error(error?.data?.message);
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<LoadingButton
			{...props}
			loading={isBusy}
			color="error"
			variant="outlined"
			onClick={handleLike}
			startIcon={existLike ? <LIKE_ICON /> : <DISLIKE_ICON />}
		>
			{likes.length}
		</LoadingButton>
	);
};

export default LikeButton;
