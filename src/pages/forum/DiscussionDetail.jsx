import React from "react";
import { useNavigate, useParams } from "react-router";
import LoadingPage from "../../components/LoadingPage";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import { AVATAR_PATH } from "../../utils/variables";
import { NavLink } from "react-router-dom";
import CategoryText from "../../components/texts/CategoryText";
import ShareButton from "../../components/buttons/ShareButton";
import { belongsToAuth } from "../../utils";
import { useAuthContext } from "../../contexts/AuthProvider";
import {
	Box,
	Container,
	Divider,
	Avatar,
	Stack,
	Typography,
	Portal,
	Card,
	CardHeader,
	CardActionArea
} from "@mui/material";
import moment from "moment";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import OptionPublicationButton from "../../components/buttons/OptionPublicationButton";
import ReportModule from "../components/modules/ReportModule";

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
							sx={{ wordBreak: "break" }}
							variant="h3"
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
					<Card raised={true}>
						<CardHeader
							avatar={
								<Avatar
									sx={{ height: 50, width: 50 }}
									src={AVATAR_PATH + discussion.user.avatar}
								/>
							}
							title={
								<Typography component="div" fontWeight="bold">
									{discussion.user.pseudo}
								</Typography>
							}
							action={
								belongsToAuth(discussion.user.id, user?.id) ? (
									<OptionPublicationButton
										editLink={`/forum/discussion/edit/${discussion.slug}`}
										deleteUrl={`/discussions/${discussion.id}`}
										redirectionUrl={"/forum"}
									/>
								) : (
									<ReportModule
										targetElement="discussion_reported_id"
										targetValue={discussion.id}
									/>
								)
							}
						/>
					</Card>
			</Divider>

			<Box mt={3}>
				<Container>
					<Box
						fontSize={16}
						className="reactquill_content"
						dangerouslySetInnerHTML={{ __html: discussion.content }}
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
