import {
	Avatar,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Stack,
	Typography
} from "@mui/material";
import CategoryText from "../texts/CategoryText";
import CommentCountIcon from "../icons/CommentCounterIcon";
import LikeCountIcon from "../icons/LikeCountIcon";
import { cleanHtmlText } from "../../utils";
import moment from "moment";
import { AVATAR_PATH } from "../../utils/variables";

const DiscussionCard = ({ discussion }) => {
	return (
		<Card elevation={3}>
			<CardActionArea component="div">
				<CardHeader
					avatar={
						<Avatar src={AVATAR_PATH + discussion.user.avatar} />
					}
					title={
						<Typography component="div" fontWeight="bold">
							{discussion.user.pseudo}
						</Typography>
					}
					subheader={moment(discussion.created_at).format(
						"D MMMM YYYY"
					)}
					sx={{ pb: 0 }}
				/>
				<CardContent>
					<CategoryText
						size="small"
						category={discussion?.category}
					/>
					<Typography
						mt={1}
						color="var(--coreego-blue)"
						component="div"
						variant="h6"
						fontWeight="inherit"
						noWrap
					>
						{discussion.title}
					</Typography>
					<Typography variant="subtitle1" noWrap>
						{cleanHtmlText(discussion.content)}
					</Typography>
					<Stack direction="row" mt={2} gap={1}>
						<CommentCountIcon length={discussion.comments?.length} />
						<LikeCountIcon length={discussion.likes?.length} />
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default DiscussionCard;
