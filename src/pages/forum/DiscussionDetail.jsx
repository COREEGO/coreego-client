import React from "react";
import { useNavigate, useParams } from "react-router";
import LoadingPage from "../../components/LoadingPage";
import LikeButton from "../../components/buttons/LikeButton";
import CommentModule from "../components/modules/CommentModule";
import { AVATAR_PATH, UNKNOWN_USER } from "../../utils/variables";
import CategoryText from "../../components/texts/CategoryText";
import ShareButton from "../../components/buttons/ShareButton";
import { belongsToAuth, cleanHtmlText } from "../../utils";
import { useAuthContext } from "../../contexts/AuthProvider";
import {
	Box,
	Container,
	Divider,
	Avatar,
	Stack,
	Typography
} from "@mui/material";
import moment from "moment";
import axios from "axios";
import OptionPublicationButton from "../../components/buttons/OptionPublicationButton";
import ReportModule from "../components/modules/ReportModule";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const DiscussionDetail = () => {
	const params = useParams();
	const { auth } = useAuthContext();

	const [isBusy, setIsBusy] = React.useState(true);
	const [discussion, setDiscussion] = React.useState();

	const navigate = useNavigate();

	React.useEffect(() => {
		fetchDiscussion();
	}, []);

	const fetchDiscussion = async () => {
		try {
			const response = await axios.get(`/discussions/${params.slug}`);
			if (!response.data) {
				navigate("*");
			}
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
			<Helmet>
				<title>Forum : {discussion.title} | Coreego</title>
				<meta
					name="title"
					content={`Forum : ${discussion.title} | Coreego`}
				/>
				<meta
					name="description"
					content={cleanHtmlText(discussion.content).slice(0, 150)}
				/>
			</Helmet>
			<Box mt={5}>
				<Container>
					<Stack gap={3} justifyContent="center" alignItems="center">
						<Stack alignItems="center" direction="row" spacing={1}>
							<NavLink to={`/forum?category=${discussion.category.id}`}>
							<CategoryText category={discussion.category} />
							</NavLink>
							<Typography
								sx={{
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
				<Stack direction="row" alignItems="center" gap={2}>
					<Avatar
						sx={{ height: 50, width: 50 }}
						src={AVATAR_PATH + discussion?.user?.avatar}
					/>
					<NavLink to={`/user/profil/${discussion?.user?.slug}`}>
						<Typography component="div" fontWeight="bold">
							{discussion?.user?.pseudo || UNKNOWN_USER}
						</Typography>
					</NavLink>
					{belongsToAuth(discussion?.user?.id, auth?.id) ? (
						<OptionPublicationButton
							editLink={`/forum/discussion/modification/${discussion.slug}`}
							deleteUrl={`/discussions/${discussion.id}`}
							redirectionUrl={"/forum"}
						/>
					) : (
						<ReportModule
							targetElement="discussion_reported_id"
							targetValue={discussion.id}
						/>
					)}
				</Stack>
			</Divider>

			<Box mt={3}>
				<Container>
					<Box
						className="reactquill_content ql-editor"
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
