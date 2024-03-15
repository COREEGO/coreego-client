import React from "react";
import { useNavigate, useParams } from "react-router";
import LoadingPage from "../../components/LoadingPage";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import {
	AVATAR_PATH,
	BEARER_HEADERS,
	IMAGE_PATH
} from "../../utils/variables";
import { NavLink } from "react-router-dom";
import CategoryText from "../../components/texts/CategoryText";
import ShareButton from "../../components/buttons/ShareButton";
import { belongsToAuth } from "../../utils";
import { useAuthContext } from "../../contexts/AuthProvider";
import {
	EDIT_ICON,
	MORE_OPTIONS,
	MORE_OPTIONS_ICON
} from "../../utils/icon";
import {
	Box,
	Button,
	Chip,
	Container,
	Divider,
	Avatar,
	Stack,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon
} from "@mui/material";
import moment from "moment";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import { toast } from "react-toastify";
import { ListIcon } from "@chakra-ui/react";
import OptionPublicationButton from "../../components/buttons/OptionPublicationButton";

const DiscussionDetail = () => {
	const params = useParams();
	const { user } = useAuthContext();

	const [isBusy, setIsBusy] = React.useState(true);
	const [discussion, setDiscussion] = React.useState();

	const confirm = useConfirm();
	const navigate = useNavigate();

	React.useEffect(() => {
		fetchDiscussion();
	}, []);

	const fetchDiscussion = async () => {
		try {
			const response = await axios.get(`/discussions/${params.slug}`);
			setDiscussion(response.data);
		} catch (error) {
			console.log(error.data.message);
		} finally {
			setIsBusy(false);
		}
	};

	return isBusy ? (
		<LoadingPage type="page" />
	) : (
		<>
			<Box mt={5}>
				<Container>
					<Stack gap={3} justifyContent="center" alignItems="center">
						<Stack alignItems="center" direction="row" spacing={1}>
							<CategoryText category={discussion.category} />
							<Typography
								sx={{
									color: "var(--grey-bold)",
									"&:before": {
										content: '"\\00a0| "'
									}
								}}
							>
								{moment(discussion.created_at).format("D MMMM YYYY")}
							</Typography>
						</Stack>
						<ShareButton />
						<Typography
							color="var(--coreego-blue)"
							textAlign="center"
							sx={{ wordBreak: "break-all" }}
							variant="h4"
							component="h1"
						>
							{discussion.title}
						</Typography>
					</Stack>
				</Container>
			</Box>

			<Divider
				sx={{
					width: "100%",
					mt: 5,
					"&:after, &:before": { backgroundColor: "black" }
				}}
			>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Avatar
						sx={{ width: 40, height: 40 }}
						src={AVATAR_PATH + discussion.user.avatar}
					/>
					<Typography fontWeight="bold">
						{discussion.user.pseudo}
					</Typography>
					{belongsToAuth(discussion.user.id, user?.id) && (
						<OptionPublicationButton
							editLink={`/forum/discussion/edit/${discussion.slug}`}
							deleteUrl={`/discussions/${discussion.id}`}
							redirectionUrl={"/forum"}
						/>
					)}
				</Stack>
			</Divider>

			<Box mt={3}>
				<Container>
					<Box
						fontSize={18}
						className="reactquill_content"
						dangerouslySetInnerHTML={{ __html: discussion.content }}
						color="var(--grey-bold)"
					/>
				</Container>
			</Box>

			<Box mt={3}>
				<Container>
					<LikeButton
						discussionId={discussion.id}
						likes={discussion.likes}
						mutate={fetchDiscussion}
					/>
				</Container>
			</Box>

			<Box my={3}>
				<CommentModule
					mutate={fetchDiscussion}
					discussionId={discussion.id}
					comments={discussion.comments}
				/>
			</Box>
		</>
	);
};

export default DiscussionDetail;
